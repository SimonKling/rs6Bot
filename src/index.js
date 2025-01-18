const axios = require('axios');
const cheerio = require('cheerio');
const { Client, IntentsBitField, MessageFlags } = require("discord.js");
require('dotenv').config();

class R6  { 
    constructor(name,win_rate, kd_ratio,kills,deaths,average_kills_per_match,rank){
        this.rank = rank;
      this.name = name;
      this.win_rate = win_rate;
      this.kd_ratio = kd_ratio;
      this.kills = kills;
      this.deaths = deaths; 
      this.average_kills_per_match = average_kills_per_match;
    }

  toString() {
    return `R6 Player: ${this.name}
Rank: ${this.rank}
Win Rate: ${this.win_rate}%
K/D Ratio: ${this.kd_ratio}
Kills: ${this.kills}
Deaths: ${this.deaths}
Average Kills per Match: ${this.average_kills_per_match}`;
  }
}

async function scrapeOverviewCard(name) {
    const url = `https://r6.tracker.network/r6siege/profile/ubi/${name}/overview`
    try {
        const { data: html } = await axios.get(url);

        const $ = cheerio.load(html);

        const playerStats = $('.overview').text().trim().replace(/\s/g, "");

        const playerRanked = $('.season-card').text().trim()
        console.log(playerRanked)
        if (playerStats) {

            const rankedRegex =  /RankedWinRate(\d{1,3}\.\d{1,2}%)(Wins)(\d{1,4})(Losses)(\d{1,4})(Matches)(\d{1,3}(?:,\d{3})?)(KD)(\d{1,2}\.\d{2})(Kills)(\d{1,3}(?:,\d{3})?)(Deaths)(\d{1,3}(?:,\d{3})?)(AvgKills)(\d{1,2}\.\d{2})/;
            const RankRegex =  /Current Season[A-Za-z]+\s*[IVXLCDM]*/

            const match = playerStats.match(rankedRegex);
      
            const rankMatch = playerRanked.match(RankRegex)

            console.log(rankMatch)

            if (match && rankMatch) {

                    const stats = new R6(name,match[1],match[9],match[11],match[13],match[15],rankMatch[0].replace("Current Season",""))
                    return stats.toString()


            } else {
                console.log("No ranked data found in the text content.");
            }
        } else {
            console.log('Element with class "overview v3-card" not found.');
        }
    } catch (error) {
        console.error('Error fetching the website:', error.message);
    }
}




const client = new Client({
    intents: [ IntentsBitField.Flags.Guilds]
})


client.on("ready", () => {
    console.log("Ready")
})

client.on("interactionCreate", async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'track') {

        const name = interaction.options.getString("name")

        scrapeOverviewCard(name).then(x => 
          interaction.reply({ content: x, flags: MessageFlags.Ephemeral })
        )

    
    }
		
});

client.login(process.env.DISCORD_TOKEN)
