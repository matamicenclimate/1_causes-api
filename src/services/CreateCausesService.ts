import { Service } from 'typedi'
import { CausesRequestData } from '../interfaces'

@Service()
export default class CreateCausesService {
  async execute(adapters, data: CausesRequestData) {
		const { logger } = adapters
		logger.info('Create causes service', { CausesRequestData: data })
		const {
			title,
			description,
			wallet,
      imageUrl,
		} = data
		
		return data
  }
}