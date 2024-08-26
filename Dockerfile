FROM node:20.17.0-alpine as preview
COPY dist/ /app/dist/
COPY server/ /app/server/

WORKDIR /app
ENTRYPOINT exec node server/src/server.js -P 8080 ${CMD_PARAMS}
EXPOSE 8080
