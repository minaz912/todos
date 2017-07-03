import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();

app.server = http.createServer(app);
app.use(bodyParser.json());
app.use(morgan('dev'));

app.server.listen(process.env.PORT || 8000, () => {
		console.log(`Started on port ${app.server.address().port}`); //eslint-disable-line
	});

app.get('/', (req, res) => {
  res.json({data: 'hello'});
})
