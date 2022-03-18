import { EntityRepository, Repository } from 'typeorm'
import Cause from '../../domain/model/Cause'
import { none, option, some } from '@octantis/option'
import CausesRepositoryInterface from './CausesRepositoryInterface'

export type Future<T> = Promise<option<T>>

export type CauseUpdate = Partial<Omit<Cause, 'id'>> &
  Pick<Cause, 'wallet'> & { newWallet?: string }

function normalizeCause(cause: Cause, data: CauseUpdate) {
  for (const key in data) {
    const fieldName = key as keyof typeof data
    if (fieldName === 'newWallet') {
      cause.wallet = data.newWallet as string
      continue
    }
    if (data[fieldName] != null) {
      cause[fieldName] = data[fieldName] as any
    }
  }

  return cause
}

@EntityRepository(Cause)
export default class TypeORMCausesRepository
  extends Repository<Cause>
  implements CausesRepositoryInterface
{
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

  async findOneCause(wallet): Future<Cause> {
    const cause = await this.findOne({ wallet })
    if (cause == null) {
      return none()
    }

    return some(cause)
  }

  async deleteCause(wallet: string): Future<any> {
    const cause = await this.manager.softDelete(Cause, { wallet })
    if (cause == null) {
      return none()
    }

    return some(cause)
  }

  async updateCause(data: CauseUpdate): Future<Cause> {
    const cause = await this.findOne({ wallet: data.wallet })
    if (cause == null) {
      return none() // PANIC
    }

    const causeNormalized = normalizeCause(cause, data)
    const causeUpdated = await this.manager.save(causeNormalized)
    if (causeNormalized != null) {
      return some(causeUpdated as Cause)
    }
    return none()
  }
}
