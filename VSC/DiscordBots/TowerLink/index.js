const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

const token = "censored for github :)";
const allowedRoles = {
    'saymessage': ['1200976180405346425', '1200976487805882449', "1200977060194160811"], // Allow Role1 and Role2 to use 'saymessage'
    'senddm': ['1200976180405346425', '1200976487805882449', "1200977060194160811"] // Allow Role3 to use 'senddm'
};

const commands = [
    {
        name: 'hello',
        description: 'Say hello to the bot',
        enabled: false // Enabled by default
    },
    {
        name: 'saymessage',
        description: 'Send a message to the current channel',
        options: [
            {
                name: 'message',
                description: 'The message to send',
                type: 3, // STRING
                required: true
            }
        ],
        enabled: true // Enabled by default
    },
    {
        name: 'senddm',
        description: 'Send a direct message to a user',
        options: [
            {
                name: 'targetuser',
                description: 'The user to send the message to',
                type: 6, // USER
                required: true
            },
            {
                name: 'message',
                description: 'The message to send',
                type: 3, // STRING
                required: true
            }
        ],
        enabled: true // Enabled by default
    }
].filter(command => command.enabled); // Filter out disabled commands

client.on('ready', async () => {
    console.log(`Client has been initiated! ${client.user.username}`);

    try {
        console.log('Started refreshing application (/) commands.');

        const rest = new REST({ version: '9' }).setToken(token);

        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );

        console.log('Successfully registered application (/) commands globally.');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
});

client.on('interactionCreate', async interaction => {
    console.log('Interaction created:', interaction);

    if (!interaction.isCommand()) return;

    const { commandName, options, member } = interaction;

    // Check if the command has role restrictions
    if (commandName in allowedRoles) {
        const allowedRoleIds = allowedRoles[commandName];
        // Check if the user has any of the allowed roles
        const hasAllowedRole = member.roles.cache.some(role => allowedRoleIds.includes(role.id));
        if (!hasAllowedRole) {
            await interaction.reply({content: 'You do not have permission to use this command.', ephemeral: true});
            return;
        }
    }

    // Check if the command is enabled
    const command = commands.find(cmd => cmd.name === commandName);
    if (command && !command.enabled) {
        await interaction.reply({content: 'This command is currently disabled.', ephemeral: true});
        return;
    }

    if (commandName === 'hello') {
        await interaction.reply('Hello, how are you?');
    } else if (commandName === 'saymessage') {
        const messageContent = options.getString('message');
        if (!messageContent) {
            await interaction.reply('Message content must be a non-empty string.');
            return;
        }
        // Reply to the executor with a confirmation message
        await interaction.reply({ content: 'Message sent!', ephemeral: true });
        // Send the message to the channel
        await interaction.channel.send(messageContent);
    } else if (commandName === 'senddm') {
        const targetUser = options.getUser('targetuser');
        const message = options.getString('message');
        
        try {
            const user = await client.users.fetch(targetUser);
            // Send the message to the user via DM
            await user.send(message);
            // Send a confirmation message to the executor
            await interaction.reply({ content: `Message sent to ${user.tag}`, ephemeral: true });
        } catch (error) {
            console.error('Error sending DM:', error);
            if (error.code === 50007) {
                await interaction.reply({ content: 'Failed to send message. This user has blocked DMs from this server.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Failed to send message. Please try again later.', ephemeral: true });
            }
        }
    }    
});

client.login(token)
  .catch(console.error);
