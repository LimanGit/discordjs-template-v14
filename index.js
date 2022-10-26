const { Client, Events, Collection, GatewayIntentBits, Partials, Rest, Routes, InteractionType } = require('discord.js');
const token = process.env.token;
const { readdirSync } = require("fs")

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.commands = new Collection()
const rest = new REST({ version: '10' }).setToken(token);
const commands = [];
readdirSync('./commands').forEach(async file => {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
})
client.commands.set(command.data.name, command);
})

client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
        } catch (error) {
            console.error(error);
        }
    console.log(`${client.user.username} has got some error`);
})
client.on(Events.InteractionCreate, async interaction => {
   if (interaction.type == InteractionType.ApplicationCommand) {
   if(interaction.user.bot) return;

	readdirSync('./commands').forEach(file => {
        const command = require(`./commands/${file}`);
        if(interaction.commandName.toLowerCase() === command.data.name.toLowerCase()) {
        command.run(client, interaction)
    }
	})
});
client.login(token);
