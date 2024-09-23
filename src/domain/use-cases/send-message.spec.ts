import { InMemoryMessagesRepository } from "test/repostiroy/in-memory-messages-repository";
import { SendMessageUseCase } from "./send-message";
import { Client } from "../entities/client";

let inMemoryMessagesRepository: InMemoryMessagesRepository;

beforeEach(() => {
    inMemoryMessagesRepository = new InMemoryMessagesRepository()
})

test("client sends a message", async () => {
    const useCase = new SendMessageUseCase(inMemoryMessagesRepository);
    const clientSender = Client.create({name: "any name"});
    const message = await useCase.execute({
        content: "any content",
        senderId: clientSender.id.toString(),
        sender: "ClientSender"
    })

    expect(message.content).toBe("any content");
    expect(message.from.sender).toBe("ClientSender");
})