# # base image
# FROM node:20
# # # set working directory
# WORKDIR /app
# COPY . .

# RUN npm i --force
# RUN npm install -g @angular/cli@18.2.1

# EXPOSE 4200

# # start app
# CMD ng serve --host 0.0.0.0

# Base image
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --force
RUN npm install -g @angular/cli@18.2.1

# Copy the rest of the application code
COPY . .

# Build the Angular app for production
RUN ng build 
# Use nginx:alpine image to serve the app
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
# Copy the built Angular app to the nginx html directory
COPY --from=builder /app/dist/ConceptSportifFrontEnd /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80
EXPOSE 443


