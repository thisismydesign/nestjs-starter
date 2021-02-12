import { Injectable } from '@nestjs/common';
import { Company } from 'src/companies/interfaces/company.interface';

@Injectable()
export class CompaniesService {
  private readonly companies: Company[] = [];

  create(company: Company) {
    this.companies.push(company);
  }

  findAll(): Company[] {
    return this.companies;
  }
}
