import { Entity } from '@loopback/repository';
export declare class OrganizationSetup extends Entity {
    id?: string;
    key: string;
    value: string;
    constructor(data?: Partial<OrganizationSetup>);
}
export interface OrganizationSetupRelations {
}
export declare type OrganizationSetupWithRelations = OrganizationSetup & OrganizationSetupRelations;
