import {randomUUID} from "node:crypto"
import { UniqueId } from "./unique-id";

export interface AgentProps{
    name: string;
}

export class  Agent {
    public id: UniqueId;
	public name: string;

	constructor(props: AgentProps, id?: UniqueId) {
        this.id = id ?? new UniqueId(randomUUID());
        
        Object.assign(this, props);
    }
}