FROM node:16
WORKDIR /api
COPY package.json /api
RUN npm install
RUN npm uninstall bcrypt
RUN npm i bcrypt
COPY . /api
CMD ["npm","start"]
EXPOSE 3000