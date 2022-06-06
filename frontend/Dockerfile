FROM node:latest

WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

COPY package.json ./
RUN npm install --silent
RUN npm install react-app-rewired --silent

COPY . ./

CMD ["npm", "start"]
