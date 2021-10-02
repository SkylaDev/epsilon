// Run "node deploy-commands-global.js" to deploy commands

const fs = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { epsilon_modules } = require('./configs/epsilon_modules.json');
const config = require('./configs/config.json');
const { client_id } = require('./configs/client_guild_ids.json');

var commands = [];
var command_files = [];

epsilon_modules.forEach(epsilon_module => {
	const new_command_files = fs.readdirSync(`./epsilon_modules/${epsilon_module}/commands/`).filter(file => file.endsWith(".js"));
	command_files = command_files.concat(fs.readdirSync(`./epsilon_modules/${epsilon_module}/commands/`).filter(file => file.endsWith(".js")));
	
	// For each command file 
	for (const file of new_command_files) {
		const command = require(`./epsilon_modules/${epsilon_module}/commands/${file}`);
		commands.push(command.data.toJSON());
	}
});

const rest = new REST({ version: '9' }).setToken(config.token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(client_id),
			{ body: commands },
		)

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error)
	}
})();
