import { Edition } from './event';
import { Profile } from './user';

export class Availability {
    id?:string;
    startDate:Date;
    endDate:Date;
    state: string;
    edition: Edition;
    profile: Profile;
}
