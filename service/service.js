
const mongoose = require('mongoose');
const { isValidObjectId } = mongoose;
const Book = require('../models/book.model');

exports.createBook = async (req, res) => {
  try {
    const { title, author, isRead, readCount, notes } = req.body;

    if (!title || !author || !req.body.hasOwnProperty('isRead') || readCount === undefined || !notes) {
      return res.status(400).json({ error: "fill required fields" });
    }

    const existBook = await Book.findOne({ title, author });
    if (existBook) {
      return res.status(400).json({ error: "book already exists" });
    }

    const createdBook = await Book.create({ title, author, isRead, readCount, notes });
    res.status(201).json({ message: 'book created successfully', data: createdBook });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "invalid id" });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "book not found" });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const wasRead = book.isRead;
    Object.assign(book, req.body);

    if (!wasRead && req.body.isRead === true) {
      book.readCount += 1;
    }

    await book.save();
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "invalid id" });
    }

    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ error: "book not found" });
    }
    res.json({ message: 'book deleted successfully', data: deletedBook });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addNote = async (req, res) => {
  try {
    const { note } = req.body;
    if (!note) return res.status(400).json({ error: 'Note is required' });

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    book.notes.push(note);
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTopBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ readCount: -1 }).limit(5);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getReadBooks = async (req, res) => {
    try {
      const books = await Book.find({ isRead: true });
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: "armushaobs" });
    }
  };


  exports.getUnreadBooks = async (req, res) => {
    try {
      const books = await Book.find({ isRead: false });
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: "armushaobs" });
    }
  };