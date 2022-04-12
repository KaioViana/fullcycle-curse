const express = require('express');
const mysql = require('mysql')

const app = express();
const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'nodedb'
}

const connection = mysql.createConnection(config);

const createTable = 'CREATE TABLE people(id int not null auto_increment, name varchar(255), primary key(id))'
connection.query(createTable);

const sql = `INSERT INTO people(name) VALUES('Kaio')`;
connection.query(sql);

connection.end();

app.get('/', (req, res) => {
  return res.send(`<h1>FULLCYCLE ROCKS!</h1><br/><br/>-Lista de nomes cadastrada no banco de dados.`);
});

app.listen(port, () => console.log('Server running on port ', port));
