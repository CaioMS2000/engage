import {randomUUID} from "node:crypto"
import { FromMessageAttribute,  } from "./value-objects/from-message-attribute";
import { UniqueId } from "./unique-id";

export interface MessageProps{
    content: string;
    from: FromMessageAttribute;
}

export class  Message {
    public id: UniqueId;
	public content: string;
    public from: FromMessageAttribute;

	constructor(props: MessageProps, id?: UniqueId) {
        this.id = id ?? new UniqueId(randomUUID());
        
        Object.assign(this, props);
    }
}