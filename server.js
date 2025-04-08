const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) throw err;
    res.render('index', { todos: results });
  });
});

app.post('/add', (req, res) => {
  const title = req.body.title;
  db.query('INSERT INTO todos (title) VALUES (?)', [title], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.get('/complete/:id', (req, res) => {
  db.query('UPDATE todos SET is_completed = TRUE WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.get('/delete/:id', (req, res) => {
  db.query('DELETE FROM todos WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
