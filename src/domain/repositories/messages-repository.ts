import { Message } from "../entities/message";

export abstract class MessagesRepository {
    abstract create(message: Message): Promise<void>
}