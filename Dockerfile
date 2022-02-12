FROM node:16.14.0-alpine

# Create the bot's directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY . /usr/src/bot

# install dependencies
RUN corepack enable
RUN yarn
RUN yarn install

# Start the bot.
CMD ["yarn", "node", "index.js"]