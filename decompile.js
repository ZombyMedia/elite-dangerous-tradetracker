// var zlib = require('zlib');
// var unzip = zlib.createUnzip();
var fs = require('fs');
// var tar = require('tar-fs');
var shell = require('shelljs');

// var sourceUrl = "https://www.edsm.net/dump/systemsPopulated.json.gz";
//
// shell.exec('./getSystemData.sh');

fs.readFile('./data/systemData.json', (err, data) => {
    if (err) throw err;
    // var result = JSON.parse(data);
    // var objectLength = Object.keys(data).length;
    var allProducts = "";

    console.log(data);

    // for (var i = 0; i < objectLength; i++) {
    //   alldatasACD = data[i];
    //   console.log(alldatasACD);
    // }
});
