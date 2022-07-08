import { resolve } from "path";
import { User } from "../../model/User";
import { ICreateUser, IUserRepository } from "../IUserRepository";

class InMemoryUserRepository implements IUserRepository{
    private db: User[];

    public static INSTANCE: InMemoryUserRepository;

    private constructor(){
        this.db = [];
    }

    public static getInstace(){
        if(!InMemoryUserRepository.INSTANCE){
            InMemoryUserRepository.INSTANCE = new InMemoryUserRepository();
        }
        
        return InMemoryUserRepository.INSTANCE;
    }

    create({ username, email, password }: ICreateUser): Promise<void> {
        const user = new User();
        Object.assign(user, {
            username,
            password,
            email
        });

        return new Promise((resolve, _) => {
            this.db.push(user);
            resolve();
        })
    }
    list(): Promise<User[]> {
        return new Promise((res, _) => {
            return res(this.db)
        })
    }

    findOneByEmail(email: string): Promise<any> {
        return new Promise((res, _) => {
            return res(this.db.filter(doc => doc.email === email))
        })
    }

}

export { InMemoryUserRepository as UserRepository }