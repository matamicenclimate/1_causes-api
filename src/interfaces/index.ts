import CustomLogger from "../infrastructure/CustomLogger";
import CausesRepositoryInterface from "../infrastructure/repositories/CausesRepositoryInterface";

export interface CausesRequestData {
	title: string
	description: string
	wallet: string
  imageUrl: string
	date?: string
}
export interface Adapters {
	logger: CustomLogger
	repository: CausesRepositoryInterface
}