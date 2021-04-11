import { BootstrapConsole } from 'nestjs-console';
import { AppModule } from 'src/server/app/app.module';

const bootstrap = new BootstrapConsole({
  module: AppModule,
  useDecorators: true,
});
bootstrap.init().then(async (app) => {
  try {
    // init your app
    await app.init();
    // boot the cli
    await bootstrap.boot();

    // Use app.close() instead of process.exit() because app.close() will
    // trigger onModuleDestroy, beforeApplicationShutdown and onApplicationShutdown.
    // For example, in your command doing the database operation and need to close
    // when error or finish.
    app.close();

    process.exit(0);
  } catch (e) {
    app.close();

    process.exit(1);
  }
});
