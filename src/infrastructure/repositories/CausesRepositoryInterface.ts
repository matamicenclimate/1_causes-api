import Cause from "../../domain/model/Cause";

export default interface CausesRepositoryInterface {
  createCause(cause: Cause)
  findCause()
  findOneCause(wallet: string)
}