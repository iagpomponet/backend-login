import prisma from '../../../../config/prisma';
import { User } from '../../model/User';
import { ICreateUser, IUpdateValue, IUserRepository } from './../IUserRepository';


class UserRepository implements IUserRepository {
	update(id: string, value: IUpdateValue): Promise<User | null> {
		return prisma.user.update({
			where: {
				id
			},
			data: value
		});
	}
	public static INSTANCE: UserRepository;

	public static getInstace(){
		if(!UserRepository.INSTANCE){
			UserRepository.INSTANCE = new UserRepository();
		}
    
		return UserRepository.INSTANCE;
	}


	async create({ username, password, email }: ICreateUser): Promise<void> {
		const user = new User();

		Object.assign(user, {
			username,
			password,
			email,
			avatar: ''
		});

		await prisma.user.create({ data: user });
	}

	list(): Promise<User[]> {
		return prisma.user.findMany();
	}

	findOneByEmail(email: string) {
		return prisma.user.findUnique({
			where: {
				email: email,
			},
		});
	}

	findById(id: string): Promise<User | null> {
		const userPromise = prisma.user.findUnique({
			where: {
				id
			}}); 

		return userPromise;
	}
}

export { UserRepository };
