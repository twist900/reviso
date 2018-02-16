import express from 'express';
import routes from './routes';

const app = express();
routes.init(app);

app.listen(8080, () => console.log('Running on localhost:8080'));

export default app;
