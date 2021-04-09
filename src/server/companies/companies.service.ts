import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Company } from 'src/server/companies/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  create(company: Company) {
    return this.companiesRepository.save(company);
  }

  findOne(id: number) {
    return this.companiesRepository.findOne(id);
  }

  findAll(params: FindManyOptions<Company> = {}) {
    return this.companiesRepository.find(params);
  }
}
