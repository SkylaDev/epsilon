const fs = require("fs");
const event_files = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

module.exports = (client, Discord) => {

    for (const file of event_files) {
        const event = require(`../events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client, Discord));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client, Discord));
        }
    }
};