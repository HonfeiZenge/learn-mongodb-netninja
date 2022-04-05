const { MongoClient } = require('mongodb')

let dbConnection

const connectDB = async (cb) => {
  try {
    const conn = await MongoClient.connect('mongodb://localhost:27017/bookstore')
    dbConnection = conn.db()
    return cb()
  }
  catch(err) {
    console.log(err.message)
    return cb(err)
  }
}

const getDB = () => dbConnection

module.exports = { connectDB, getDB }