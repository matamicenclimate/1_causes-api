import { EntityRepository, Repository } from 'typeorm'
import Cause from '../../domain/model/Cause'
import { none, option, some } from '@octantis/option'
import CausesRepositoryInterface from './CausesRepositoryInterface'

export type Future<T> = Promise<option<T>>

@EntityRepository(Cause)
export default class TypeORMCausesRepository extends Repository<Cause> implements CausesRepositoryInterface {
  async createCause(data: Cause): Future<Cause> {
    const cause = await this.create(data)
    if (cause != null) {
      return some(cause)
    }
    return none()
  }
}