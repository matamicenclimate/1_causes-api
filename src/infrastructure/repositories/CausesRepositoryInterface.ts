import { option } from "@octantis/option";
import Cause from "../../domain/model/Cause";
import { CauseUpdate } from "./CausesRepository"

export default interface CausesRepositoryInterface {
  createCause(cause: Cause): Promise<option<Cause>>
  findCause(): Promise<Array<Cause>>
  findOneCause(wallet: string): Promise<option<Cause>>
  updateCause(cause: CauseUpdate): Promise<option<Cause>>
}