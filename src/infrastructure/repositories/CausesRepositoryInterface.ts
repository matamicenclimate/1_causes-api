import Cause from "../../domain/model/Cause";
import { CausesRequestData } from "../../interfaces";

export default interface CausesRepositoryInterface {
  create(cause: CausesRequestData)
}