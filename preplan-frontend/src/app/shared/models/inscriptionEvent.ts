import { Edition, Position } from './event';
import { Profile } from './user';

export class Availability {
    id?: string;
    startDate: Date;
    endDate: Date;
    state: string;

    tenantId?: number;
    availabilityId?: number;
}

export class Contract {
    id?: string;
    contractId?: number;
    maximumMinutesPerDay: string;
    name: string;

    edition?: Edition;
    tenantId?: number;
}

export class Shift {
    id?: string;
    edition: Edition;
    pinnedByUser?: boolean;
    position: Position;
    startDate: Date;
    endDate: Date;
    numberVolunteers?: number;

    shiftId?: number;
    volunteerId?: number;
}

export class InscriptionEvent {
    id?: string;
    edition: Edition;
    profile: Profile;
    contract: Contract;
    availabilities: Availability[];
    positions: Position[];
    status: string;
    inscriptionDate: Date;
    lastUpdated: Date;

    volunteerId?: number;
}