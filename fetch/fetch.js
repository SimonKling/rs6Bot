const axios = require('axios');
const cheerio = require('cheerio');

export async function scrapeOverviewCard(name) {
    const url = `https://r6.tracker.network/r6siege/profile/ubi/${name}/overview`
    try {
        const { data: html } = await axios.get(url);

        const $ = cheerio.load(html);

        const textContent = $('.overview').text().trim().replace(/\s/g, "");

        if (textContent) {

            const rankedRegex =  /RankedWinRate(\d{1,3}\.\d{1,2}%)(Wins)(\d{1,4})(Losses)(\d{1,4})(Matches)(\d{1,3}(?:,\d{3})?)(KD)(\d{1,2}\.\d{2})(Kills)(\d{1,3}(?:,\d{3})?)(Deaths)(\d{1,3}(?:,\d{3})?)(AvgKills)(\d{1,2}\.\d{2})/;

            const match = textContent.match(rankedRegex);
            console.log(match)

            if (match) {
                return  {
                    name: name,
                    winrate: match[1],
                    wins: match[2],
                    losses: match[4],
                    matches: match[7],
                    kd: match[9],
                    kills: match[11],
                    deaths: match[13],
                    avgKills: match[15],
                };


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