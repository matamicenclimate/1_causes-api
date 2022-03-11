import { Post, Body, Get, JsonController } from 'routing-controllers'
import { Inject, Service } from 'typedi'
import CustomLogger from '../infrastructure/CustomLogger'
import CausesRepository from '../infrastructure/repositories/CausesRepository'
import CausesRepositoryInterface from '../infrastructure/repositories/CausesRepositoryInterface'
import CreateCausesService from '../services/CreateCausesService'
import FindCausesService from '../services/FindCausesService'
import { Adapters, CausesRequestData } from '../interfaces'
import { getCustomRepository } from 'typeorm'

@Service()
@JsonController('/api')
export default class CausesController {
  @Inject()
  private readonly createService!: CreateCausesService
  @Inject()
  private readonly findService!: FindCausesService
  private readonly repository: CausesRepositoryInterface
  @Inject()
  private readonly logger!: CustomLogger
  
  constructor() {
    this.repository = getCustomRepository(CausesRepository)
  }
  
	@Post('/v1/causes')
  async create(
    @Body() cause: CausesRequestData,
    ) {
    if (typeof cause === 'string') cause = JSON.parse(cause)
    return await this.createService.execute(this.getAdapters(), cause)
  }
  
  @Get('/v1/causes')
  async find() {
    return this.findService.execute(this.getAdapters())
  }
  
  getAdapters(): Adapters {
    return {
      logger: this.logger,
      repository: this.repository
    }
  }
}
