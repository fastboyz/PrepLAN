import { Edition } from './event';
import { Profile } from './user';

export class Availability {
    id?: string;
    startDate: Date;
    endDate: Date;
    state: string;
}

export class Preference {
    dailyMaxHours: string;
    departments: string[];
}

export class InscriptionEvent {
    id?: string;
    edition: Edition;
    profile: Profile;
    availability: Availability[];
    preference: Preference;
    isApproved: boolean;
}