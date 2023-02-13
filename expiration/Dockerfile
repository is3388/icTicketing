# use RUN install --omit=dev if using mongodb-memory-server@8 not 6
FROM node:16-alpine
WORKDIR /app
COPY ./package.json .
RUN npm install  --only=prod
COPY ./ ./
CMD ["npm", "start"]


