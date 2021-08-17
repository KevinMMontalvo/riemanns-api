import {Entity, model, property, hasMany} from '@loopback/repository';
import {Grade} from './grade.model';

@model({settings: {hiddenProperties: ["password"]}})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  idCard: string;

  @property({
    type: 'string',
  })
  comment?: string;

  @property({
    type: 'string',
    required: true,
  })
  profile: string;

  @hasMany(() => Grade)
  grades: Grade[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
