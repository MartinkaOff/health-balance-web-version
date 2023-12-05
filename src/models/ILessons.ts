export interface ILesson {
  id: number
  title: string
  description: string
  type: number
  video: string
  question: string
  answers: string[]
  correct_answer: number
  qr_code: string
  start_date: number
  end_date: number
  score: number
  image: string,
  completed: boolean
}

export interface ICreatingLecture{
  challenge: number,
  title: string,
  description: string,
  type: string,
  start_date: string,
  end_date: string,
  score: number,
  qr_code?:string,
  question?:string,
  correct_answer?: number,
  answers?: string,
  image?: string,
  video?:string
}

export interface ITaskToCompleted {
  dataTaskToCompleted: { answer?: any; file?: string },
  id: number
}