FROM node:14-alpine

WORKDIR /app

ENTRYPOINT ["scripts/web-docker-entrypoint.sh"]
