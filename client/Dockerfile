# Frontend Dockerfile - Multi-stage build for React app with TailwindCSS
# Stage 1: Build the React application
FROM node:18-alpine as build

# Set working directory inside container
WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the built app with nginx
FROM nginx:alpine

# Copy built React app from build stage to nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the web server
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]