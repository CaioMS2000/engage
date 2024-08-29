import { Message } from "@/domain/entities/message";
import { MessagesRepository } from "@/domain/repositories/messages-repository";

export class InMemoryMessagesRepository implements MessagesRepository{
    public messages: Message[] = [];

    async create(message: Message): Promise<void> {
        this.messages.push(message);
    }
}