const fs=require("fs"),
    request = require("request"),
    cheerio = require("cheerio");
const genres = ['comedies', 'fantasy', 'adventure', 'action', 'melodrama'];

const getIdFromLink = (link) => (
    link ? link.split('/')[2] : 0
);

genres.forEach((genre) => {
    let url = `https://www.kinomania.ru/top/${genre}`;

    request(url, function (error, _response, body) {
        if (!error) {
            let filmList = '';
            const $ = cheerio.load(body, {decodeEntities: false}),
                linkList = $(".session-table").find(".table-top-title");
    
                linkList.each((_index, elem) => {
                    filmList += elem.firstChild.attribs.href ?
                        `${getIdFromLink(elem.firstChild.attribs.href)}*`
                        : '';
                });

            fs.writeFile(`${genre}.txt`, filmList, function(error){
                if(error) throw error;
            });
        } else {
            console.log("Error: " + error);
        }
    });
});
