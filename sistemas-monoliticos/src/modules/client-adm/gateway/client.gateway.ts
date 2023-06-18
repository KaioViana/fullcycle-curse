import { ClientAdm } from "../domain/client.entity";

interface IClientGateway {
  add(client: ClientAdm): Promise<void>;
  find(id: string): Promise<ClientAdm>;
}

export { IClientGateway }
