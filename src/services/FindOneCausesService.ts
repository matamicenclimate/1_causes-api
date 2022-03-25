import { Service } from 'typedi'
import { Adapters } from '../interfaces'

@Service()
export default class FindOneCausesService {
	async execute(adapters: Adapters, id: string) {
		const { logger, repository } = adapters
		logger.info('Find one causes service with by id', { id })
		const result = await repository.findOneCause(id)
		return result
	}
}