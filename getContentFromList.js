const fs=require("fs"),
    request = require("request"),
    cheerio = require("cheerio");

const films = fs.readFileSync('melodrama__list.txt', 'utf8');
const filmList = films.split('*');

filmList.forEach((id, _index) => {
    let url = `https://www.kinomania.ru/film/${id}`;

    request(url, function (error, _response, body) {
        if (!error) {
            const $ = cheerio.load(body, {decodeEntities: false}),
                description = $(".list-post-item-content").find('p').html();

            if (description) {
                fs.appendFile("melodrama.txt", `${description}\r\n`, function(error){
                    if(error) throw error;
                });
            }
        } else {
            console.log("Error: " + error);
        }
    });
});
