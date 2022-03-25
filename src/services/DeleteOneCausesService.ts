import { Service } from 'typedi'
import { Adapters } from '../interfaces'

@Service()
export default class DeleteOneCausesService {
	async execute(adapters: Adapters, id: string) {
		const { logger, repository } = adapters
		logger.info('Deleting cause', { id })
		const result = await repository.deleteOneCause(id)
		return result
	}
}