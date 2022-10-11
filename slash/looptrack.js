const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueueRepeatMode } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder().setName("looptrack").setDescription("loops over the currently playing track)"),

    run: async ({ client, interaction }) => {

        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing)
            return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

        if (!client.utils.modifyQueue(interaction)) return;

        queue.setRepeatMode(QueueRepeatMode.TRACK);

        const embed = client.say.baseEmbed(interaction)
            .setDescription(`Repeating track activated`)
            .setFooter(`Made with <3 by not1cyyy`);
        return interaction.editReply({ ephemeral: true, embeds: [embed] }).catch(console.error);
    }
};