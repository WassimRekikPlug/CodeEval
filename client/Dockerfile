# Use the official Node.js image with Node.js 14
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Use Nginx as the base image for serving the production build
FROM nginx:1.21.1-alpine

# Copy the build files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port your app will run on
EXPOSE 80

# Default command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
