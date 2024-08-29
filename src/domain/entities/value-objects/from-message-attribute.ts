import { ValueObject } from "../value-object";

export type MessageSender = "client" | "agent"
export type FromMessageAttributeProps = {
    id: string
    sender: MessageSender
}

export class FromMessageAttribute extends ValueObject<FromMessageAttributeProps>{
    static create(props: FromMessageAttributeProps){
        return new FromMessageAttribute(props)
    }
}