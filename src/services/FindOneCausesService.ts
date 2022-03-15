import { Service } from 'typedi'
import { Adapters } from '../interfaces'

@Service()
export default class FindOneCausesService {
  async execute(adapters: Adapters, wallet: string) {
		const { logger, repository } = adapters
		logger.info('Find one causes service')
		const result = await repository.findOneCause(wallet)
		return result.get()
  }
}