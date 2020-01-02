const mongoose = require('mongoose');

const connect = () => {
  const dbURL = "mongodb://" + process.env.COSMOSDB_HOST + ":" + process.env.COSMOSDB_PORT + "/" + process.env.COSMOSDB_DBNAME + "?ssl=true&replicaSet=globaldb";
  return mongoose.connect(dbURL, {
    auth: {
      user: process.env.COSMOSDB_USER,
      password: process.env.COSMOSDB_PASSWORD
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retrywrites: false
  });
};

module.exports = connect;