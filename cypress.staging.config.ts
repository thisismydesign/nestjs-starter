import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://nestjs-starter-staging.herokuapp.com/',
    videoUploadOnPasses: false,
  },
});
