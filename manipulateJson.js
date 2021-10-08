//  node .\manipulateJson.js --data=worldcup_loadedData.json
let minimist = require("minimist");
let fs = require("fs");
let pdf = require("pdf-lib");
let args = minimist(process.argv);
let path = require("path");
const matchJsonData = fs.readFileSync(args.data, "utf-8");
const matches = JSON.parse(matchJsonData);

const obj = {};
// create structure of data
for (let i = 0; i < matches.length; i++) {
  if (!(matches[i].team1Name in obj)) {
    obj[matches[i].team1Name] = {
      rank: i,
      matches: [],
    };
  }
}

// here now fill data
for (let i = 0; i < matches.length; i++) {
  let team1 = matches[i].team1Name;
  let team2 = matches[i].team2Name;
  let score1 = matches[i].team1Score;
  let score2 = matches[i].team2Score;
  let matchInfo = matches[i].matchInfo;

  let result = matches[i].result;
  let resultDescription = matches[i].resultDescription;
  /*
2 -  tie
1 -  team1 win
0 -  team2 win 
-1 -  abandoned 
*/

  let result1 = "Win",
    result2 = "Loss";

  if (parseInt(result) === 0) {
    result1 = "Loss";
    result2 = "Win";
  } else if (parseInt(result) == 2) {
    result1 = "tie";
    result2 = "tie";
  } else if (parseInt(result) == -1) {
    result1 = "";
    result2 = "";
  }

  let matchdata1 = {
    matchInfo,
    vs: team2,
    score: score1,
    vsScore: score2,
    result: result1,
    resultDescription,
  };

  let matchdata2 = {
    matchInfo,
    vs: team1,
    vsScore: score1,
    score: score2,
    result: result2,
    resultDescription,
  };

  obj[team1].matches.push(matchdata1);
  obj[team2].matches.push(matchdata2);
}

// save data
fs.writeFileSync("worldcupData.json", JSON.stringify(obj));

// //1 make folder for wordlcup records ,
// //2.1 make global pdf for all matches  , make matrix like structure
// //2.2 now make folder for each each and inside that save pdf for match ans overall excel sheet of all matches

// fs.mkdirSync(args.root);
// for (let m in obj) {
//   let path1 = path.join(args.root, m);
//   fs.mkdirSync(path1);

//   // makepdf for each match
//   for (let i = 0; i < obj[m].matches.length; i++) {
//     let path2 = path.join(path1, obj[m].matches[i].vs + ".pdf");
//     fs.writeFileSync(path2, "WorldCup 2019", "utf-8");
//   }
// }

/*
- what to do 
* => we have to read worldcup data , then for each team make its object ,in which details of all matches 
of team is present 
- How to do ?
*=>
1 - read given json file , 
2 - then make object of each team 
{
    team1:"",
    rank:"",
    matches:[
        {   matchInfo:"",
            team2:"",
            score1:"",
            score2="",
            result="",
        }  
    ]
}

3 -  make  sure to add score in both team object  (team1 and team2  )
const data = {
    india: {
        rank: 2,
        matches: [{
            
        }]
        
    }
    ,
    pakistan: {
        
    },
    srilanks: {
        
    }




}


*/
