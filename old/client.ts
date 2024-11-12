import { Entity } from "@/core/entities/entity";
import { Optional } from "@/core/types/optional";

export interface ClientProps {
	name: string;
	createdAt: Date;
	updatedAt?: Date;
}

export class Client extends Entity<ClientProps> {
	get name(){
		return this.props.name;
	}

	get createdAt(){
		return this.props.createdAt;
	}

	get updatedAt(){
		return this.props.updatedAt;
	}
	
	static create(props: Optional<ClientProps, 'createdAt'>){
		const newData = new Client({
			...props,
			createdAt: new Date(),
		})

		return newData;
	}
}
