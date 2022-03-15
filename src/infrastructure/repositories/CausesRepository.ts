import { EntityRepository, Repository } from 'typeorm'
import { Inject } from 'typedi'
import Cause from '../../domain/model/Cause'
import { none, option, some } from '@octantis/option'
import CausesRepositoryInterface from './CausesRepositoryInterface'

export type Future<T> = Promise<option<T>>

@EntityRepository(Cause)
export default class TypeORMCausesRepository extends Repository<Cause> implements CausesRepositoryInterface {
  @Inject()
  async createCause(data: Cause): Future<Cause> {
    const cause = await this.manager.save(data)
    if (cause != null) {
      return some(cause)
    }
    return none()
  }

  async findCause(): Future<Cause[]> {
    const causes = await this.find()
    if (Array.isArray(causes)) {
      return some(causes)
    }
    return none()
  }

  async findOneCause(wallet): Future<Cause> {
    const causes = await this.findOne({ wallet })
    return some(causes)
  }
}