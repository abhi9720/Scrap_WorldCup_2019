/*
@task_todo
1 -  npm i axios
2 -  node downloadCrickbuzzData.js --url="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results" --dest="download.html"
*/
let axios = require("axios");
let minimist = require("minimist");
let fs = require("fs");
let args = minimist(process.argv);
let url = args.url;
let dest = args.dest;
console.log(url, dest);
console.log(args);

axios
  .get(
    "https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results"
  )
  .then(function (webData) {
    fs.writeFileSync("download.html", webData.data, "utf-8");
  })
  .catch(function (err) {
    console.log(err.toJSON());
  });
