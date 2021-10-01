const profile_model = require("./../models/profile_schema");

module.exports = {
    name: "guildMemberAdd",
    async execute(member, client, Discord) {

		let profile = await profile_model.create({
			user_id: member.id,
			guild_id: member.guild.id,
			xp: 0,
			level: 0
		});
		profile.save()
    }
};