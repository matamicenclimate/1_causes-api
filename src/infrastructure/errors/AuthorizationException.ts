export default class AuthorizationException extends Error {
  public statusCode: number
  constructor(message: string) {
    super()
    this.message = message
    this.statusCode = 401
  }
}