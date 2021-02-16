import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/companies/company.entity';

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

  findAll() {
    return this.companiesRepository.find();
  }
}
