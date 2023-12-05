import {ICreatingPurpose} from "./IPurpose";

export interface IChallenge {
    id: number;
    title: string;
    description: string;
    type: number;
    image: string;
    start_date: number;
    end_date: number;
    team_amount?: number;
    max_peoples?: number;
    register_team?: number;
    total_lessons?: number;
    active: number;
    purpose: ICreatingPurpose;
    teams?: any;
    customer_team_name: string
    platform: {
        id: number;
        title: string;
        register_start: number;
        register_end: number;
        start_date: number;
        end_date: number;
        status: boolean;
    };
    homeworks: number;
    remains_to_pass: number
}

export interface ITypeChallenges {
    personal: IChallenge[],
    common: IChallenge[],
    command: IChallenge[],
    all: IChallenge[]
}

export interface IAllChallenge {
    newChallenges: ITypeChallenges,
    activeChallenges:ITypeChallenges
}

export interface ITeam {
    id: number;
    challenge_id: number;
    title: string;
    size: number;
}

export interface ITeamJoinResponse {
    success:boolean,
    errors: string
}

export interface ICustomersTeam{
    customers: {
        id: number;
        name: string;
        avatar: string;
    }[]
    title: string
}

export interface ICustomersPersonalChallenge {
    id: number;
    name: string;
    avatar: string;
    surname: string
}

export interface ICreatingChallenge {
    title: string;
    description: string;
    type: 1 | 2 | 3;
    image: string;
    start_date: Date | string;
    end_date: Date | string;
    team_amount?: number | string;
    max_peoples?: number | string;
    customers?: number[] | string
    platform: number
}

export interface ICreatingChallengeResponse {
    challenge_id: number
}

export type KeysCreatingChallenge = keyof ICreatingChallenge;

export interface IChallengesShorts {
    id: number;
    title: string;
    type: number;
}
export interface IChallengeTeamsShorts {
    id: number;
    title: string;
}