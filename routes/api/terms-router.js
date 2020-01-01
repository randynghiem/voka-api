const express = require('express');

// define routing
const termRouter = express.Router();

termRouter.get('/', (req, res, next)=> {
  res.json({ 
    term: "test",
    phonetic: "",
    meaning: "meaning",
    example: "example"
  });
});


module.exports = termRouter;