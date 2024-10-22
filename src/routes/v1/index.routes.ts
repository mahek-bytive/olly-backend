import express from 'express';
import comments from './comment.routes'

const app = express();

app.use('/', comment);

export default app;