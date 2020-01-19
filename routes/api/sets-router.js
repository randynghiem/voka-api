const fs = require('fs');
const path = require('path');
const debug = require('debug')('voka-api:sets');
const express = require('express');
const router = express.Router();

router.get('/:level', async (req, res) => {

  const { level } = req.params;
  //current support level A1 only
  if (level !== 'a1') {
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

router.get('/:level/:id', async (req, res) => {
  const { level, id } = req.params;
  if (level !== "a1" || !id) {
    res.status(404).json({ message: "Entry not found!" });
  }

  const fullPath = path.join(__dirname, '../../dataset/Thema.json');
  fs.readFile(fullPath, { encoding: 'utf-8' }, (err, data) => {
    if (!err) {
      const items = JSON.parse(data);
      const results = items.filter(it => it.id == id);
      if (results.length === 1) {
        res.json(results[0]);
      } else {
        res.status(404).json({});
      }
    } else {
      debug(err);
    }
  });
});

module.exports = router;