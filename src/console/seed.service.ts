import { Inject } from '@nestjs/common';
import { Console, Command, createSpinner } from 'nestjs-console';
import { CompaniesService } from 'src/companies/companies.service';
import { EmployeesService } from 'src/employees/employees.service';

@Console()
export class SeedService {
  constructor(
    @Inject(CompaniesService) private companiesService: CompaniesService,
    @Inject(EmployeesService) private employeesService: EmployeesService,
  ) {}

  @Command({
    command: 'seed',
    description: 'Seed DB',
  })
  async seed(): Promise<void> {
    const spin = createSpinner();

    console.log(
      'Entityes before seeding',
      await this.companiesService.findAll(),
      await this.employeesService.findAll(),
    );

    spin.start('Seeding the DB');

    const company = await this.companiesService.create({
      name: 'company',
      created_at: new Date(),
      updated_at: new Date(),
    });

    const employee = await this.employeesService.create({
      name: 'Brian',
      company: company,
      created_at: new Date(),
      updated_at: new Date(),
    });

    spin.succeed('Seed done');

    console.log(
      'Entityes after seeding',
      await this.companiesService.findAll(),
      await this.employeesService.findAll(),
    );

    console.log(await (await this.companiesService.findOne(1)).employees);
  }
}
