import {Entity, model, property} from '@loopback/repository';
import {Option} from './option.model';

@model()
export class Question extends Entity {
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
  text: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  options: Option[];

  @property({
    type: 'string',
    required: true,
  })
  testId: string;


  constructor(data?: Partial<Question>) {
    super(data);
  }
}

export interface QuestionRelations {
  // describe navigational properties here
}

export type QuestionWithRelations = Question & QuestionRelations;
