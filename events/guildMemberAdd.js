const profile_model = require("./../models/profile_schema");

module.exports = {
    name: "guildMemberAdd",
    async execute(member, client, Discord) {

		let profile = await profile_model.create({
			user_id: member.id,
			currency: 0
		});
		profile.save()
    }
};
