// node makeFolder.js --filename="worldcupData.json" --dest="worldCup"

let minimist = require("minimist"),
  path = require("path"),
  fs = require("fs"),
  pdf = require("pdf-lib");

let input = minimist(process.argv);
let dataJson = fs.readFileSync(input.filename, "utf-8");
let worldCupData = JSON.parse(dataJson);

// make parent folder

// now make folder to each team inside parent folder
if (!fs.existsSync(input.dest)) {
  fs.mkdirSync(input.dest);
}

for (let m in worldCupData) {
  let path1 = path.join(input.dest, m);
  fs.mkdirSync(path1);

  // makepdf for each match
  for (let i = 0; i < worldCupData[m].matches.length; i++) {
    let path2 = path.join(path1, worldCupData[m].matches[i].vs + ".pdf");

    createScoreCard(path2, m, worldCupData[m].matches[i]);
  }
}

function createScoreCard(matchPdfPath, team, match) {
  let t1 = team;
  let t2 = match.vs;

  let orginalBytes = fs.readFileSync("Template.pdf");
  let prmToLoadDoc = pdf.PDFDocument.load(orginalBytes);
  prmToLoadDoc.then(function (pdfDoc) {
    let page = pdfDoc.getPage(0);

    page.drawText(t1 + " v/s " + t2, {
      x: 150,
      y: 620,
      size: 23,
      color: pdf.rgb(0.07, 0.12, 0.476),
    });

    page.drawText(match.matchInfo, {
      x: 70,
      y: 570,
      size: 15,
    });

    page.drawText(t1, {
      x: 80,
      y: 430,
      size: 16,
    });
    page.drawText(t2, {
      x: 310,
      y: 430,
      size: 16,
    });

    page.drawText(match.score, {
      x: 210,
      y: 430,
      size: 16,
    });
    page.drawText(match.vsScore, {
      x: 490,
      y: 430,
      size: 16,
    });

    page.drawText(match.resultDescription, {
      x: 70,
      y: 300,
      size: 20,
      color: pdf.rgb(0.01171, 0.3984, 0.98437),
    });

    if (match.result == "Win") {
      page.drawText(`Congratulation Team ${t1}`, {
        x: 100,
        y: 230,
        size: 30,
        color: pdf.rgb(0.9843, 0.01171, 0.449218),
      });
    }

    let prmToSave = pdfDoc.save();
    prmToSave.then(function (changedBytes) {
      if (!fs.existsSync(matchPdfPath)) {
        fs.writeFileSync(matchPdfPath, changedBytes);
      } else {
        const newpath = matchPdfPath.split(".pdf").join("2") + ".pdf";
        fs.writeFileSync(newpath, changedBytes);
      }
    });
  });
}
