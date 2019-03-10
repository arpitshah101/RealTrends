import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as readline from 'readline';

import * as compression from 'compression';

import * as mongodb from 'mongodb';

const client = mongodb.MongoClient
const dbURL = "mongodb://localhost:27017"
let database: mongodb.MongoClient = undefined;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser('MY PRECIOUS!'));

app.use('/static', express.static(path.join(__dirname, 'public'), { maxAge: '6h' }));
app.use('/images', express.static(path.join(__dirname, '../images'), { maxAge: '6h' }));

// Add routing to each of the different subroute modules
app.use('/api', compression(),
);

app.get('/', (req: express.Request, res: express.Response) => {
    res.redirect('/static');
});

app.get('/static/*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


// API REQUESTS

app.get('/api/getCounts', (req: express.Request, res: express.Response, next: () => void) => {
    database.db("data")
        .collection("category_counts")
        .find()
        .toArray()
        .then((categoryCounts: any[]) => {
            res.jsonp(categoryCounts.sort((a, b) => b.count - a.count).map((c => {
                const result = {'count': c['count'], 'category': c['category'], 'date': Date.now()}
                return result;
            })));
            next()
        }); 
});

app.get('/api/getArticlesByCategory', (req: express.Request, res: express.Response, next: () => void) => {
    const category = req.query.category;
    database.db("data")
        .collection("articles")
        .find({"category": category}).sort({"date": -1}).limit(10)
        .toArray()
        .then((articles: any[])=> {
            res.jsonp(articles);
            next();
        });
});


const port = process.env.REAL_TRENDS_PORT || '8080';
app.set('port', port);

client.connect(dbURL, {useNewUrlParser: true, poolSize:10 }, (err, db) => {
    if (err) {
        throw err;
    } else {
        database = db;
        console.log("Connected to database");
        const server = http.createServer(app);
        server.listen(port, () => {
            console.log(`Application running on localhost:${port}\n`);
        });
    }
});

// Graceful shutdown portion

if (process.platform === 'win32') {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}

process.on('SIGINT', () => {
    console.log(`SIGINT detected!`);
    database.close().then((success) => {
        console.log("Close connections.");
        process.exit()
    })
});
