import { Service } from 'typedi'
import { Adapters } from '../interfaces'
import { CauseUpdate } from '../infrastructure/repositories/CausesRepository'

@Service()
export default class UpdateCausesService {
  async execute(adapters: Adapters, data: CauseUpdate) {
		const { logger, repository } = adapters
		const result = await repository.updateCause(data)
		logger.info('Updating cause', {CauseUpdate: data})
		return result
  }
}