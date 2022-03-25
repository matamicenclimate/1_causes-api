import * as Application from 'koa'
import config from '../config/default'
import { customError } from '../infrastructure/errors'
import AuthorizationException from '../infrastructure/errors/AuthorizationException'

export async function authorization(
  ctx: Application.Context,
  next: Application.Next
) {
  const { token } = config
  const { authorization } = ctx.headers
  if (token !== authorization) {
    const error = new AuthorizationException('You cannot access to the server')
    ctx.body = customError(error)
    ctx.status = 401
    return
  } else {
    await next()
  }
}