var fs = require('fs');
var formidable = require('formidable');
var path = require('path');
var filename = '';
var filePath = './images/';


exports.upload = function (request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");



    var form = new formidable.IncomingForm();
    form.parse(request, function (error, fields, files) {

        filename = files.upload.name;
        var ex = path.extname(filename);
        filename = fields.title ? fields.title + ex : filename;
        var properEx = ['.jpg', '.png', '.jpeg'];
        console.log(ex);
        if (properEx.indexOf(ex) !== -1) {
            fs.readFile('templates/upload.html', function (err, html2) {
                fs.renameSync(files.upload.path, filePath + filename);
                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8"
                });
                response.write(html2);
                response.end();
            });
        } else {
            console.log("wrong");
            fs.readFile('templates/error.html', function (err, html3) {
                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8"
                });
                response.write(html3);
                response.end();
            });
        }

    });
}

exports.welcome = function (request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function (err, html) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        response.write(html);
        response.end();
    });
}

exports.styles = function (request, response) {
    fs.readFile('styles/style.css', function (err, css) {
        if (err) throw err;
        response.writeHead(200, {
            'Content-Type': 'text/css; charset=utf-8'
        });
        response.write(css);
        response.end();
    });
}


exports.error = function (request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}


exports.show = function (request, response) {
    fs.readFile(filePath + filename, "binary", function (error, file) {
        response.writeHead(200, {
            "Content-Type": "image/png"
        });
        response.write(file, "binary");
        response.end();
    });
}
