import { AbstractRepository, EntityRepository } from 'typeorm'
import { Inject } from 'typedi'
import Cause from '../../domain/model/Cause'
import { none, option, some } from '@octantis/option'
import CausesRepositoryInterface from './CausesRepositoryInterface'
import { CausesRequestData } from '../../interfaces'

export type Future<T> = Promise<option<T>>

@EntityRepository(Cause)
export default class TypeORMCausesRepository extends AbstractRepository<Cause> implements CausesRepositoryInterface {
  @Inject()
  async create(data: CausesRequestData): Future<Cause> {
    const cause = await this.repository.create(data)
    if (cause != null) {
      return some(cause)
    }
    return none()
  }
}