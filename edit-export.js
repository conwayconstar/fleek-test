const cheerio = require('cheerio');
const fs = require('fs')
const path = require('path')

function fromDir(startPath, filter, callback) {

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter, callback); //recurse
        } else if (filter.test(filename)) callback(filename);
    };
};

fromDir('./out', /\.html$/, function(filename) {
    fs.readFile(filename, 'utf8', function(err, data) {

        if (err) throw err;

        const updatedData = data
            .replaceAll('href="/', 'href="./')
            .replaceAll('src="/', 'src="./')

        fs.writeFile(filename, updatedData, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
});
