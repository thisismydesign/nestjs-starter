import { Injectable, OnModuleInit } from '@nestjs/common';
import Next from 'next';
import NextServer from 'next/dist/next-server/server/next-server';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer;

  async onModuleInit(): Promise<void> {
    try {
      this.server = Next({
        dev: process.env.NODE_ENV !== 'production',
        dir: './src/client',
        // @ts-ignore
        conf: {
          useFileSystemPublicRoutes: false,
        },
      });
      await this.server.prepare();
    } catch (error) {
      console.log(error);
    }
  }

  getNextServer(): NextServer {
    return this.server;
  }
}
