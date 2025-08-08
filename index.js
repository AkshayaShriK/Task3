const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // To parse JSON request bodies

let bookss = [
  { id: 1, title: 'Wings of Fire', author: 'A. P. J. Abdul Kalam' },
  { id: 2, title: 'Ponniyin Selvan', author: 'Kalki Krishnamurthy' },
  { id: 3, title: 'Thirukkural', author: 'Thiruvalluvar' }
];

// GET all books
app.get('/bookss', (req, res) => {
  res.json(bookss);
});

// POST a new book
app.post('/bookss', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and Author are required' });
  }
  const newBook = {
    id: bookss.length > 0 ? bookss[bookss.length - 1].id + 1 : 1,
    title,
    author
  };
  bookss.push(newBook);
  res.status(201).json(newBook);
});

// PUT to update a book by ID
app.put('/bookss/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = bookss.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE a book by ID
app.delete('/bookss/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = bookss.length;
  bookss = bookss.filter(b => b.id !== id);

  if (bookss.length === initialLength) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json({ message: 'Book deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(` Server is running at http://localhost:${PORT}`);
});
