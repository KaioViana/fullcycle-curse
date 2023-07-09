import { IClientsService } from "../../interfaces/api-services/clients-service.interface";
import { Request, Response } from 'express';

class ClientsController {
  constructor(
    private readonly clientsService: IClientsService,
  ) { }

  async createClient(req: Request, res: Response) {
    const { body } = req;
    const input = {
      name: body?.name,
      email: body?.email,
      document: body?.document,
      address: {
        street: body?.address?.street,
        number: body?.address?.number,
        complement: body?.address?.complement,
        city: body?.address?.city,
        state: body?.address?.state,
        zipCode: body?.address?.zipCode,
      }
    }

    const user = await this.clientsService.create(input);
    return res.json({ data: user });
  }
}

export { ClientsController };
