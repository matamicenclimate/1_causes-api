import {
  Post,
  Body,
  Get,
  JsonController,
  Param,
  Put,
  Delete,
} from 'routing-controllers'
import { Inject, Service } from 'typedi'
import CustomLogger from '../infrastructure/CustomLogger'
import CausesRepository, { CauseUpdate } from '../infrastructure/repositories/CausesRepository'
import CausesRepositoryInterface from '../infrastructure/repositories/CausesRepositoryInterface'
import CreateCausesService from '../services/CreateCausesService'
import FindCausesService from '../services/FindCausesService'
import FindOneCausesService from '../services/FindOneCausesService'
import updateCausesService from '../services/UpdateCausesService'
import deleteCausesService from '../services/DeleteCausesService'
import { Adapters, CausesRequestData } from '../interfaces'
import { getCustomRepository } from 'typeorm'
import { HttpError } from 'koa'
import { resourceLimits } from 'worker_threads'
import ServiceException from '../infrastructure/errors/ServiceException'

@Service()
@JsonController('/api')
export default class CausesController {
  @Inject()
  private readonly createService!: CreateCausesService
  @Inject()
  private readonly findService!: FindCausesService
  @Inject()
  private readonly findOneService!: FindOneCausesService
  @Inject()
  private readonly updateService!: updateCausesService
  @Inject()
  private readonly deleteService!: deleteCausesService
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
    const result = await this.createService.execute(this.getAdapters(), cause)
    if (result.isDefined()) {
      return result.value
    }

    throw new HttpError('Create error')
  }
  
  @Get('/v1/causes')
  async find() {
    return this.findService.execute(this.getAdapters())
  }

  @Get('/v1/causes/:wallet')
  async findOne(@Param('wallet') wallet: string) {
    const result = await this.findOneService.execute(this.getAdapters(), wallet)
    if (result.isDefined()) {
      return result.value
    }

    throw new HttpError('Update error')
  }

  static CauseUpdateError = class CauseUpdateError extends HttpError {
    message: string = "Couldn't update the cause!"
    statusCode: number = 400
  }


	@Put('/v1/causes')
  async update(
    @Body() cause: CauseUpdate,
    ) {
    if (typeof cause === 'string') cause = JSON.parse(cause)
    const result = await this.updateService.execute(this.getAdapters(), cause)
    if (result.isDefined()) {
      return result.value
    }

    throw new CausesController.CauseUpdateError('Update error')
  @Delete('/v1/causes/:wallet')
  async delete(@Param('wallet') wallet: string) {
    try {
      const result = await this.deleteService.execute(
        this.getAdapters(),
        wallet
      )
      if (result.isDefined()) {
        return result.value
      }
    } catch (error) {
      const message = `Delete cause error: ${error.message}`
      this.logger.error(message, { stack: error.stack })
      throw new ServiceException(message)
    }
  }
  
  getAdapters(): Adapters {
    return {
      logger: this.logger,
      repository: this.repository
    }
  }
}
