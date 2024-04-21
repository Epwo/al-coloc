import mysql from 'mysql';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'cleroot',
  database: 'alcoloc'
});

pool.on('connection', (connection) => {
  console.log('Connected to MySQL server');
});

// Execute queries
pool.query('SELECT * FROM annoncers', (error, results, fields) => {
  if (error) {
    console.error('Error executing query:', error);
    return;
  }
  console.log('Query results:', results);
});

// Préparez les données à insérer
var annoncerData = {
  usrName: 'John Doe',
  adrr: '10 rue du cul, 75000 Paris',
  nbPlace: '2',
  ConsoNeeds: '2',
  AgeMin: '18',
  AgeMax: '30',
  // Ajoutez d'autres champs selon votre table 'annoncers'
};

// Créez la requête SQL d'insertion
const query = 'INSERT INTO annoncers SET ?';

// Exécutez la requête d'insertion
pool.query(query, annoncerData, (error, results) => {
  if (error) {
    console.error('Error executing query:', error);
    return;
  }
  console.log('Inserted new row with ID:', results.insertId);
});


/*
// Close connections
pool.end((error) => {
  if (error) {
    console.error('Error closing pool:', error);
    return;
  }
  console.log('Pool closed successfully');
});
*/