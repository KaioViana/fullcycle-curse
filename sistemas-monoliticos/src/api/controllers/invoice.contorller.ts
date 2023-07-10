import { IInvoiceService } from "../../interfaces/api-services/invoice-service.interface";
import { Request, Response } from 'express';

class InvoiceController {
  constructor(
    private readonly invoiceService: IInvoiceService
  ) { }

  async getInvoice(req: Request, res: Response) {
    const { id } = req.params
    const input = {
      id,
    }

    const invoice = await this.invoiceService.get(input);
    return res.json({ data: invoice }).status(200).send();
  }
}

export { InvoiceController };
