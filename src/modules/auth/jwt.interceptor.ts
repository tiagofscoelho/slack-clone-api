import {
  Injectable,
  NestInterceptor,
  ExecutionContext
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { AuthService } from './auth.service'

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    return call$.pipe(
      tap(() => {
        const authService = new AuthService(null)
        const {res, user, ...incomingMessage } = context.getArgByIndex(0)
        res.cookie('access_token', authService.createToken(user.email))
      })
    )
  }
}