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



try {
  const namesList = [];

  const connection = mysql.createConnection(config);

  const createTable = 'CREATE TABLE people(id int not null auto_increment, name varchar(255), primary key(id))'
  connection.query(createTable);

  let sql = `INSERT INTO people(name) VALUES("Bob")`;
  connection.query(sql);

  sql = `INSERT INTO people(name) VALUES("Foo")`;
  connection.query(sql);

  sql = `INSERT INTO people(name) VALUES("John")`;
  connection.query(sql);

  const select = 'SELECT name FROM people'
  connection.query(select, (err, result, fields) => {
    if (err) throw err;

    Object.keys(result).forEach(function (key) {
      var row = result[key];
      namesList.push(row.name)
    });
  });


  app.get('/', (req, res) => {
    return res.send(`<h1>FULLCYCLE ROCKS!</h1><br/><b>- Lista de nomes:</b><br/>-- ${namesList.map(name => {
      return `<b>${name}</b> `
    })}`);
  });

  app.listen(port, () => console.log('Server running on port ', port));

  connection.end();
} catch (e) {
  console.log('Error:', e.message);
}
