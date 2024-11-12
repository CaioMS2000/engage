import { Entity } from "@/core/entities/entity";
import { FromMessageAttribute } from "./value-objects/from-message-attribute";
import { Optional } from "@/core/types/optional";

export interface MessageProps {
	content: string;
	from: FromMessageAttribute;
	createdAt: Date;
	updatedAt?: Date;
}

export class Message extends Entity<MessageProps> {
	get content(){
		return this.props.content;
	}

	get from(){
		return this.props.from;
	}

	get createdAt(){
		return this.props.createdAt;
	}

	get updatedAt(){
		return this.props.updatedAt;
	}

	private touch(){
		this.props.updatedAt = new Date();
	}

	static create(props: Optional<MessageProps, 'createdAt'>){
		const newData = new Message({
			...props,
			createdAt: new Date(),
		})

		return newData;
	}
}
