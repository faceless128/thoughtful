// set up dependencies
const express = require('express');
const mongoose = require('mongoose');

// express config
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

// mongoose config
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/thoughtfuldb',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  
mongoose.set('debug', true);

// start server
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
