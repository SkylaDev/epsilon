const fs = require("fs");
const { epsilon_modules } = require("./../configs/epsilon_modules.json");

var command_files = [];

module.exports = (client, Discord) =>{

    epsilon_modules.forEach(epsilon_module => {
        const new_command_files = fs.readdirSync(`./epsilon_modules/${epsilon_module}/commands/`).filter(file => file.endsWith(".js"));
        command_files = command_files.concat(fs.readdirSync(`./epsilon_modules/${epsilon_module}/commands/`).filter(file => file.endsWith(".js")));
        for(const file of new_command_files){
    
            // Sets the command file
            const command = require(`../epsilon_modules/${epsilon_module}/commands/${file}`);
    
            // Sets a new item in the collection
            client.commands.set(command.data.name, command);
        }
    })
};