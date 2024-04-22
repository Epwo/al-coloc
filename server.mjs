import express from "express";
import mysql from 'mysql';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'cleroot',
  database: 'alcoloc'
});

const app = express();
const port = 3000;
const AnnoncersPostQuery = 'INSERT INTO annoncers SET ? ON DUPLICATE KEY UPDATE nbPlace=VALUES(nbPlace), ConsoNeeds=VALUES(ConsoNeeds), AgeMin=VALUES(AgeMin), AgeMax=VALUES(AgeMax), titre=VALUES(titre)';
const SeekersPostQuery = 'INSERT INTO seekers SET ? ON DUPLICATE KEY UPDATE nbPers=VALUES(nbPers), consoDisp=VALUES(consoDisp), AgeMin=VALUES(AgeMin), AgeMax=VALUES(AgeMax)';
const SeekersDelQuery =  'DELETE FROM seekers WHERE usrName = ?';
const AnnoncerDelQuery =  'DELETE FROM annoncers WHERE usrName = ? AND adrr = ?';

// Middleware to parse JSON bodies
app.use(express.json());

const handleGetRequest = (req, res, tableName) => {
  pool.query(`SELECT * FROM ${tableName}`, (error, results, fields) => {
    if (error) {
      console.error(`Error executing query for ${tableName}:`, error);
      res.send('Error while fetching data!');
      return;
    }
    console.log(`Query results for ${tableName}:`, results);
    res.send(results);
  });
};

const handlePostRequest = (req, res, tableQuery) => {
  console.log('Data received:', req.body);
  const data = req.body;
  pool.query(tableQuery, data, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.send('Error while inserting data!');
      return;
    }
    console.log('Inserted new row with ID:', results.insertId);
    res.send('Data inserted successfully!');
  });
};

app.get('/annoncers', (req, res) => {
  handleGetRequest(req, res, 'annoncers');
});

app.get('/seekers', (req, res) => {
  handleGetRequest(req, res, 'seekers');
});


// POST request handler for annoncers table
app.post('/upload/annoncers', (req, res) => {
  handlePostRequest(req, res, AnnoncersPostQuery);
});

// POST request handler for seekers table
app.post('/upload/seekers', (req, res) => {
  handlePostRequest(req, res, SeekersPostQuery);
});


app.post('/del/seekers', (req, res) => {
  handleDeleteRequest(req, res, SeekersDelQuery);
});

app.post('/del/annoncers', (req, res) => {
  handleDeleteRequest(req, res, AnnoncerDelQuery);
});


const handleDeleteRequest = (req, res, deleteQuery) => {
  console.log('We want to remove this:', req.body);
  const annoncerData = req.body;
  pool.query(deleteQuery, [annoncerData.usrName, annoncerData.adrr], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.send('Error while deleting data!');
      return;
    }
    console.log('Deleted row with usrName:', annoncerData.usrName);
    res.send('Data deleted successfully!');
  });
};


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const columnMapping = {
  nbPers: 'nbPlace',
  ConsoDisp: 'ConsoNeeds',
  AgeMin: 'AgeMin',
  AgeMax: 'AgeMax',
};

const handleSearchRequest = (req, res) => {
  const searchCriteria = req.body;
  let query = 'SELECT * FROM annoncers WHERE ';
  let criteriaCount = 0;

  // Compte le nombre de critères fournis
  for (const key in searchCriteria) {
    if (searchCriteria.hasOwnProperty(key) && key !== 'usrName') {
      criteriaCount++;
    }
  }
  
  // Construit la requête SQL en fonction des critères fournis et de l'objet de mappage
  for (const key in searchCriteria) {
    if (searchCriteria.hasOwnProperty(key) && key !== 'usrName') {
      if (key === 'AgeMin'|| key === 'AgeMax') {
        query += `AgeMin <= ?  AND AgeMax >= ? `;
      } 
      else if(key == 'nbPers'){
        query += 'nbPlace >= ? ';
      }
      else {
        query += `${columnMapping[key]} = ? `;
      }
      if (criteriaCount > 1) {
        query += 'AND ';
        criteriaCount--;
      }
    }
  }

  console.log('Query:', query);
  // Construit les valeurs pour la requête SQL en fonction des critères fournis
  const queryValues = [];
  for (const key in searchCriteria) {
    if (searchCriteria.hasOwnProperty(key) && key !== 'usrName') {
      if (key === 'AgeMin' || key === 'AgeMax') {
        queryValues.push(searchCriteria[key]);
        queryValues.push(searchCriteria[key]);
      } else {
        queryValues.push(searchCriteria[key]);
      }
    }
  }

  // Exécute la requête SQL
  pool.query(query, queryValues, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.send('Error while fetching data!');
      return;
    }

    // Filtre les résultats pour inclure seulement ceux qui correspondent à au moins 3/4 des critères
    const filteredResults = results.filter(result => {
      let matchCount = 0;
      for (const key in searchCriteria) {
        if (searchCriteria.hasOwnProperty(key) && key !== 'usrName') {
          if (key === 'AgeMin' || key === 'AgeMax') {
            if (result[columnMapping[key]] >= searchCriteria[key] && result[columnMapping[key]] <= searchCriteria[key]) {
              matchCount++;
            }
          } else if (result[columnMapping[key]] === searchCriteria[key]) {
            matchCount++;
          }
        }
      }
      return matchCount >= Math.floor(criteriaCount * 0.75);
    });

    console.log('Query results:', filteredResults);
    res.send(filteredResults);
  });
};

// Ajoute un nouveau point de terminaison pour la recherche d'annonces
app.post('/search', (req, res) => {
  handleSearchRequest(req, res);
});
