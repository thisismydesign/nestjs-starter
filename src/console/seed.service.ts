// service.ts - a nestjs provider using console decorators
import { Console, Command, createSpinner } from 'nestjs-console';
import { CompaniesService } from 'src/companies/companies.service';

@Console()
export class SeedService {
  @Command({
    command: 'seed',
    description: 'Seed DB',
  })
  async seed(): Promise<void> {
    const spin = createSpinner();
    spin.start('Seeding the DB');

    const companiesService = new CompaniesService();

    companiesService.create({
      id: '1',
      name: 'company',
      created_at: new Date(),
      updated_at: new Date(),
    });

    spin.succeed('Seed done');
  }
}
