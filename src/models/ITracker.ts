export interface ICreatingTracker{
	wake_up_time?: string,
	weight?: number,
	fruits?: number
}
export interface IGetTracker{
	id: number,
	wake_up_time: string,
	weight: number,
	fruits: number
}
export interface ITrack{
	id: number,
	type: number,
	additional: string,
	send_time: number,
	completed: boolean,
	notification_send: boolean,
	sleep_time?: number
}

export interface ITrackAdditional {
	amount?: number;
	time: string;
	unit: string
}

export interface ITracksSleepDaysWeek {
	day:string,
	type:1|4
}

export interface ITracks {
	fruitTrack:ITrack[],
	waterTrack:ITrack[],
	sleepTrack:ITrack[],
}

export interface IUpdateTracker {
	id: number,
	type:"weight" | "fruits" | "wake_up_time",
	value: string
}