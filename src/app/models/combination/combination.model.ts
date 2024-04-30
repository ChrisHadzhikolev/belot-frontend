import { Game } from "../game/game.model";
import { Player } from "../player/player.model";
import { Round } from "../round/round.model";

export class Combination {
    public constructor(init?: Partial<Combination>) {
        Object.assign(this, init);
    }

    id?: number;
    combination?: string;
    player?: Player;
    game?: Game;
    round?: Round;
    createdAt?: Date;
    updatedAt?: Date;
}
