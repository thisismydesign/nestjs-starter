import { Inject } from '@nestjs/common';
import { Console, Command, createSpinner } from 'nestjs-console';
import { CompaniesService } from 'src/companies/companies.service';

@Console()
export class SeedService {
  constructor(
    @Inject(CompaniesService) private companiesService: CompaniesService,
  ) {}

  @Command({
    command: 'seed',
    description: 'Seed DB',
  })
  async seed(): Promise<void> {
    const spin = createSpinner();

    console.log(
      'Companies after seeding',
      await this.companiesService.findAll(),
    );

    spin.start('Seeding the DB');

    await this.companiesService.create({
      name: 'company',
      created_at: new Date(),
      updated_at: new Date(),
    });

    spin.succeed('Seed done');

    console.log(
      'Companies after seeding',
      await this.companiesService.findAll(),
    );
  }
}
