import { HttpException } from '@nestjs/common'

export class HttpExceptionCode {
  constructor(status: number, code: string, message: string | object) {
    return new HttpException({
      code,
      message
    }, status)
  }
}
