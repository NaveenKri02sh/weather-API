const fs = require('fs');
const http = require('http');
var requests = require('requests');


const homeFile = fs.readFileSync('index.html', 'utf-8');
const tempertaureData=(tempVal,orgVal)=>{
    let tempertarue = tempVal.replace('{%temp%}',orgVal.main.temp);
    tempertarue = tempertarue.replace('{%tempMin%}',orgVal.main.temp_min);
    tempertarue = tempertarue.replace('{%tempMax%}',orgVal.main.temp_max);
    tempertarue = tempertarue.replace('{%tempLocation%}',orgVal.name);
    tempertarue = tempertarue.replace('{%tempCountry%}',orgVal.sys.country);
    tempertarue = tempertarue.replace('{%tempCountry%}',orgVal.sys.country);
    tempertarue = tempertarue.replace('{%tempStatus%}',orgVal.weather[0].main);
    return tempertarue;
}  

http.createServer((req, res) => {
    console.log(req);
    if(req.url='/'){
        requests('https://api.openweathermap.org/data/2.5/weather?q=hebbal&units=metric&appid=9bc4fc93958a2341694a070f5a8ad4a4')
            .on('data', function (chunk) {
                let objJson = JSON.parse(chunk);
                let objArray = [objJson];
                const realTimeData = objArray.map((val)=>tempertaureData(homeFile,val)).join("");
                //console.log(realTimeData)
                res.write(realTimeData);
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
                res.end()
            });
    }

}).listen(8000);

