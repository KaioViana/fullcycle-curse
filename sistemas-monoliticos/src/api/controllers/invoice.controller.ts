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

    try {
      const invoice = await this.invoiceService.get(input);
      return res.status(200).json({ data: invoice });
    } catch (err) {
      const error = err as Error;
      return res.status(400).json({ data: { message: 'Bad request', error: error.message } });
    }
  }
}

export { InvoiceController };
