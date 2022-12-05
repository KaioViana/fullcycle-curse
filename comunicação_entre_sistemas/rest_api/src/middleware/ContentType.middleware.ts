import { Injectable, NestMiddleware, UnsupportedMediaTypeException } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { ContentTypes } from "src/enums/ApplicationTypes.enum";

@Injectable()
export class ContentTypeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { "content-type": contentType } = req.headers;

    const includeContentType = Object.values(ContentTypes).includes(
      contentType
    );

    if (!includeContentType) throw new UnsupportedMediaTypeException();
    next();
  }
}
