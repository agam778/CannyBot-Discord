FROM debian:latest

# Create the bot's directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY . /usr/src/bot

# install dependencies
RUN apt-get update
RUN apt-get install curl -y
RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash - && \
    apt-get update && \
    apt-get install -y nodejs
RUN apt-get install tesseract-ocr -y
RUN corepack enable
RUN yarn
RUN yarn install

# Start the bot.
CMD ["yarn", "node", "index.js"]