// import { UniqueId } from "@/core/entities/unique-id";
import { UniqueId } from "../../core/entities/unique-id";
import { Message } from "../entities/message";
import {  FromMessageAttribute, MessageSenderTypes } from "../entities/value-objects/from-message-attribute";
import { MessagesRepository } from "../repositories/messages-repository";

interface SendMessageUseCaseRequest{
    content: string;
    senderId: string;
    sender: MessageSenderTypes
}

export class SendMessageUseCase{
    constructor(private messagesRepository: MessagesRepository){}

    async execute({content, senderId, sender}: SendMessageUseCaseRequest){
        const message = Message.create({
            content,
            from: FromMessageAttribute.create({
                senderId: new UniqueId(senderId),
                sender
            })
        });

        await this.messagesRepository.create(message);

        return message;
    }
}