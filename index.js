// Constants
const Discord = require("discord.js");
const config = require("./configs/config.json");
const intents = new Discord.Intents(config.intents);
const client = new Discord.Client({ intents });
const mongoose = require("mongoose");

// Logs in
client.login(config.token);

// If an error occurs, re-login
client.on("error", () => { client.login(token) });

// Command and event handlers
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
["command_handler", "event_handler"].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
});

// Mongoose database login
mongoose.connect(config.mongodb_srv, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the MongoDB database.");
});