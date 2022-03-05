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

### Quick Deploy
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?code=Imo6qY&referralCode=agam778)

### Manual Deploy
Install Dependencies: Run `yarn; yarn install`<br>
Run the Bot: Run `yarn start`

# License

CannyBot is licensed under the GPL 3.0 license. See the [`LICENSE`](./LICENSE) file for more information.
If you are using the customized version of this bot/using any command in the bot for your own purposes, I would be grateful to have credits in any form.
