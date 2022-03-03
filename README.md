# CannyBot

CannyBot is an Open Source Discord bot written in [Discord.js](https://discord.js.org/).

# Features

- Customizable Prefix
- Slash Commands Support
- MongoDB as Database
- Discord Activities Support
- And Much More!

# Invite

If you don't want to customize the bot and deploy it yourself, you can invite the bot which is always online here:

<a href="https://discord.com/api/oauth2/authorize?client_id=869085787310932060&permissions=1257889000519&scope=applications.commands%20bot" rel="Image">![Invite now](invitenow.png)</a> <a href="https://discord.gg/c8aAV4cARB" rel="Image">![Join Support](joinsupport.png)</a>

# Customize and Deploy

## Customize the bot:

- Env Vars: Rename `.env.sample` to `.env` and fill accordingly/add environment variables wherever you are hosting your bot.
- Bot's settings: Change the bot's settings in [`config.json`](./botconfig/config.json), [`embed.json`](./botconfig/embed.json) and [`settings.json`](./botconfig/settings.json) accordingly.
- Bot's Status: Change the bot's status in [`functions.js`](./handlers/functions.js#L940)
- Package.json File: Customize the [`package.json`](package.json) file accordingly
- Other Things: Change whatever you want, as this is an open source bot 😂

## Deploy It Online:

VPS: To run the bot, run `yarn; yarn install` and then `yarn node index.js`

Online Hosting Services:
Here are some hosting services I would recommend to use:

- [Railway.app](https://railway.app) - A free hosting which offers 24/7 uptime, fast network speeds, and more!
- [Heroku](https://heroku.com) - Also a free hosting but with only 550 hours per month without a cc, and bot will sleep after some time of inactivity.
- [Koyeb](https://koyeb.com) - A free hosting service with 24/7 uptime, and kinda same like Railway.app

# License

CannyBot is licensed under the GPL 3.0 license. See the [`LICENSE`](./LICENSE) file for more information.
If you are using the customized version of this bot/using any command in the bot for your own purposes, I would be grateful to have credits in any form.
