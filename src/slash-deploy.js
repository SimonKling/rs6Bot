const { REST, Routes, SlashCommandBuilder} = require("discord.js")


const botID = process.env.BOT_ID
const serverID = process.env.SERVER_ID
const botToken = process.env.DISCORD_TOKEN


const rest = new REST({ version: '9' }).setToken(botToken)

const slashRegister = async () => {
    try {
        await rest.put(Routes.applicationGuildCommands(botID,serverID),{
            body:[
               new SlashCommandBuilder().setName("track").setDescription("A command to unveil RS6 stats according to input").addStringOption((option) => { 
                return option.setName("name").setDescription("Name of the R6 Player").setRequired(true)
               })
            ]
        })
        console.log('Successfully registered the /ping command globally!');
    }catch(error){
        console.log(error)
    }

}

slashRegister()