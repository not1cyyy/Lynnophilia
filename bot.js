const Discord = require("discord.js")
const dotenv = require("dotenv")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { Player } = require("discord-player")

dotenv.config()
const TOKEN = process.env.TOKEN

const LOAD_SLASH = process.argv[2] == "deploy"

const CLIENT_ID = "1027188789568868363"
const GUILD_ID = "921070549113905212"

const Logger = require("./modules/Logger");
const Embeds = require("./modules/Embeds");
const Util = require("./modules/Util");

// I'm really really depressed
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_VOICE_STATES"
    ],
    allowedMentions: { parse: ["roles", "users"], repliedUser: false }
});

client.logger = Logger;
client.utils = Util;
client.say = Embeds;

client.slashcommands = new Discord.Collection()
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

let commands = []

const cmds = require('./slash');

for (const slashcmd of cmds) {
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
}

if (LOAD_SLASH) {
    const rest = new REST({ version: "9" }).setToken(TOKEN)
    console.log("Deploying commands...")
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
        .then(() => {
            console.log("Successfully deployed all commands")
        })
        .catch(console.log)
}

client.on("ready", () => {
    console.log(`${client.user.tag} is up and ready`)
})
client.on("interactionCreate", (interaction) => {
    async function handleCommand() {
        if (!interaction.isCommand()) return

        const slashcmd = client.slashcommands.get(interaction.commandName)
        if (!slashcmd) interaction.reply("I don't know this command, sorry...")

        await interaction.deferReply()
        await slashcmd.run({ client, interaction })
    }
    handleCommand()
})
client.login(TOKEN)
