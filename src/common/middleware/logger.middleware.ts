import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log(req.protocol, req.httpVersion, req.method, req.baseUrl, req.ip);
    next();
  }
}
