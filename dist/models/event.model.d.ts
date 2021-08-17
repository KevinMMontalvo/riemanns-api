import { Model } from '@loopback/repository';
export declare class Event extends Model {
    id: string;
    date: Date;
    name: string;
    constructor(data?: Partial<Event>);
}
export interface EventRelations {
}
export declare type EventWithRelations = Event & EventRelations;
