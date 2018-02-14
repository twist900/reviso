import express from 'express';

const app = express();

app.get('/*', (req, res) => {
  res.json({ name: 'Reviso API' });
});

app.listen(8080, () => console.log('Running on localhost:8080'));
