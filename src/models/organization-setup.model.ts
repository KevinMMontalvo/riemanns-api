import {Entity, model, property} from '@loopback/repository';

@model()
export class OrganizationSetup extends Entity {
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
  key: string;

  @property({
    type: 'string',
    required: true,
  })
  value: string;


  constructor(data?: Partial<OrganizationSetup>) {
    super(data);
  }
}

export interface OrganizationSetupRelations {
  // describe navigational properties here
}

export type OrganizationSetupWithRelations = OrganizationSetup & OrganizationSetupRelations;
