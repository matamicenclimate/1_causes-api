import { Service } from 'typedi'
import { Adapters } from '../interfaces'

@Service()
export default class DeleteCausesService {
	async execute(adapters: Adapters, id: string) {
		const { logger, repository } = adapters
		logger.info('Deleting cause', { id })
		const result = await repository.deleteCause(id)
		return result
	}
}