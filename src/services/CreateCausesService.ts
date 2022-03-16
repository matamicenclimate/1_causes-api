import { Service } from 'typedi'
import Cause from '../domain/model/Cause';
import { Adapters, CausesRequestData } from '../interfaces'

@Service()
export default class CreateCausesService {
  async execute(adapters: Adapters, data: CausesRequestData) {
		const { logger, repository } = adapters
		const cause = this._createCause(data)
		logger.info('Create causes service', { CausesRequestData: data })
		const result = await repository.createCause(cause)
		return result
  }

	_createCause (data) {
		const cause = new Cause();
		cause.title = data.title
		cause.description = data.description
		cause.imageUrl = data.imageUrl
		cause.wallet = data.wallet
		
		return cause
	}
}