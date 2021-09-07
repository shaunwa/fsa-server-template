import express from 'express';
import { db } from './db';
import { routes } from './routes';
import * as admin from 'firebase-admin';
import credentials from './credentials.json';
import { protectRoute } from './routes/protectRoute';

admin.initializeApp({ credential: admin.credential.cert(credentials) });

const app = express();
app.use(express.static(__dirname + '/uploads/'));
app.use(express.json());

routes.forEach(route => {
    app[route.method](route.path, protectRoute, route.handler);
});

const start = async () => {
	await db.connect('mongodb://localhost:27017');
    await app.listen(8080);
    console.log("Listening on port 8080");
}

start();