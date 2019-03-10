import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as readline from 'readline';

import * as apicache from 'apicache';
const cache = apicache.middleware;
import * as compression from 'compression';

// import { DatabaseModule } from './modules';

// import {
// } from './routes';

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

const port = process.env.REAL_TRENDS_PORT || '8080';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Application running on localhost:${port}\n`);
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
    // DatabaseModule.closeAllConnesctions()
    //     .then(() => {
    //         logger.info(`Gracefully shutting down the application.`);
    //         process.exit();
    //     });
    process.exit()
});
