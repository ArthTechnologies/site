FROM node:18

# Create app directory
WORKDIR /usr/src/site

# Copy package files
COPY package*.json ./

# Install packages
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3301

# Build the app
CMD ["CI=", "npm", "run", "build" ]

# Run the app
CMD [ "node", "build" ]