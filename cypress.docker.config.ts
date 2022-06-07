import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://host.docker.internal:3000/',
    videoUploadOnPasses: false,
  },
});
