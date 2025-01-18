  class R6  { 
    constructor(name,win_rate, kd_ratio,kills,deaths,average_kills_per_match){
      this.name = name;
      this.win_rate = win_rate;
      this.kd_ratio = kd_ratio;
      this.kills = kills;
      this.deaths = deaths; 
      this.average_kills_per_match = average_kills_per_match;
    }

  toString() {
    return `R6 Player: ${this.name}
Win Rate: ${this.win_rate}%
K/D Ratio: ${this.kd_ratio}
Kills: ${this.kills}
Deaths: ${this.deaths}
Average Kills per Match: ${this.average_kills_per_match}`;
  }
}