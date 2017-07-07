import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import morgan from 'morgan';

import todosRoutes from './routes/todos';

const app = express();

app.server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todos');

app.server.listen(process.env.PORT || 8000, () => {
	console.log(`Started on http://127.0.0.1:${app.server.address().port}`); //eslint-disable-line
});

app.use('/todos', todosRoutes);

app.get('/', (req, res) => {
  res.send(`App running at http://127.0.0.1:${app.server.address().port}`);
});

export default app;
