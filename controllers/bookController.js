const bookModel = require('../models/book.model');
const Book = require('../models/book.model');


exports.createBook =async (req, res) => {
    const { title, author, isRead, readCount, notes } = req.body

    if (!title || !author || !req.body.hasOwnProperty('isREAD') || !readCount || !notes) {
        return res.status(400).json({ error: "fill requierd fields" })
    }

    const existBook = await bookModel.findOne({title, author})
    if(existBook){
        return res.status(400).json({error: "user already exists"})
    }

    const createdbook = await bookModel.create({ title, author, isRead, readCount, notes })
    res.status(201).json({message: 'book created successfully', data: createdbook})
}


exports.getBooks = async (req, res) => {
    const books = await bookModel.find()
    res.json(books)
}


exports.getBookById = async (req, res)=>{
    const {id} = req.params
  
    if (!isValidObjectId(id)) {
      return res.status(400).json({error: "invalid id"})
      
    }
  
    const book = await bookModel.findById(id)
  
    if(!book){
      return res.status(404).json({error: "student not found"})
    }
  
    res.json(book);
  }


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


exports.deleteBook = async (req, res)=>{

    const {id} = req.params
  
    if (!isValidObjectId(id)) {
      return res.status(400).json({error: "invalid id"})
      
    }
  
    const deletedbook = await bookModel.findByIdAndDelete(id)
  
    if(!deletedbook){
      return res.status(404).json({error: "student not found"})
    }
    res.json({message: 'book deleted successfully', data: deletedbook})
  
  
  }


exports.addNote = async (req, res) => {
  try {
    const { note } = req.body;
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







