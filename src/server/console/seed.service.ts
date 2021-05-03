import { Console, Command, createSpinner } from 'nestjs-console';

@Console()
export class SeedService {
  @Command({
    command: 'seed',
    description: 'Seed DB',
  })
  async seed(): Promise<void> {
    const spin = createSpinner();

    spin.start('Seeding the DB');

    spin.succeed('Seeding done');
  }
}
