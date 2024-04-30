import { Combination } from "../combination/combination.model";
import { Game } from "../game/game.model";

export class Round {
    public constructor(init?: Partial<Round>) {
        Object.assign(this, init);
    }

    id?: number;
    roundNumber?: number;
    game?: Game;
    result_team1?: number;
    result_team2?: number;
    combinations?: Combination[];
    createdAt?: Date;
    updatedAt?: Date;
}
