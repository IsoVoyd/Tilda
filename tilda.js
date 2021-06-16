const Discord = require("discord.js");
const client = new Discord.Client();

const fs = require("fs");

const basic = require("./commands/basic.js");
const info = require("./commands/info.js");
const coin = require("./commands/coin.js");
const help = require("./commands/help.js");
const roles = require("./commands/roles.js");

client.on("ready", () => {
  console.log(`[${new Date().toLocaleTimeString("en-US")}] Tilda is online`);

  client.guilds.cache
    .get("735395621703385099")
    .roles.cache.get("735395776967999515")
    .setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);

  client.user.setActivity("with ~help");

  coin.sync();
  roles.sync();

  // setInterval(() => {
  //   if (Math.floor(Math.random() * 2) && !coin.coinEvent.isUp)
  //     coin.randomCoinEvent(client);
  // }, 3600000);
});

client.on("guildMemberAdd", (guildMember) => {
  guildMember.roles.add("735395776967999515");
});

client.on("guildBanAdd", (guild, user) => {
  let embed = new Discord.MessageEmbed()
    .setAuthor("Ban", guild.iconURL)
    .setColor(`#ff0000`)
    .setTitle(
      `**${user.username}#${user.discriminator}** has been banned from **${guild.name}**`
    );

  guild.channels.cache
    .get("735395621703385102")
    .send(embed)
    .catch(console.error);
});

let connectionSet = false;
client.on("message", (message) => {
  if (
    message.channel.id == "735404269426966580" &&
    message.author.id != "340002869912666114" &&
    message.author.id != "670849450599645218"
  ) {
    console.log(
      `[DELETED] ${message.author.username}#${message.author.discriminator} => ${message.content}`
    );
    message.delete();
    return;
  }

  if (connectionSet && message.channel.id == "670875790887354372") {
    voice.speak(message);
  }

  let messageContent = message.content.split(" ");
  let command = messageContent[0].toLowerCase();
  let args = messageContent.slice(1).join(" ");

  if (message.author.bot || !command.startsWith("~")) return;

  const COMMANDS = {
    "~suggest": () => basic.request(message),
    "~help": () => help.help(message),
    "~pfp": () => info.pfp(message),
    "~ui": () => info.ui(message),
    "~si": () => info.si(message),
    "~8ball": () => basic.eightBall(message, args),
    "~roll": () => basic.roll(message, args),
    "~leaderboard": () => coin.leaderboard(message),
    "~l": () => COMMANDS["~leaderboard"](),
    "~flip": () => coin.continueUser(message, args, "flip"),
    "~f": () => COMMANDS["~flip"](),
    "~daily": () => coin.continueUser(message, args, "daily"),
    "~balance": () => coin.continueUser(message, args, "balance"),
    "~bal": () => COMMANDS["~balance"](),
    "~give": () => coin.continueUser(message, args, "give"),
    "~print": () => coin.continueUser(message, args, "print"),
    "~beg": () => coin.continueUser(message, args, "beg"),
    "~claim": () => coin.continueUser(message, args, "claim"),
    "~challenge": () => coin.continueUser(message, args, "challenge"),
    "~role": () => roles.role(message, args),
  }

  if (COMMANDS[command]) {
    COMMANDS[command]()
  } else {
    message.reply(`\`${command}\` is not a valid command`)
  }
});

client.login(JSON.parse(fs.readFileSync("./token.json")).token);