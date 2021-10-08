/* @task 
given a html file do some dom operation on it 

terminal
----------
node .\ParseHtml.js --path=download.html
*/

let minimist = require("minimist");
let jsdom = require("jsdom");
let fs = require("fs");

let input = minimist(process.argv);
let filepath = input.path;

// open file read data and pass it to jsdom
let worldCup = [];

fs.readFile(filepath, "utf-8", function (err, html) {
  let dom = new jsdom.JSDOM(html);
  let document = dom.window.document;
  const matches = document.querySelectorAll("div.match-info-FIXTURES");
  console.log(matches.length);

  for (let i = 0; i < matches.length; i++) {
    let matchInfo = matches[i].querySelector("div.description").textContent;

    let teams = matches[i].querySelectorAll("div.team");
    let team1 = teams[0];
    let team2 = teams[1];

    // ====================== Name of teams ==================================
    let team1Name = team1.querySelector("div.name-detail").textContent;
    let team2Name = team2.querySelector("div.name-detail").textContent;

    //========================= score of matches ============================
    // there are some matches that cancelled , we need to check how many div inside team1 div
    // by checking its childcount
    // agar yeah handle nahii kiya to score nikalne m code fhat jayega
    let team1Score = "";
    let team2Score = "";

    if (team1.childElementCount == 2 && team2.childElementCount == 2) {
      team1Score = team1
        .querySelector("div.score-detail")
        .querySelector("span.score").textContent;

      team2Score = team2
        .querySelector("div.score-detail")
        .querySelector("span.score").textContent;
    } else if (team1.childElementCount == 2) {
      team1Score = team1
        .querySelector("div.score-detail")
        .querySelector("span.score").textContent;
    } else if (team2.childElementCount == 2) {
      team2Score = team2
        .querySelector("div.score-detail")
        .querySelector("span.score").textContent;
    }
    // ==================================== Match result ==============================
    let resultDescription =
      matches[i].querySelector("div.status-text").textContent;
    let result = "";
    if (!team1Score || !team2Score) {
      result = -1;
    } else if (parseInt(team1Score) > parseInt(team2Score)) {
      result = 1;
    } else if (parseInt(team2Score) > parseInt(team1Score)) {
      result = 0;
    } else if (parseInt(team1Score) === parseInt(team2Score)) {
      result = 2;
    }
    /*
2 -  tie
1 -  team1 win
0 -  team2 win 
-1 -  abandoned 
*/

    const matchData = {
      matchInfo,
      team1Name,
      team2Name,
      team1Score,
      team2Score,
      resultDescription,
      result,
    };

    worldCup.push(matchData);
  }

  const json_data = JSON.stringify(worldCup);

  fs.writeFileSync("worldcup_loadedData.json", json_data);
  console.log(worldCup.length);
});

/*
 [
  {
    team1: 'New Zealand',
    team2: 'England',
    desc: "Final, Lord's, Jul 14 2019, ICC Cricket World Cup",
    team1run: 241,
    team2run: 241,
    matchResut: 'Match tied'
  },
  {
    team1: 'Australia',
    team2: 'England',
    desc: '2nd Semi-final, Birmingham, Jul 11 2019, ICC Cricket World Cup',
    team1run: 223,
    team2run: 226,
    matchResut: 'England won by 8 wickets (with 107 balls remaining)'
  },
  {
    team1: 'New Zealand',
    team2: 'India',
    desc: '1st Semi-final, Manchester, Jul 9 - 10 2019, ICC Cricket World Cup',
    team1run: 239,
    team2run: 221,
    matchResut: 'New Zealand won by 18 runs'
  },
  {
    team1: 'South Africa',
    team2: 'Australia',
    desc: '45th match (D/N), Manchester, Jul 6 2019, ICC Cricket World Cup',
    team1run: 325,
    team2run: 315,
    matchResut: 'South Africa won by 10 runs'
  },
  {
    team1: 'Sri Lanka',
    team2: 'India',
    desc: '44th match, Leeds, Jul 6 2019, ICC Cricket World Cup',
    team1run: 264,
    team2run: 265,
    matchResut: 'India won by 7 wickets (with 39 balls remaining)'
  },
  {
    team1: 'Pakistan',
    team2: 'Bangladesh',
    desc: "43rd match, Lord's, Jul 5 2019, ICC Cricket World Cup",
    team1run: 315,
    team2run: 221,
    matchResut: 'Pakistan won by 94 runs'
  },
  {
    team1: 'West Indies',
    team2: 'Afghanistan',
    desc: '42nd match, Leeds, Jul 4 2019, ICC Cricket World Cup',
    team1run: 311,
    team2run: 288,
    matchResut: 'West Indies won by 23 runs'
  },
  {
    team1: 'England',
    team2: 'New Zealand',
    desc: '41st match, Chester-le-Street, Jul 3 2019, ICC Cricket World Cup',
    team1run: 305,
    team2run: 186,
    matchResut: 'England won by 119 runs'
  },
  {
    team1: 'India',
    team2: 'Bangladesh',
    desc: '40th match, Birmingham, Jul 2 2019, ICC Cricket World Cup',
    team1run: 314,
    team2run: 286,
    matchResut: 'India won by 28 runs'
  },
  {
    team1: 'Sri Lanka',
    team2: 'West Indies',
    desc: '39th match, Chester-le-Street, Jul 1 2019, ICC Cricket World Cup',
    team1run: 338,
    team2run: 315,
    matchResut: 'Sri Lanka won by 23 runs'
  },
  {
    team1: 'England',
    team2: 'India',
    desc: '38th match, Birmingham, Jun 30 2019, ICC Cricket World Cup',
    team1run: 337,
    team2run: 306,
    matchResut: 'England won by 31 runs'
  },
  {
    team1: 'Australia',
    team2: 'New Zealand',
    desc: "37th match (D/N), Lord's, Jun 29 2019, ICC Cricket World Cup",
    team1run: 243,
    team2run: 157,
    matchResut: 'Australia won by 86 runs'
  },
  {
    team1: 'Afghanistan',
    team2: 'Pakistan',
    desc: '36th match, Leeds, Jun 29 2019, ICC Cricket World Cup',
    team1run: 227,
    team2run: 230,
    matchResut: 'Pakistan won by 3 wickets (with 2 balls remaining)'
  },
  {
    team1: 'Sri Lanka',
    team2: 'South Africa',
    desc: '35th match, Chester-le-Street, Jun 28 2019, ICC Cricket World Cup',
    team1run: 203,
    team2run: 206,
    matchResut: 'South Africa won by 9 wickets (with 76 balls remaining)'
  },
  {
    team1: 'India',
    team2: 'West Indies',
    desc: '34th match, Manchester, Jun 27 2019, ICC Cricket World Cup',
    team1run: 268,
    team2run: 143,
    matchResut: 'India won by 125 runs'
  },
  {
    team1: 'New Zealand',
    team2: 'Pakistan',
    desc: '33rd match, Birmingham, Jun 26 2019, ICC Cricket World Cup',
    team1run: 237,
    team2run: 241,
    matchResut: 'Pakistan won by 6 wickets (with 5 balls remaining)'
  },
  {
    team1: 'Australia',
    team2: 'England',
    desc: "32nd match, Lord's, Jun 25 2019, ICC Cricket World Cup",
    team1run: 285,
    team2run: 221,
    matchResut: 'Australia won by 64 runs'
  },
  {
    team1: 'Bangladesh',
    team2: 'Afghanistan',
    desc: '31st match, Southampton, Jun 24 2019, ICC Cricket World Cup',
    team1run: 262,
    team2run: 200,
    matchResut: 'Bangladesh won by 62 runs'
  },
  {
    team1: 'Pakistan',
    team2: 'South Africa',
    desc: "30th match, Lord's, Jun 23 2019, ICC Cricket World Cup",
    team1run: 308,
    team2run: 259,
    matchResut: 'Pakistan won by 49 runs'
  },
  {
    team1: 'New Zealand',
    team2: 'West Indies',
    desc: '29th match (D/N), Manchester, Jun 22 2019, ICC Cricket World Cup',
    team1run: 291,
    team2run: 286,
    matchResut: 'New Zealand won by 5 runs'
  },
  {
    team1: 'India',
    team2: 'Afghanistan',
    desc: '28th match, Southampton, Jun 22 2019, ICC Cricket World Cup',
    team1run: 224,
    team2run: 213,
    matchResut: 'India won by 11 runs'
  },
  {
    team1: 'Sri Lanka',
    team2: 'England',
    desc: '27th match, Leeds, Jun 21 2019, ICC Cricket World Cup',
    team1run: 232,
    team2run: 212,
    matchResut: 'Sri Lanka won by 20 runs'
  },
  {
    team1: 'Australia',
    team2: 'Bangladesh',
    desc: '26th match, Nottingham, Jun 20 2019, ICC Cricket World Cup',
    team1run: 381,
    team2run: 333,
    matchResut: 'Australia won by 48 runs'
  },
  {
    team1: 'South Africa',
    team2: 'New Zealand',
    desc: '25th match, Birmingham, Jun 19 2019, ICC Cricket World Cup',
    team1run: 241,
    team2run: 245,
    matchResut: 'New Zealand won by 4 wickets (with 3 balls remaining)'
  },
  {
    team1: 'England',
    team2: 'Afghanistan',
    desc: '24th match, Manchester, Jun 18 2019, ICC Cricket World Cup',
    team1run: 397,
    team2run: 247,
    matchResut: 'England won by 150 runs'
  },
  {
    team1: 'West Indies',
    team2: 'Bangladesh',
    desc: '23rd match, Taunton, Jun 17 2019, ICC Cricket World Cup',
    team1run: 321,
    team2run: 322,
    matchResut: 'Bangladesh won by 7 wickets (with 51 balls remaining)'
  },
  {
    team1: 'India',
    team2: 'Pakistan',
    desc: '22nd match, Manchester, Jun 16 2019, ICC Cricket World Cup',
    team1run: 336,
    team2run: 212,
    matchResut: 'India won by 89 runs (D/L method)'
  },
  {
    team1: 'Afghanistan',
    team2: 'South Africa',
    desc: '21st match (D/N), Cardiff, Jun 15 2019, ICC Cricket World Cup',
    team1run: 125,
    team2run: 131,
    matchResut: 'South Africa won by 9 wickets (with 116 balls remaining) (D/L method)'
  },
  {
    team1: 'Australia',
    team2: 'Sri Lanka',
    desc: '20th match, The Oval, Jun 15 2019, ICC Cricket World Cup',
    team1run: 334,
    team2run: 247,
    matchResut: 'Australia won by 87 runs'
  },
  {
    team1: 'West Indies',
    team2: 'England',
    desc: '19th match, Southampton, Jun 14 2019, ICC Cricket World Cup',
    team1run: 212,
    team2run: 213,
    matchResut: 'England won by 8 wickets (with 101 balls remaining)'
  },
  {
    team1: 'India',
    team2: 'New Zealand',
    desc: '18th match, Nottingham, Jun 13 2019, ICC Cricket World Cup',
    team1run: NaN,
    team2run: NaN,
    matchResut: 'Match abandoned without a ball bowled'
  },
  {
    team1: 'Australia',
    team2: 'Pakistan',
    desc: '17th match, Taunton, Jun 12 2019, ICC Cricket World Cup',
    team1run: 307,
    team2run: 266,
    matchResut: 'Australia won by 41 runs'
  },
  {
    team1: 'Bangladesh',
    team2: 'Sri Lanka',
    desc: '16th match, Bristol, Jun 11 2019, ICC Cricket World Cup',
    team1run: NaN,
    team2run: NaN,
    matchResut: 'Match abandoned without a ball bowled'
  },
  {
    team1: 'South Africa',
    team2: 'West Indies',
    desc: '15th match, Southampton, Jun 10 2019, ICC Cricket World Cup',
    team1run: 29,
    team2run: NaN,
    matchResut: 'No result'
  },
  {
    team1: 'India',
    team2: 'Australia',
    desc: '14th match, The Oval, Jun 9 2019, ICC Cricket World Cup',
    team1run: 352,
    team2run: 316,
    matchResut: 'India won by 36 runs'
  },
  {
    team1: 'Afghanistan',
    team2: 'New Zealand',
    desc: '13th match (D/N), Taunton, Jun 8 2019, ICC Cricket World Cup',
    team1run: 172,
    team2run: 173,
    matchResut: 'New Zealand won by 7 wickets (with 107 balls remaining)'
  },
  {
    team1: 'England',
    team2: 'Bangladesh',
    desc: '12th match, Cardiff, Jun 8 2019, ICC Cricket World Cup',
    team1run: 386,
    team2run: 280,
    matchResut: 'England won by 106 runs'
  },
  {
    team1: 'Pakistan',
    team2: 'Sri Lanka',
    desc: '11th match, Bristol, Jun 7 2019, ICC Cricket World Cup',
    team1run: NaN,
    team2run: NaN,
    matchResut: 'Match abandoned without a ball bowled'
  },
  {
    team1: 'Australia',
    team2: 'West Indies',
    desc: '10th match, Nottingham, Jun 6 2019, ICC Cricket World Cup',
    team1run: 288,
    team2run: 273,
    matchResut: 'Australia won by 15 runs'
  },
  {
    team1: 'Bangladesh',
    team2: 'New Zealand',
    desc: '9th match (D/N), The Oval, Jun 5 2019, ICC Cricket World Cup',
    team1run: 244,
    team2run: 248,
    matchResut: 'New Zealand won by 2 wickets (with 17 balls remaining)'
  },
  {
    team1: 'South Africa',
    team2: 'India',
    desc: '8th match, Southampton, Jun 5 2019, ICC Cricket World Cup',
    team1run: 227,
    team2run: 230,
    matchResut: 'India won by 6 wickets (with 15 balls remaining)'
  },
  {
    team1: 'Sri Lanka',
    team2: 'Afghanistan',
    desc: '7th match, Cardiff, Jun 4 2019, ICC Cricket World Cup',
    team1run: 201,
    team2run: 152,
    matchResut: 'Sri Lanka won by 34 runs (D/L method)'
  },
  {
    team1: 'Pakistan',
    team2: 'England',
    desc: '6th match, Nottingham, Jun 3 2019, ICC Cricket World Cup',
    team1run: 348,
    team2run: 334,
    matchResut: 'Pakistan won by 14 runs'
  },
  {
    team1: 'Bangladesh',
    team2: 'South Africa',
    desc: '5th match, The Oval, Jun 2 2019, ICC Cricket World Cup',
    team1run: 330,
    team2run: 309,
    matchResut: 'Bangladesh won by 21 runs'
  },
  {
    team1: 'Afghanistan',
    team2: 'Australia',
    desc: '4th match (D/N), Bristol, Jun 1 2019, ICC Cricket World Cup',
    team1run: 207,
    team2run: 209,
    matchResut: 'Australia won by 7 wickets (with 91 balls remaining)'
  },
  {
    team1: 'Sri Lanka',
    team2: 'New Zealand',
    desc: '3rd match, Cardiff, Jun 1 2019, ICC Cricket World Cup',
    team1run: 136,
    team2run: 137,
    matchResut: 'New Zealand won by 10 wickets (with 203 balls remaining)'
  },
  {
    team1: 'Pakistan',
    team2: 'West Indies',
    desc: '2nd match, Nottingham, May 31 2019, ICC Cricket World Cup',
    team1run: 105,
    team2run: 108,
    matchResut: 'West Indies won by 7 wickets (with 218 balls remaining)'
  },
  {
    team1: 'England',
    team2: 'South Africa',
    desc: '1st match, The Oval, May 30 2019, ICC Cricket World Cup',
    team1run: 311,
    team2run: 207,
    matchResut: 'England won by 104 runs'
  }
]
*/
