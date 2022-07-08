import { User } from '../../users/model/User';

export interface ICreateUser {
    username: string;
    password: string;
    email: string;
}
  

export interface IUserRepository {
    create({ username, email, password }: ICreateUser): Promise<void>;
    list(): Promise<User[]>;
    findOneByEmail(email: string): Promise<any>;
}