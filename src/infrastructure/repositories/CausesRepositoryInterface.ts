import Cause from "../../domain/model/Cause";

export default interface CausesRepositoryInterface {
  create(cause: Cause)
}