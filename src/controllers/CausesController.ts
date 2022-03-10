import { Post, Body, JsonController } from 'routing-controllers'
import { Inject, Service } from 'typedi'
import CustomLogger from '../infrastructure/CustomLogger'
import CausesRepository from '../infrastructure/repositories/CausesRepository'
import CausesRepositoryInterface from '../infrastructure/repositories/CausesRepositoryInterface'
import CausesService from '../services/CreateCausesService'
import { CausesRequestData } from '../interfaces'
import { getCustomRepository } from 'typeorm'

@Service()
@JsonController('/api')
export default class CausesController {
  @Inject()
  private readonly service!: CausesService
  private readonly repository: CausesRepositoryInterface
  @Inject()
  private readonly logger!: CustomLogger
  
  constructor() {
    this.repository = getCustomRepository(CausesRepository)
  }

	@Post('/v1/causes')
  async invoke(
    @Body() cause: CausesRequestData,
  ) {
    if (typeof cause === 'string') cause = JSON.parse(cause)
    const adapters: {
      logger: CustomLogger
      repository: CausesRepositoryInterface
    } = {
      logger: this.logger,
      repository: this.repository
    }
    return await this.service.execute(adapters, cause)
  }
}