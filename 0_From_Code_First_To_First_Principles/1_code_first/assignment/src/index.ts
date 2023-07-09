import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/users/new', async (req: Request, res: Response) => {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);
    res.send('User ' + user.name + ' created successfully');
})


app.post('/users/edit/:userId', async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const userRepository = AppDataSource.getRepository(User);
    const userToUpdate = await userRepository.findOneBy({
        id: userId,
    })
    if (userToUpdate != null) {
        userToUpdate.name = req.body.name;
        userToUpdate.email = req.body.email;   
    
        await userRepository.save(userToUpdate)
        res.send('User ' + userToUpdate.name + ' updated successfully');
    }
    else {
        res.status(404).send('User id ' + userId + ' not found');
    }
});

app.get('/users', async (req: Request, res: Response) => {
    const userEmail = req.query.email;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({
        email: userEmail?.toString()
    });
    if (user != null) {
        res.send(user);
    }
    else {
        res.status(404).send('User with email ' + userEmail + ' not found');
    }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

AppDataSource.initialize().then(async () => {
    console.log('TypeORM data source is intialized')
}).catch(error => console.log(error))
