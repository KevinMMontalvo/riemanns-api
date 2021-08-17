import {Entity, model, property} from '@loopback/repository';

@model()
export class Grade extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  grade: number[];

  @property({
    type: 'string',
  })
  userId?: string;

  @property({
    type: 'string',
  })
  classroomId?: string;

  constructor(data?: Partial<Grade>) {
    super(data);
  }
}

export interface GradeRelations {
  // describe navigational properties here
}

export type GradeWithRelations = Grade & GradeRelations;
