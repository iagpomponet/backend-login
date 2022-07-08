import { v4 as uuidV4 } from 'uuid';

export class User {
	username!: string;
	password!: string;
	email!: string;
	id!: string;
    
    
    
	constructor(){
		if(!this.id){
			this.id = uuidV4();
		}
	}
}