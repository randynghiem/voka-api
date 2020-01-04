const he = require('he');
const axios = require('axios');
const _ = require('lodash');
const striptags = require('striptags');
const debug = require('debug')('voka-api:captions-model');

const getCaption = async (videoID, lang = 'de') => {
  const videoUrl = process.env.YOUTUBE_URL + videoID;
  const { data } = await axios.get(videoUrl);
  const decodedData = decodeURIComponent(data);

  debug('videoUrl: ' + videoUrl);

  // * ensure we have access to captions data
  if (!decodedData.includes('captionTracks'))
    throw new Error(`Could not find captions for video: ${videoID}`);

  const regex = /({"captionTracks":.*isTranslatable":(true|false)}])/;
  const [match] = regex.exec(decodedData);
  const { captionTracks } = JSON.parse(`${match}}`);

  const subtitle =
    _.find(captionTracks, {
      vssId: `.${lang}`,
    }) || _.find(captionTracks, {
      vssId: `a.${lang}`,
    }) ||
    _.find(captionTracks, ({ vssId }) => vssId && vssId.match(`.${lang}`));

  // * ensure we have found the correct subtitle lang
  if (!subtitle || (subtitle && !subtitle.baseUrl))
    throw new Error(`Could not find ${lang} captions for ${videoID}`);

  const { data: transcript } = await axios.get(subtitle.baseUrl);
  const lines = transcript
    .replace('<?xml version="1.0" encoding="utf-8" ?><transcript>', '')
    .replace('</transcript>', '')
    .split('</text>')
    .filter(line => line && line.trim())
    .map(line => {
      const startRegex = /start="([\d.]+)"/;
      const durRegex = /dur="([\d.]+)"/;

      const [, start] = startRegex.exec(line);
      const [, dur] = durRegex.exec(line);

      const htmlText = line
        .replace(/<text.+>/, '')
        .replace(/&amp;/gi, '&')
        .replace(/<\/?[^>]+(>|$)/g, '');

      const decodedText = he.decode(htmlText);
      const text = striptags(decodedText);

      return { start, dur, text, };
    });

  return lines;
};

module.exports = {
  getCaption: getCaption
};