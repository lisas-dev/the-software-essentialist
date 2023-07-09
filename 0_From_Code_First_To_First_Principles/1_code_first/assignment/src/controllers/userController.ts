import "reflect-metadata";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import { RequestResult } from "../models/RequestResult";

export async function createUser(userJson: any) {
    try {
        const user = new User();
        user.name = userJson.name;
        user.email = userJson.email;
    
        const userRepository = AppDataSource.getRepository(User);
        await userRepository.save(user);
        const result = new RequestResult(201, true, "User " + user.name + " created successfully");
        return result;
    }
    catch (error) {
        console.log(error);
        const result = new RequestResult(500, false, "An error occurred creating the user");
        return result;
    }
}

export async function updateUser(userId: number, userJson: any) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const userToUpdate = await userRepository.findOneBy({
            id: userId,
        })
        if (userToUpdate != null) {
            userToUpdate.name = userJson.name;
            userToUpdate.email = userJson.email;   
        
            await userRepository.save(userToUpdate)
            const result = new RequestResult(200, true, "User " + userToUpdate.name + " updated successfully");
            return result;
        }
        else {
            const result = new RequestResult(404, false, "User id " + userId + " was not found");
            return result;
        }
    }
    catch (error) {
        console.log(error);
        const result = new RequestResult(500, false, "An error occurred updating the user");
        return result;
    }
}

export async function getUserByEmail(userEmail: string)
{
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({
            email: userEmail
        });
        if (user != null) {
            const result : any = user;
            return result;
        }
        else {
            const result : any = new RequestResult(404, false, "User with email " + userEmail + " not found");
            return result;
        }
    }
    catch (error) {
        console.log(error);
        const result : any = new RequestResult(500, false, "An error occurred retrieving the user");
        return result;
    }
}