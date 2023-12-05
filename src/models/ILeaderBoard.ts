export interface ILeaderBoardItem {
    id: number;
    name: string;
    total_quantity: number;
    avatar: string;
    surname: string;
}

export interface ILeaderBoardResponse {
    today: ILeaderBoardItem[];
    month: ILeaderBoardItem[];
    year: ILeaderBoardItem[];
}

export interface ILeaderBoardChallenge {
    id: number;
    avatar?: string;
    name?: string;
    surname?: string;
    points: number;
}

export interface ILeaderBoardChallengTeam {
    id: number;
    title?: string;
    points: number;
    active?: number
}
