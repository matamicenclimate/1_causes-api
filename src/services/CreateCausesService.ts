import { Service } from 'typedi'
import { CausesRequestData } from '../interfaces'

@Service()
export default class CreateCausesService {
  async execute(adapters, data: CausesRequestData) {
		const { logger, repository } = adapters
		data.date = new Date().toISOString()
		logger.info('Create causes service', { CausesRequestData: data })

		return await repository.createCause(data)
  }
}