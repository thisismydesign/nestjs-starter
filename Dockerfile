FROM node:18.10.0-alpine

WORKDIR /app

ENTRYPOINT ["scripts/web-docker-entrypoint.sh"]
