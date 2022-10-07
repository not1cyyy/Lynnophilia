const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("quit").setDescription("Disconnects the bot and stops the music"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Queue is empty, try `/play` to add songs")

		queue.destroy()
		await interaction.editReply("Take care everyone <33!")
	},
}
