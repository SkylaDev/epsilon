const config = require("./../configs/config.json");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client, Discord) {

		// Slash commands
        if (interaction.isCommand()) {
			const command = client.commands.get(interaction.commandName);

			if (!command) return

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
    }
};