import { Client } from "../entities/client";

export abstract class ClientsRepository{
    abstract create(client: Client): Promise<void>
}