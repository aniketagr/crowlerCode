import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as cors from 'cors';

import { CrawlerComponent } from './components/crawlingComponent';

const app = express();
const port = process.env.PORT || 8081;
const filePath: string = path.join(__dirname, 'uploads/imdbMovieData.json');

app.use(cors());

app.get('/test', function (req, res) {
    res.send("Test Endpoint Working !!!!");
});

app.get('/crawlImdb', function (req, res) {
    try {
        const controller = new CrawlerComponent();
        controller.imdbCrawler();
        res.send("Data Crawling Working !!!!");
    } catch (err) {
        console.error(err);
        res.end(err);
    }
});

app.get('/listMovies', function (req, res) {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(`${filePath}`, { encoding: 'utf8' });
            console.log(data);
            res.end(data);
        } else {
            throw new Error("File do not exists...");
        }
    } catch (err) {
        console.error(err);
        res.end(err);
    }
});

app.listen(port, function () {
    console.log(`Crawler app listening on port ${port}`);
});