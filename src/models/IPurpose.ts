export interface ICreatingPurpose {
  challenge: number
  type: 1 | 2
  quantity: number
  reward: number
}

export interface IPurpose {
  id: number
  customer: number
  challenge: number
  type: 1 | 2
  quantity: number
  reward: number
}

export interface IPurposeResponse {
  purpose_id: number
}

export interface IPersonalPurposeParams {
  type: number
  quantity: number
}
