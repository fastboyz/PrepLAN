import { Edition } from './event';
import { Profile } from './user';

export class Availability {
    id?: string;
    startDate: Date;
    endDate: Date;
    state: string;
}

export class Preference {
    id?: string;
    dailyMaxHours: string;
    departments: string[];
}

export class InscriptionEvent {
    id?: string;
    edition: Edition;
    profile: Profile;
    availabilities: Availability[];
    preference: Preference;
    status: string;
    inscriptionDate: Date;
}
