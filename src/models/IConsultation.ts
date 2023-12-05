import { formatConsultation } from "../utils/enums"

export interface IConsultation{
	id: number,
	name: string
	phone: string
	city: string
	type: formatConsultation
	comment: string
}