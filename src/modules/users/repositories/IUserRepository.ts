import { User } from '../../users/model/User';

export interface ICreateUser {
    username: string;
    password: string;
    email: string;
}

export interface IUpdateValue {
    [key: string]: unknown
}
  

export interface IUserRepository {
    create({ username, email, password }: ICreateUser): Promise<void>;
    list(): Promise<User[]>;
    findOneByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>
    update(id: string, value: IUpdateValue): Promise<User | null>
}