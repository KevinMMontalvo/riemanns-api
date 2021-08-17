import {Model, model, property} from '@loopback/repository';

@model()
export class Event extends Model {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'date',
    required: true,
  })
  date: Date;

  @property({
    type: 'string',
    required: true,
  })
  name: string;


  constructor(data?: Partial<Event>) {
    super(data);
  }
}

export interface EventRelations {
  // describe navigational properties here
}

export type EventWithRelations = Event & EventRelations;
