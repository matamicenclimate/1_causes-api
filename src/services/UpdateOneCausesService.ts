import { Service } from 'typedi'
import Cause from '../domain/model/Cause'
import { Adapters } from '../interfaces'

@Service()
export default class UpdateOneCausesService {
	async execute(adapters: Adapters, data: Cause, id: string) {
		const { logger, repository } = adapters
		logger.info('Updating cause', { cause: data, id })
		const result = await repository.updateOneCause(data, id)
		return result
	}
}