FROM node:18.8.0-alpine

WORKDIR /app

ENTRYPOINT ["scripts/web-docker-entrypoint.sh"]
