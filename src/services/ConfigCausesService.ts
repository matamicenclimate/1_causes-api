import { Service } from 'typedi'
import { Adapters } from '../interfaces'

process.env.RESTAPI_PORT

@Service()
export default class ConfigCausesService {
  async execute(adapters: Adapters) {
    const { logger } = adapters
    logger.info('Find causes config service')
    const result = {
      percentages: {
        marketplace: process.env.MARKETPLACE_PROFIT_PERCENTAJE,
        cause: process.env.MIN_CAUSE_PROFIT_PERCENTAJE,
      },
    }
    return result
  }
}
