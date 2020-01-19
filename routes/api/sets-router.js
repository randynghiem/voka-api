const fs = require('fs');
const path = require('path');
const debug = require('debug')('voka-api:sets');
const express = require('express');
const router = express.Router();

router.get('/:level', async (req, res, next) => {

  const { level } = req.params;
  //current support level A1 only
  if (level.toLowerCase() !== 'a1') {
    res.status(404).json({ message: "Invalid level!" });
  }

  const fullPath = path.join(__dirname, '../../dataset/Thema.json');
  fs.readFile(fullPath, { encoding: 'utf-8' }, (err, data) => {
    if (!err) {
      res.status(200).json(JSON.parse(data));
    } else {
      debug(err);
    }
  });
});

module.exports = router;