const config = require("./../configs/config.json");
const profile_model = require("./../models/profile_schema");
const guild_model = require("./../models/guild_schema");
const { MessageFlags } = require("discord.js");

module.exports = {
    name: "messageCreate",
    async execute(message, client, Discord) {

		// Sets Epsilon profile data
        let profile_data
        try{

			// Gets the profile data
            if(message.member) {
                profile_data = await profile_model.findOne({ user_id: message.member.id });

                // If the user has no Epsilon Profile
                if(!profile_data) {
                    let profile = await profile_model.create({
                        user_id: message.author.id,
                        currency: 0
                    });
                }
            }
		}catch(err){
            console.log(err);
        }

        // Sets Epsilon guild data
        let guild_data
        try{

			// Gets the guild data
            if(message.guild) {
                guild_data = await guild_model.findOne({ guild_id: message.guild.id });

                // If the guild is not in the guild database
                if(!guild_data) {
                    let guild = await guild_model.create({
                        guild_id: message.guild.id,
                        currency_name: "EP"
                    });
                }
            }
		}catch(err){
            console.log(err)
        }

		// Give 5 currency for each comment
		const currency_to_give = 5
		const response = await profile_model.findOneAndUpdate({
			user_id: message.author.id,
		},
		{
			$inc: {
				currency: currency_to_give
			}
		})
    }
};