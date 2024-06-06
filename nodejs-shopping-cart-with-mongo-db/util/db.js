const mongodb = require("mongodb");
const MongClient = mongodb.MongoClient;

let db;

const mongoConnect = callback => {
  MongClient.connect(
    "mongodb+srv://anandhunatesh:htvCVibjITOQZtdm@cluster0.abszlhr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((result) => {
      console.log("Connected!");
      db = result.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
    if(db)
    return db;
    throw 'No DB Found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
