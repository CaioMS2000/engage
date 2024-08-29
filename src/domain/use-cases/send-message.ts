import { Message } from "../entities/message";
import {  FromMessageAttribute, MessageSender } from "../entities/value-objects/from-message-attribute";
import { MessagesRepository } from "../repositories/messages-repository";

interface SendMessageUseCaseRequest{
    content: string;
    clientId: string;
    agentId: string;
    sender: MessageSender
}

export class SendMessageUseCase{
    constructor(private messagesRepository: MessagesRepository){}

    async execute({content, clientId, agentId, sender}: SendMessageUseCaseRequest){
        const message = new Message({
            content,
            from: FromMessageAttribute.create({
                id: sender === "client" ? clientId : agentId,
                sender
            })
        });

        await this.messagesRepository.create(message);

        return message;
    }
}