import {randomUUID} from "node:crypto"
import { UniqueId } from "./unique-id";

export interface ClientProps{
    name: string;
}

export class  Client {
    public id: UniqueId;
	public name: string;

	constructor(props: ClientProps, id?: UniqueId) {
        this.id = id ?? new UniqueId(randomUUID());
        
        Object.assign(this, props);
    }
}