const MessageEmbed = require("discord.js").MessageEmbed;

let ui = (message) => {
  let person = message.mentions.members.first();

  if (person == undefined) {
    let nick = message.member.nickname;
    let role = message.member.roles.hoist;
    let roleColor = message.member.displayHexColor;

    if (roleColor == "#000000") roleColor = "#99aab5";

    let embed = new MessageEmbed()
      .setAuthor("User Info", message.author.avatarURL())
      .setColor(roleColor)
      .setThumbnail(message.author.avatarURL())
      .addField("Username", message.author.username, false);
    if (!(nick == null || nick == message.author.username)) {
      embed.addField("Nickname", nick, false);
    }
    if (message.member.presence.activity != null) {
      embed.addField("Game", message.member.presence.activity.name, false);
    }
    embed.addField("Status", message.member.presence.status, false);
    embed.addField(
      "Joined Date",
      message.member.joinedAt.toLocaleString(),
      false
    );
    embed.addField(
      "Account Creation Date",
      message.author.createdAt.toLocaleString(),
      false
    );
    embed.addField("Highest Role", role, false);

    message.channel.send(embed).catch(console.error);
  } else {
    message.mentions.members.forEach((person) => {
      let nick = person.nickname;
      let role = person.roles.hoist;
      let roleColor = person.displayHexColor;

      if (roleColor == "#000000") roleColor = "#99aab5";

      let embed = new MessageEmbed()
        .setAuthor("User Info", person.user.avatarURL())
        .setColor(roleColor)
        .setThumbnail(person.user.avatarURL())
        .addField("Username", person.user.username, false);
      if (!(nick == null || nick == message.author.username)) {
        embed.addField("Nickname", nick, false);
      }
      if (person.presence.activity != null) {
        embed.addField("Game", person.presence.activity.name, false);
      }
      embed.addField("Status", message.member.presence.status, false);
      embed.addField("Joined Date", person.joinedAt.toLocaleString(), false);
      embed.addField(
        "Account Creation Date",
        person.user.createdAt.toLocaleString(),
        false
      );
      embed.addField("Highest Role", role, false);

      message.channel.send(embed).catch(console.error);
    });
  }
};

let si = (message) => {
  let embed = new MessageEmbed()
    .setAuthor("Server Info", message.author.avatarURL())
    .setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
    .setThumbnail(message.guild.iconURL())
    .addFields([
      { name: "Server Name", value: message.guild.name, inline: false },
      { name: "# of Members", value: message.guild.memberCount, inline: false },
      {
        name: "# of Boosters",
        value: message.guild.premiumSubscriptionCount,
        inline: false,
      },
      {
        name: "Server Creation Date",
        value: message.guild.createdAt.toLocaleString(),
        inline: false,
      },
      { name: "Owner", value: message.guild.owner, inline: false },
    ]);

  message.channel.send(embed).catch(console.error);
};

let pfp = (message) => {
  if (message.mentions.users.first() == undefined) {
    let embed = new MessageEmbed()
      .setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
      .setTitle(`${message.author.username}'s pfp`)
      .setImage(message.author.avatarURL());

    message.channel.send(embed);
  } else {
    message.mentions.users.forEach((user) => {
      let embed = new MessageEmbed()
        .setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
        .setTitle(`${user.username}'s pfp`)
        .setImage(user.displayAvatarURL());

      message.channel.send(embed);
    });
  }
};

module.exports = { ui, si, pfp };
