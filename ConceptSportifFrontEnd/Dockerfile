# base image
FROM node:18.18

# set working directory
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli@16.2.0
RUN npm i --force
# # Specify environment variables (e.g., backend API URL)
# # ENV BACKEND_API_URL=http://backend:8081

EXPOSE 4200
# start app
CMD ng serve --host 0.0.0.0 
