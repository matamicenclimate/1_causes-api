import { EntityRepository, Repository, UpdateResult } from 'typeorm'
import Cause from '../../domain/model/Cause'
import { none, option, some } from '@octantis/option'
import CausesRepositoryInterface from './CausesRepositoryInterface'

export type Future<T> = Promise<option<T>>

@EntityRepository(Cause)
export default class TypeORMCausesRepository
  extends Repository<Cause>
  implements CausesRepositoryInterface {
  async createCause(data: Cause): Future<Cause> {
    const cause = await this.manager.save(data)
    const list = await this.find()
    if (cause != null) {
      return some(cause)
    }
    return none()
  }

  async findCause(): Promise<Cause[]> {
    return await this.find()
  }

  async findOneCause(id): Future<Cause> {
    const cause = await this.findOne({ id })
    if (cause == null) {
      return none()
    }

    return some(cause)
  }

  async deleteCause(id: string): Future<any> {
    const cause = await this.manager.softDelete(Cause, { id })
    if (cause == null) {
      return none()
    }

    return some(cause)
  }

  async updateCause(data: Cause, id: string): Future<UpdateResult> {
    const result: UpdateResult = await this.manager.update(Cause, id, data)
    if (result.affected) {
      return some(result)
    }
    return none()
  }
}
