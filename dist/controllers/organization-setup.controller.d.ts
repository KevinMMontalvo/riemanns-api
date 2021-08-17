import { Filter, FilterExcludingWhere } from '@loopback/repository';
import { OrganizationSetup } from '../models';
import { OrganizationSetupRepository } from '../repositories';
export declare class OrganizationSetupController {
    organizationSetupRepository: OrganizationSetupRepository;
    constructor(organizationSetupRepository: OrganizationSetupRepository);
    find(filter?: Filter<OrganizationSetup>): Promise<OrganizationSetup[]>;
    findById(id: string, filter?: FilterExcludingWhere<OrganizationSetup>): Promise<OrganizationSetup>;
}
