import { UniqueId } from "@/core/entities/unique-id";
import { ValueObject } from "../value-object";


export type MessageSenderTypes = "AgentSender"|"ClientSender"

export type FromMessageAttributeProps = {
    senderId: UniqueId
    sender: MessageSenderTypes
}

export class FromMessageAttribute extends ValueObject<FromMessageAttributeProps>{
    get senderId(){
        return this.props.senderId;
    }
    
    get sender(){
        return this.props.sender;
    }

    static create(props: FromMessageAttributeProps){
        return new FromMessageAttribute(props)
    }
}