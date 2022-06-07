import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://nestjs-starter-production.herokuapp.com/',
    videoUploadOnPasses: false,
  },
});
