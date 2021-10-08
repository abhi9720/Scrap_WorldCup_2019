//node MakeExcelSheet.js --filepath="worldcupData.json"

let minimist = require("minimist");
let args = minimist(process.argv);

let fs = require("fs");

let xl = require("excel4node");
let wb = new xl.Workbook();

let hs1 = wb.createStyle({
  font: {
    color: "#FFFFFF",
    size: 15,
    bold: true,
    italics: true,
  },
  fill: {
    type: "pattern",
    patternType: "solid",
    fgColor: "#1d3557",
  },
  alignment: {
    horizontal: ["center"],
    vertical: ["center"],
  },
});

let ts = wb.createStyle({
  font: {
    size: 15,
  },
  alignment: {
    horizontal: ["center"],
    vertical: ["center"],
  },
});

// 2. create one sheet for each team
//2.1 read json data

let teamsData = fs.readFileSync(args.filepath, "utf-8");
let worldCupData = JSON.parse(teamsData);

// 2.2 create sheet for team and add data of team into their sheets

for (let team in worldCupData) {
  let teamName = team;
  let teamData = worldCupData[team];
  let ws = wb.addWorksheet(teamName);

  ws.cell(1, 1).string("VS").style(hs1);
  ws.cell(1, 2).string("Result").style(hs1);
  ws.column(1).setWidth(40);
  ws.column(2).setWidth(40);

  for (let j = 0; j < teamData.matches.length; j++) {
    ws.cell(j + 2, 1)
      .string(teamData.matches[j].vs)
      .style(ts);
    ws.cell(j + 2, 2)
      .string(teamData.matches[j].result ? teamData.matches[j].result : "-")
      .style(ts);
  }
}
wb.write("worldCup.xlsx");
