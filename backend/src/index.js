import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';

import './config';

const app = express();
app.use(bodyParser.json());

routes.init(app);

app.listen(8080, () => console.log('Running on localhost:8080'));

export default app;
