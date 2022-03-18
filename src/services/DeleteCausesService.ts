import { Service } from 'typedi'
import { Adapters } from '../interfaces'

@Service()
export default class DeleteCausesService {
  async execute(adapters: Adapters, wallet: string) {
		const { logger, repository } = adapters
		const result = await repository.deleteCause(wallet)
		logger.info('Deleting cause')
		return result
  }
}