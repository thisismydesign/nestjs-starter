import { Company } from './company.entity';
import { Resolver, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CompaniesService } from './companies.service';

@Resolver((of) => Company)
export class CompaniesResolver {
  constructor(
    @Inject(CompaniesService) private companiesService: CompaniesService,
  ) {}

  @Query((returns) => [Company])
  async companies(): Promise<Company[]> {
    return await this.companiesService.findAll();
  }
}
