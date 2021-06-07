FROM node:16
WORKDIR /api
COPY package.json /app
RUN npm install
COPY . /api
EXPOSE 3000
CMD ["npm","start"]