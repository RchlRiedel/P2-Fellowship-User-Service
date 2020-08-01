FROM node:12.18
COPY build user-backend/build/
COPY node_modules user-backend/node_modules/
COPY gifted-pulsar-279818-7f17e43c7942.json user-backend/
CMD npm run deploy --prefix user-backend/build