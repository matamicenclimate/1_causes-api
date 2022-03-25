import { Service } from 'typedi'
import { Adapters } from '../interfaces'

@Service()
export default class FindCausesService {
  async execute(adapters: Adapters) {
		const { logger, repository } = adapters
		logger.info('Find causes service')
		const result = await repository.findCause()
		return result
  }
}