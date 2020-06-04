const mongoose = require('mongoose');
const app = require('./src/App');

mongoose.connect('mongodb://localhost:27017/dumbnames', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(7890, () => {
  console.log('Started on 7890');
});
