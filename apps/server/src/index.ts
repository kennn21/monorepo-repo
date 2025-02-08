import express from 'express';

const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.json({ message: 'Express + TypeScript Server' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
