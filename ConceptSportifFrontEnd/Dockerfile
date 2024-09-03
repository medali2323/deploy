# base image
FROM node:20
# # set working directory
WORKDIR /app
COPY . .

RUN npm i --force
RUN npm install -g @angular/cli@18.2.1

EXPOSE 4200

# start app
CMD ng serve --host 0.0.0.0