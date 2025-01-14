import path = require('path')
import fs = require('fs')
import { Message, Client, Intents} from 'discord.js'
import { Daruma, Moods } from './daruma'

const HELPMESSAGE = `\`\`\`Thank you for using DarumaBot!

Commands must begin with -d.  Extra spaces will be removed.
Valid commands are:
\tpose
\tsay
\temote

Options may be set with flags between -d and the command.
Valid options are:
\t-mood
\t\t:happy
\t\t:sad
\t\t:neutral
\t\t:angry
\t\t:tired
\t-color
    -rgb(0, 255, 255)
    -#00F
    -#0000FF

Example: -d -m:h -c:#F00 say Happy hello!\`\`\``

const botToken: string = fs.readFileSync(path.join(__dirname, '..', "bot-token"), "utf8");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("messageCreate", (message: Message) => {
    let command = message.content.trim().toLowerCase().replace(/\s+/, ' ').split(" ")
    if(command[0] !== '-d') return
    let seeds = {
        red: Math.floor(parseInt(message.author.id.substring(0, 6)) % 255),
        green: Math.floor(parseInt(message.author.id.substring(6, 12)) % 255),
        blue: Math.floor(parseInt(message.author.id.substring(12, 18)) % 255),
    }
    let colorString = `rgb(${seeds.red},${seeds.green},${seeds.blue})`
    let daruma = new Daruma()
    daruma.setColor(colorString)
    let tags = []
    for(let ind = 1; ind < command.length; ind++){
        if(command[ind]?.startsWith('-')) tags.push(command[ind])
        else break
    }
    for(let tag of tags){
        let tagSplit = tag.split(':')
        if('-mood'.startsWith(tagSplit[0])){
            if(!(tagSplit[1]?.length > 0)) break
            if('happy'.startsWith(tagSplit[1])) daruma.setMood(Moods.HAPPY)
            if('neutral'.startsWith(tagSplit[1])) daruma.setMood(Moods.NEUTRAL)
            if('sad'.startsWith(tagSplit[1])) daruma.setMood(Moods.SAD)
            if('angry'.startsWith(tagSplit[1])) daruma.setMood(Moods.ANGRY)
            if('tired'.startsWith(tagSplit[1])) daruma.setMood(Moods.TIRED)
        }
        if('-color'.startsWith(tagSplit[0])){
            if(!(tagSplit[1]?.length > 0)) break
            daruma.setColor(tagSplit[1])
        }
    }
    let primaryCommand = tags.length >= command.length ? '' : command[tags.length+1]
    if(!primaryCommand){
        message.reply(`Invalid command received: ${primaryCommand}`)
        return
    }
    let commandInput = message.content.substring(message.content.toLowerCase().indexOf(primaryCommand)+primaryCommand.length, message.content.length)
    if('pose'.startsWith(primaryCommand)){
        message.reply({
            files: [
                {
                    attachment: daruma.getPose(),
                    name: `d-pose-${message.author.id}.png`
                }
            ]
          }
        )
        return
    }
    if('emote'.startsWith(primaryCommand)){
        message.reply({
            files: [
                {
                    attachment: daruma.getEmote(),
                    name: `d-emote-${message.author.id}.gif`
                }
            ]
          }
        )
        return
    }
    if('say'.startsWith(primaryCommand)){
        message.reply({
            files: [
                {
                    attachment: daruma.getSpeech(),
                    name: `d-emote-${message.author.id}.gif`
                }
            ],
            content: commandInput
          }
        )
        return
    }
    if('help'.startsWith(primaryCommand)){
        message.reply(HELPMESSAGE)
        return
    }
    message.reply(`Invalid command received: ${primaryCommand}`)
});
client.login(botToken)
