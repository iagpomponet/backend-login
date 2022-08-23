import { User } from '../../model/User';
import { ICreateUser, IUpdateValue, IUserRepository } from '../IUserRepository';

class InMemoryUserRepository implements IUserRepository{
	private db: User[];

	public static INSTANCE: InMemoryUserRepository;

	constructor(){
		this.db = [];
	}
	findById(id: string): Promise<User | null> {
		throw new Error('Method not implemented.');
	}
	update(id: string, value: IUpdateValue): Promise<User | null> {
		throw new Error('Method not implemented.');
	}

	public static getInstace(){
		if(!InMemoryUserRepository.INSTANCE){
			InMemoryUserRepository.INSTANCE = new InMemoryUserRepository();
		}
        
		return InMemoryUserRepository.INSTANCE;
	}

	async create({ username, email, password }: ICreateUser): Promise<void> {
		const user = new User();
		Object.assign(user, {
			username,
			password,
			email
		});

		const userByEmail = await this.findOneByEmail(email);

		return new Promise((resolve, reject) => {
			if(userByEmail){
				reject();
			}

			this.db.push(user);
			resolve();
		});
	}
	list(): Promise<User[]> {
		return new Promise((res, _) => {
			return res(this.db);
		});
	}

	findOneByEmail(email: string): Promise<any> {
		const results = this.db.filter(doc => doc.email === email);
		return new Promise((res, _) => {
			return res(results.length ? results[0] : null);
		});
	}

}

export { InMemoryUserRepository };