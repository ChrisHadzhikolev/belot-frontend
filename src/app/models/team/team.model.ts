import { Game } from "../game/game.model";
import { Player } from "../player/player.model";

export class Team {
    public constructor(init?: Partial<Team>) {
        Object.assign(this, init);
    }

    id?: number;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    players?: Player[];
    gamesAsTeam1?: Game[];
    gamesAsTeam2?: Game[];
}
