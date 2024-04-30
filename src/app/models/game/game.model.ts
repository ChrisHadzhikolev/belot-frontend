import { Combination } from "../combination/combination.model";
import { Round } from "../round/round.model";
import { Team } from "../team/team.model";

export class Game {
    public constructor(init?: Partial<Game>) {
        Object.assign(this, init);
    }

    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    status?: string;
    team1?: Team;
    team2?: Team;
    result_team1?: number;
    result_team2?: number;
    combinations?: Combination[];
    rounds?: Round[];
}
