import * as Joi from 'joi'
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus
} from '@nestjs/common'
import { HttpExceptionCode } from 'utils/http-exception-code.utils'
import constants from 'utils/constants'

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = Joi.validate(value, this.schema)
    if (error) {
      throw new HttpExceptionCode(
        HttpStatus.BAD_REQUEST,
        constants.codes.VALIDATION_FAILED,
        error)
    }

    return value
  }
}