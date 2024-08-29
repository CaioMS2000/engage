import { InMemoryMessagesRepository } from "test/repostiroy/in-memory-messages-repository";
import { SendMessageUseCase } from "./send-message";

let inMemoryMessagesRepository: InMemoryMessagesRepository;

beforeEach(() => {
    inMemoryMessagesRepository = new InMemoryMessagesRepository()
})

test("send a message", async () => {
    const useCase = new SendMessageUseCase(inMemoryMessagesRepository);
    const data = {
        content: "any content",
        clientId: "fake-id-1",
        agentId: "fake-id-2",
    }
    const message = await useCase.execute({
        ...data,
        sender: "client",
    })

    expect(message.content).toBe("any content");
})