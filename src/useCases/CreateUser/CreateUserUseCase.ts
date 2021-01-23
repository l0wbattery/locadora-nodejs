import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./ICreateUserRequestDTO";

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUserRepository
    ) {}

    async execute(data: ICreateUserRequestDTO) {
        const existingUser = await this.usersRepository.findByEmail(data.email);
        
        if(existingUser.email) {
            throw new Error("Usuário já existe!")
        }
        
        const user = new User(data);
        user.passwordCryptograph();
        
        await this.usersRepository.save(user);
    }
}