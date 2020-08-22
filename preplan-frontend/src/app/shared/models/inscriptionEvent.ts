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
    maximumMinutesPerDay: number;
    name: string;

    edition?: Edition;
    tenantId?: number;
}

export class Shift {
    id?: string;
    edition: Edition;
    pinnedByUser?: boolean;
    position: Position;
    startDateTime: Date;
    endDateTime: Date;

    shiftId?: number;
    tenantId?: number;
    employeeId?: number;
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

    tenantId?: number;
    employeeId?: number;
}