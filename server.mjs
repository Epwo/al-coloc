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



app.post('/del', (req, res) => {
  console.log('We want to remove this:', req.body);
  const annoncerData = req.body;

  const deleteQuery = 'DELETE FROM annoncers WHERE usrName = ? AND adrr = ?';
  pool.query(deleteQuery, [annoncerData.usrName, annoncerData.adrr], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.send('Error while deleting data!');
      return;
    }
    console.log('Deleted row with usrName:', annoncerData.usrName, 'and adrr:', annoncerData.adrr);
    res.send('Data deleted successfully!');
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

