import { Post, Body, Controller } from 'routing-controllers'
import { Inject, Service } from 'typedi'
import CustomLogger from '../infrastructure/CustomLogger'
import CausesService from '../services/CreateCausesService'
import { CausesRequestData } from '../interfaces'

@Service()
@Controller('/api')
export default class CausesController {
  @Inject()
  private readonly service!: CausesService
  @Inject()
  private readonly logger!: CustomLogger

	@Post('/v1/causes')
  async invoke(
    @Body() cause: CausesRequestData,
  ) {
    if (typeof cause === 'string') cause = JSON.parse(cause)
    const adapters: {
      logger: CustomLogger
    } = {
      logger: this.logger
    }
    return this.service.execute(adapters, cause)
  }
}