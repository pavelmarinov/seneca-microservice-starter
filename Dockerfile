FROM node:carbon

WORKDIR /seneca-microservice-starter

RUN npm install -g nodemon

COPY package.json /seneca-microservice-starter/package.json
RUN rm -rf node_modules && npm install && npm ls
RUN mv /seneca-microservice-starter/node_modules /node_modules

COPY . /seneca-microservice-starter

CMD ["npm", "start"]