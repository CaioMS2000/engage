import { Entity } from "@/core/entities/entity";
import { Optional } from "@/core/types/optional";


export interface AgentProps {
	name: string;
	createdAt: Date;
	updatedAt?: Date;
}

export class Agent extends Entity<AgentProps> {
	get name(){
		return this.props.name;
	}

	get createdAt(){
		return this.props.createdAt;
	}

	get updatedAt(){
		return this.props.updatedAt;
	}

	static create(props: Optional<AgentProps, 'createdAt'>){
		const newData = new Agent({
			...props,
			createdAt: new Date(),
		})

		return newData;
	}
}
