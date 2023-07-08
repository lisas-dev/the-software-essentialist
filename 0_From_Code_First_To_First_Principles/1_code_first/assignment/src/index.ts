import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/users/new', (req: Request, res: Response) => {
  const name = req.body.name;
  res.send('Request to create user with name ' + name + ' received successfully');
});

app.post('/users/edit/:userId', (req, res) => {
  const userId = req.params.userId;
  res.send('Request to edit user with userId ' + userId + ' received successfully');
});

app.get('/users', (req, res) => {
  const email = req.query.email;
  res.send('Request to retrieve user with email ' + email + ' received successfully');
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});