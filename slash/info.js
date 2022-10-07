const { SlashCommandBuilder } = require("@discordjs/builders")
const config = require("../config.json");
const { version: djsVersion, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("info").setDescription("Shows info about the bot"),
  run: async ({ client, interaction }) => {
    const util = client.utils;
    const uptime = util.formatDuration(client.uptime);
    const createdAt = `<t:${client.user.createdTimestamp}:R>`
    const users = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

    const embed = client.say.baseEmbed(interaction)
      .setAuthor(`${client.user.username}’s Information`, client.user.displayAvatarURL())
      .addField("General Info",
        `**Bot Id:** ${client.user.id}
        **Bot Tag:** ${client.user.tag}
        **Created At :** ${createdAt}
        **Developer:** [ICY#7784](https:\/\/github.com\/not1cyyy)
        **Github Repo:** __[not1cyyy/Lynnophilia](https:\/\/github.com\/not1cyyy/Lynnophilia)__
        **Prefix:** \/`
      )
      .addField("client Stats",
        `**Users:** ${util.formatNumber(users)}
        **Servers:** ${util.formatNumber(client.guilds.cache.size)}
        **Channels:** ${util.formatNumber(client.channels.cache.size)}`
      )
      .addField("System Info",
        `**RAM Usage:**  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
        **client Uptime:** ${uptime}
        **Node Version:** ${process.version}
        **Platform:** ${util.toCapitalize(process.platform)}`
      );

    const button1 = new MessageButton()
      .setLabel("Support")
      .setStyle("LINK")
      .setURL(`${config.supportServer}`);

    const button2 = new MessageButton()
      .setLabel("Invite")
      .setStyle("LINK")
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`);

    const row = new MessageActionRow().addComponents([button1, button2]);


    return interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
  }
};