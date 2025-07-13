import { Client, Events, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessageReactions,
        ]});

client.on(Events.ClientReady, clientReady => {
    console.log(`Ready! Logged in as ${clientReady.user.username}`);
})

fs.readdirSync("./src/events").forEach(file => {
    let fileNameWithOutTag = file.replace(".ts", "");
    require(`./events/${fileNameWithOutTag}`)
    console.log("loaded event:", fileNameWithOutTag);
});

const connectClient = () => {
    client.login(process.env.DISCORD_BOT_TOKEN);
}

export {
    connectClient,
    client
}