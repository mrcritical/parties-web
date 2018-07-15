
// @flow
class Party {
    id: string;
    name: string;
    when: PartyWhen;
    autoStart: boolean;
    status: PartyStatus;
}

type PartyStatus = 'created' | 'started' | 'ended' | 'closed';

class PartyWhen {
    created: Date;
    plannedStart: Date;
    actualStart: Date;
    ended: Date;
    closed: Date;
}

interface PartiesRepo {
    create(party: Party) : Promise<Party>;

    list() : Promise<Array<Party>>;

    get(id: string): Promise<Party>;

    update(id: string, party: Party) : Promise<Party>;

    delete(id: String) : Promise<Boolean>;
}