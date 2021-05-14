FROM node:14.16.1-alpine

COPY package*.json /app/react-todolist/react-todolist/
WORKDIR /app/react-todolist/react-todolist/

RUN npm install && npm audit fix

COPY . /app/react-todolist/react-todolist/

EXPOSE 3000
