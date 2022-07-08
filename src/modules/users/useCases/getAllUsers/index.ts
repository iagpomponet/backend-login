import { UserRepository } from "../../repositories/implementations/InMemoryUserRepository";
import { GetAllUsersController } from "./GetAllUserController";
import { GetAllUsersUseCase } from "./GetAllUsersUseCase";


const userRepository = UserRepository.getInstace();
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);

export { getAllUsersController };