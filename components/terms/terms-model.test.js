const mongoose = require('mongoose');
const debug = require('debug')('voka-api:terms-model.test');
const env = require('dotenv').config({ path: './bin/config.env' });
const connectMongo = require('../../bin/connect-mongo');
const termsModel = require('./terms-model');

beforeAll(async () => {
  connectMongo().then(() => {
    console.log('Connection to CosmosDB successful');
  })
    .catch((err) => {
      console.log("Error: ", err);
    });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Terms Model", () => {
  describe("getTerms", () => {
    it("Should return more than 1 terms from the database", async (done) => {
      const terms = await termsModel.getTerms();
      expect(terms.length).toBeGreaterThan(0);
      done();
    })
  });
});
