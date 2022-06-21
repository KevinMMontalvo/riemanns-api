import {Entity, model, property, hasMany} from '@loopback/repository';
import {Question} from './question.model';

@model()
export class Test extends Entity {
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
    type: 'number',
    required: true,
  })
  time: number;

  @property({
    type: 'string',
  })
  classroomId?: string;

  @hasMany(() => Question)
  questions: Question[];

  constructor(data?: Partial<Test>) {
    super(data);
  }
}

export interface TestRelations {
  // describe navigational properties here
}

export type TestWithRelations = Test & TestRelations;
