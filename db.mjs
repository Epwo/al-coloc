import mysql from 'mysql';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name'
});

// Execute queries
pool.query('SELECT * FROM your_table', (error, results, fields) => {
  if (error) {
    console.error('Error executing query:', error);
    return;
  }
  console.log('Query results:', results);
});


