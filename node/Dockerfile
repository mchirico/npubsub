FROM node AS build
RUN mkdir /workspace
WORKDIR /workspace
COPY . /workspace
COPY ./credentials/pubsub.json  /pubsub.json 
RUN npm install
RUN npm test
RUN npm run build

# Python is not included in alpine, 
# which is needed to build bcrypt

FROM node:current-alpine
COPY --from=build /workspace /workspace
COPY --from=build /pubsub.json /pubsub.json 
ENV GOOGLE_APPLICATION_CREDENTIALS = '/pubsub.json'
WORKDIR /workspace
RUN npm rebuild grpc
ENTRYPOINT ["node"]
CMD ["build/index.js"]
