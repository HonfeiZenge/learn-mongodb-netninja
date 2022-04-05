'use strict'
// dependency imports
const express = require('express')
const { ObjectId } = require('mongodb')
// component imports
const { connectDB, getDB } = require('./config/db')

// init express app
const app = express()
const PORT = process.env.PORT || 4100

// db connection
let db

connectDB((err) => {
  if (!err) {
    console.log(`app listening on port ${PORT}`)
  }
  db = getDB()
})

// routes
app.get('/', (req, res) => res.send('Hello Node JS'))
app.get('/books', async (req, res) => {
  try {
    let books = []
    const Book = db.collection('books')
    await Book.find().sort({ author: 1 }).forEach(book => books.push(book))

    return res.status(200).json(books)
  }
  catch(err) {
    console.log(err.message)
    return res.status(400).json({ msg: err.message })
  }
})
app.get('/books/:id', async (req, res) => {
  try {
    const bookID = req.params.id
    if (ObjectId.isValid(bookID)) {
      const Book = db.collection('books')
      const bookData = await Book.findOne({ _id: ObjectId(bookID) })

      return res.status(200).json(bookData)
    } else return res.status(500).json({ error: 'the ID is not valid' })
  }
  catch(err) {
    console.log(err.message)
    return res.status(400).json({ msg: err.message })
  }
})

// start listen to the server
app.listen(PORT, console.log(`Server running localy at ${PORT}`))
