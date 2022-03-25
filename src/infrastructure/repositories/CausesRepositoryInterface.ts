import { option } from "@octantis/option";
import { UpdateResult } from "typeorm";
import Cause from "../../domain/model/Cause";

export default interface CausesRepositoryInterface {
  createCause(cause: Cause): Promise<option<Cause>>
  findCause(): Promise<Array<Cause>>
  findOneCause(id: string): Promise<option<Cause>>
  updateOneCause(cause: Cause, id: string): Promise<option<UpdateResult>>
  deleteOneCause(id: string): Promise<option<Cause>>
}