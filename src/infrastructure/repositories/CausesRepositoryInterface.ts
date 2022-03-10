import Cause from "../../domain/model/Cause";

export default interface PersonRepositoryInterface {
  create(cause: Cause)
}