const express = require('express');
const captionsModel = require('../../components/captions');

const router = express.Router();

/**
 * define routing for caption
 */

const getCaption = async (req, res, next) => {
  const { vid, lang } = req.params;
  const caption = await captionsModel.getCaption(vid, lang);
  //Todo: to handle exception
  res.status(200).json(caption);
};

router.get('/:vid/:lang', getCaption);

/**
 * Export router
 */
module.exports = router;