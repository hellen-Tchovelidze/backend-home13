const { default: mongoose } = require("mongoose");



const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
        default: false,
    },
    readCount: { type: Number, default: 0 },
    notes: [{ type: String }],
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("book", bookSchema);
