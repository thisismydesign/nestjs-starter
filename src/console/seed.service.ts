import { Inject } from '@nestjs/common';
import { Console, Command, createSpinner } from 'nestjs-console';
import * as Papa from 'papaparse';
import { CompaniesService } from 'src/companies/companies.service';
import { EmployeesService } from 'src/employees/employees.service';
import * as fs from 'fs';
import * as path from 'path';

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

    spin.start('Seeding the DB');

    const employeesData = fs.readFileSync(
      path.join(__dirname, '..', '..', 'data-employees.csv'),
      'utf8',
    );
    console.log(employeesData);

    const parsedEmployeesData = Papa.parse(employeesData, { header: true });
    // wait for all by promise.all & map
    await parsedEmployeesData.data.forEach(async (employeeData) => {
      console.log(employeeData);
      // Find by ID or create
      // ID is not used correctly atm
      await this.companiesService.create({
        id: employeeData['Company ID'],
        name: employeeData['Company Title'],
        created_at: new Date(),
        updated_at: new Date(),
      });
    });

    spin.succeed('Seeding done');

    console.log(
      'Entityes after seeding',
      await this.companiesService.findAll(),
      await this.employeesService.findAll(),
    );
  }
}
