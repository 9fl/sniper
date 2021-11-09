const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	],
	partials: ["MESSAGE", "REACTION", "USER"],
});
const { token } = require("../config.json");

const snipes = {};
const editSnipes = {};
const reactionSnipes = {};

const formatEmoji = (emoji) => {
	return !emoji.id || emoji.available
		? emoji.toString() // el bot no puede usar unicode
		: `[:${emoji.name}:](${emoji.url})`; // bot no puede usar emoji
};

client.on("ready", () => {
	console.log(`[sniper] :: Sesion iniciada como ${client.user.tag}.`);
});

client.on("messageDelete", async (message) => {
	if (message.partial || (message.embeds.length && !message.content)) return; // si el contenido esta vacio

	snipes[message.channel.id] = {
		author: message.author,
		content: message.content,
		createdAt: message.createdTimestamp,
		image: message.attachments.first()
			? message.attachments.first().proxyURL
			: null,
	};
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
	if (oldMessage.partial) return; // si no hay contenido

	editSnipes[oldMessage.channel.id] = {
		author: oldMessage.author,
		content: oldMessage.content,
		createdAt: newMessage.editedTimestamp,
	};
});

client.on("messageReactionRemove", async (reaction, user) => {
	if (reaction.partial) reaction = await reaction.fetch();

	reactionSnipes[reaction.message.channel.id] = {
		user: user,
		emoji: reaction.emoji,
		messageURL: reaction.message.url,
		createdAt: Date.now(),
	};
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const channel =
		interaction.options.getChannel("channel") || interaction.channel;

	if (interaction.commandName === "snipe") {
		const snipe = snipes[channel.id];

		if (!snipe) return interaction.reply("Nada para mostrar!");

		const embed = new MessageEmbed()
			.setAuthor(snipe.author.tag)
			.setFooter(`#${channel.name}`)
			.setTimestamp(snipe.createdAt);
		snipe.content ? embed.setDescription(snipe.content) : null;
		snipe.image ? embed.setImage(snipe.image) : null;

		await interaction.reply({ embeds: [embed] });
	} else if (interaction.commandName === "editsnipe") {
		const snipe = editSnipes[channel.id];

		await interaction.reply(
			snipe
				? {
						embeds: [
							new MessageEmbed()
								.setDescription(snipe.content)
								.setAuthor(snipe.author.tag)
								.setFooter(`#${channel.name}`)
								.setTimestamp(snipe.createdAt),
						],
				  }
				: "Nada para mostrar!"
		);
	} else if (interaction.commandName === "reactionsnipe") {
		const snipe = reactionSnipes[channel.id];

		await interaction.reply(
			snipe
				? {
						embeds: [
							new MessageEmbed()
								.setDescription(
									`reacciono con ${formatEmoji(
										snipe.emoji
									)} en [este mensaje](${snipe.messageURL})`
								)
								.setAuthor(snipe.user.tag)
								.setFooter(`#${channel.name}`)
								.setTimestamp(snipe.createdAt),
						],
				  }
				: "Nada para mostrar"
		);
	}
});

client.login(token);
