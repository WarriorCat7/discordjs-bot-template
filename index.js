const Discord = require('discord.js'); // import discord.js library
const client = new Discord.Client(); // import Client

const fs = require('fs'); // import node.js fs library to read command files
client.commands = new Discord.Collection(); // new collection for the commands
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')); // filters all files in the "commands" folder to js files
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const prefix = '-'; // bot prefix

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`); // sends a message to the console when you start the bot
});

client.on('message', messsage => {
	if(!message.content.startsWith(prefix) || message.author.bot) return; // if the message doesn't start with the prefix, or if it is sent by a bot, ignore it

	const args = message.content.slice(prefix.length).split(/ +/); // separates command from arguments
	const command = args.shift().toLowerCase(); // makes commands case insensitive

	if (command === 'test') {
		client.commands.get('test').execute(msg, args); //executes test command from test.js
	}
});

client.login('token'); //logs in with the bot's token
