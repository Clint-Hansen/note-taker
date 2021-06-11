const fs = require("fs");
const path = require("path");
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
    let results = notes;

    res.json(results);
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const noteBody = req.body;
    notes.push(noteBody);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    res.json(noteBody)
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
