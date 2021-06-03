FROM node:16
WORKDIR /api
COPY package.json /app
RUN npm install
COPY . /api
CMD ["npm","start"]