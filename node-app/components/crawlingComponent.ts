import * as request from 'request';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

const imdbUrl: string = "https://www.imdb.com/search/title/?count=100&groups=top_1000&sort=user_rating";
const uploadDirPath: string = path.join(__dirname, '../uploads');

export interface ImdbContentObject {
    href: string,
    name: string,
    movieYear: string,
    certificate: string,
    runtime: string,
    genre: string,
    rating: string,
    metaScore: string,
    gross: string
}

export class CrawlerComponent {

    public constructor() { }

    public async imdbCrawler() {
        request(imdbUrl, function (err, _res, body) {
            if (err) throw new Error(`Error while crawling url : ${err}`);

            const arr: any[] = [];
            let $ = cheerio.load(body);
            $('div#pagecontent > div#content-2-wide > div#main > div.article > div.sub-list > div.lister-list > div.lister-item').each(function () {
                const href = $(this).find('div.lister-item-content > h3.lister-item-header > a').attr('href');
                const name = $(this).find('div.lister-item-content > h3.lister-item-header > a').text();
                const movieYear = $(this).find('div.lister-item-content > h3.lister-item-header > span.lister-item-year').text();
                const certificate = $(this).find('div.lister-item-content > p.text-muted > span.certificate').text();
                const runtime = $(this).find('div.lister-item-content > p.text-muted > span.runtime').text();
                const genre = $(this).find('div.lister-item-content > p.text-muted > span.genre').text().replace(/\s+/g, ' ').trim();
                const rating = $(this).find('div.lister-item-content > div.ratings-bar > div.ratings-imdb-rating').attr('data-value');
                const metaScore = $(this).find('div.lister-item-content > div.ratings-bar > div.ratings-metascore > span.metascore').text().replace(/\s+/g, ' ').trim();
                const gross = $(this).find('div.lister-item-content > p.sort-num_votes-visible > span:last').text();

                const finalObj: ImdbContentObject = {
                    href: href,
                    name: name,
                    movieYear: movieYear,
                    certificate: certificate,
                    runtime: runtime,
                    genre: genre,
                    rating: rating,
                    metaScore: metaScore,
                    gross: gross
                };
                arr.push(finalObj);
            });

            fs.access(uploadDirPath, function (err) {
                if (err && err.code === 'ENOENT') {
                    fs.mkdirSync(uploadDirPath); //Create dir in case not found
                }

                const uploadFilePath: string = path.join(uploadDirPath, '/imdbMovieData.json');

                fs.writeFile(`${uploadFilePath}`, JSON.stringify(arr), function (err) {
                    if (err) throw new Error(`Error while writing data : ${err}`);
                    console.log("Data written successfully !!!");
                });
            });
        });
    }
}