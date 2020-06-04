const express = require('express');
const app = express();
const DumbName = require('./Shareable-BackEnd/DumbName');

app.use(require('cors')());
app.use(express.json());

app.post('/dumbnames', (req, res) => {
  DumbName
    .create(req.body)
    .then(dumbname => res.send(dumbname));
});

app.get('/dumbnames', (req, res) => {
  DumbName
    .find()
    .then(dumbnames => res.send(dumbnames));
});

app.get('/dumbnames/:id', (req, res) => {
  DumbName
    .findById(req.params.id)
    .then(dumbname => res.send(dumbname));
});

app.patch('/dumbnames/update/:id/:name', (req, res) => {
  DumbName
    .findByIdAndUpdate(req.params.id, { name: req.params.name }, { new: true });
    .then(dumbname => res.send(dumbname))
});

// app.delete('/dumbnames/:id', (req, res) => {
//   DumbName
//     .

// })

module.exports = app;
