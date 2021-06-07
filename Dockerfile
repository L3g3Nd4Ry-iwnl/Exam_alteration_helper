FROM node:16
WORKDIR /api
COPY package.json /api
RUN npm install
COPY . /api
CMD ["npm","start"]
EXPOSE 3000
EXPOSE 3306