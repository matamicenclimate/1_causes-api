import { Service } from 'typedi'
import { Adapters } from '../interfaces'
import ServiceException from '../infrastructure/errors/ServiceException'

@Service()
export default class ConfigCausesService {
  async execute(adapters: Adapters) {
    const { logger } = adapters
    logger.info('Find causes config service')
    if (process.env.MARKETPLACE_PROFIT_PERCENTAJE == null || process.env.MIN_CAUSE_PROFIT_PERCENTAJE == null ) {
      throw new ServiceException('Cause or Marketplace precentage not found')
    }

    const result = {
      percentages: {
        marketplace: parseInt(process.env.MARKETPLACE_PROFIT_PERCENTAJE),
        cause: parseInt(process.env.MIN_CAUSE_PROFIT_PERCENTAJE),
      },
    }
    return result
  }
}
