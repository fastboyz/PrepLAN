export class Event {
  id?: string;
  title: string;
  description: string;
}

export class Edition {
  id?: string;
  name?: string;
  startDate?: Date;
  endDate?: Date;
  event?: Event;
  isActive: boolean;
  isRegistering: boolean;
  location: string;
  tenantId?: number;
}

export class Position {
  id?: string;
  title: string;
  description: string;
  edition: Edition;

  skillId?: number;
  spotId?: number;
}
