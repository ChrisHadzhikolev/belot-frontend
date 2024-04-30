import { Combination } from "../combination/combination.model";
import { Team } from "../team/team.model";

export class Player {
    public constructor(init?: Partial<Player>) {
        Object.assign(this, init);
    }

    id?: number;
    name?: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
    combinations?: Combination[];
    teams?: Team[];
}
