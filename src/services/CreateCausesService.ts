import { Service } from 'typedi'
import { Adapters, CausesRequestData } from '../interfaces'

@Service()
export default class CreateCausesService {
  async execute(adapters: Adapters, data: CausesRequestData) {
		const { logger, repository } = adapters
		data.date = new Date().toISOString()
		logger.info('Create causes service', { CausesRequestData: data })
		const result = await repository.create(data)
		return result.get()
  }
}