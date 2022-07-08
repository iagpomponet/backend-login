import { v4 as uuidV4 } from 'uuid';

class Product {
	id!: string;
	name!: string;
	description!: string;
	created_at!: Date;
	price!: number;

	constructor(){
		if(!this.id){
			this.id = uuidV4();
		}
	}

}

export { Product };