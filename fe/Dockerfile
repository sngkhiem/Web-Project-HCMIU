FROM node:18-alpine AS build
WORKDIR /app
# Copy package files first to leverage caching
COPY package.json package-lock.json ./
RUN npm ci
# Copy all source files
COPY . .
# Run the build command; this should generate the 'dist' folder
RUN npm run build
# Optional debug: list contents to verify the output folder exists
RUN ls -la /app

FROM nginx:alpine
# Copy the generated 'dist' folder from the build stage into Nginx
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
