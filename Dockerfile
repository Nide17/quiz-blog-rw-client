FROM node:alpine

ENV PORT 3000

WORKDIR /app

# install dependencies
COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile

# Copy source files
COPY . ./

# Build the app
RUN yarn build

# The port that this container will listen to
EXPOSE 3000

# Running the app
CMD [ "yarn", "start" ]