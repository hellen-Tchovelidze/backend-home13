const express = require("express");
const router = express.Router();
const {
  createBook,
  getBooks,
  getTopBooks,
  getBookById,
  updateBook,
  deleteBook,
  addNote,
  getReadBooks,
  getUnreadBooks,
} = require("../service/service");

router.post("/", createBook);
router.get("/", getBooks);
router.get("/top-5", getTopBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.post("/:id/add-note", addNote);
router.get("/read", getReadBooks);
router.get("/unread", getUnreadBooks);

module.exports = router;
