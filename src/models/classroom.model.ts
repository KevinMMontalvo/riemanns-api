import {Entity, model, property, hasMany} from '@loopback/repository';
import {Event} from './event.model';
import {File} from './file.model';
import {User} from './user.model';
import {Grade} from './grade.model';

@model()
export class Classroom extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  students?: string[] | User[];

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  files?: string[] | File[];

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  videos?: string[] | File[];

  @property({
    type: 'string',
    required: true,
  })
  teacher: string | User;

  @property({
    type: 'array',
    itemType: Event,
    default: [],
  })
  events?: Event[];

  @property({
    type: 'array',
    itemType: 'any',
    default: [],
  })
  blogs?: any[];

  @property({
    type: 'array',
    itemType: 'any',
    default: [],
  })
  forums?: any[];

  @property({
    type: 'array',
    itemType: 'any',
    default: [],
  })
  quizzes?: any[];

  @property({
    type: 'array',
    itemType: 'any',
    default: [],
  })
  activities?: any[];

  @hasMany(() => Grade)
  grades: Grade[];

  constructor(data?: Partial<Classroom>) {
    super(data);
  }
}

export interface ClassroomRelations {
  // describe navigational properties here
}

export type ClassroomWithRelations = Classroom & ClassroomRelations;
