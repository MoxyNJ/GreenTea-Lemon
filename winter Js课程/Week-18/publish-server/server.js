let http = require('http');
let fs = require('fs');

http.createServer(function(request, response){
    console.log(request.headers);

    let outFile = fs.createWriteStream("../server/public/index.html");
    

    request.on('data', chunk => {
        outFile.write(chunk);
    });
    response.on('end', () => {
        outFile.end();
        console.log("Success");
    });
}).listen(8082);
