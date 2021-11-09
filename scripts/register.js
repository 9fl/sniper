const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const { token, application_id } = require("../config.json");

const guild = process.argv[2];

const commands = [
	{
		name: "snipe",
		description: "Muestra el ultimo mensaje borrado de un canal en especifico",
		options: [
			{
				type: 7, // canal de texto
				name: "channel",
				description: "El canal para mostrar donde se borro el mensaje",
			},
		],
	},
	{
		name: "editsnipe",
		description: "Muestra el ultimo mensaje editado en algun canal en especifico",
		options: [
			{
				type: 7, // canal de texto
				name: "channel",
				description: "El canal para mostrar donde se edito el mensaje",
			},
		],
	},
	{
		name: "reactionsnipe",
		description:
			"Muestra la ultima reaccion removida de algun canal en especifico",
		options: [
			{
				type: 7, // text channel
				name: "channel",
				description: "El canal para mostrar donde se removio la reaccion",
			},
		],
	},
];

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
	try {
		console.log("[sniper] :: Reiniciado los comandos (/) de el bot...");
		console.log("[sniper] :: Porfavor, espera...")

		await rest.put(
			guild
				? Routes.applicationGuildCommands(application_id, guild)
				: Routes.applicationCommands(application_id),
			{
				body: commands,
			}
		);

		console.log(
			"[sniper] :: Comandos (/) reiniciados correctamente..."
		);
	} catch (error) {
		console.error(error);
	}
})();
