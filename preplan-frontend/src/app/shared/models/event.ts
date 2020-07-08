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
    event: Event;
}