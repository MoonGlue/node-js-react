const express = require('express');
const app = express();
const {readData, writeData} = require('./utils');

const port = 5321;
const hostname = 'localhost';

let routes = [];

//Middleware для разрешения CORS-запросов
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//Middleware для логгирования запросов
app.use((request, response, next) => {
    console.log(
        new Date().toISOString(),
        request.method,
        request.originalUrl
    );
    next();
});

//Middleware для правильного представления request.body
app.use(express.json());

//---------------Route-------------------

app.options('/*', (request, response) => {
    response.statusCode = 200;
    response.send('OK');
});

app.get('/routes', async (request, response) => {
    routes = await readData();
    response.setHeader('Content-Type', 'application/json');
    response.json(routes);
});

app.post('/routes', async (request, response) => {
    routes.push(request.body);
    routes.sort((a,b) =>  Number(a.routeName) > Number(b.routeName) ?1 :-1);

    await writeData(routes);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({info: `Route '${request.body.routeName}' was successfully added`});
});

app.patch('/routes/:routeId', async (request, response) => {
    const {newRouteName} = request.body;
    const routeId = Number(request.params.routeId);

    routes[routeId].routeName = newRouteName;
    routes.sort((a,b) =>  Number(a.routeName) > Number(b.routeName) ?1 :-1);
    await writeData(routes);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({info: `Route '${routeId}' was successfully edited'`});
});

app.delete('/routes/:routeId', async (request, response) => {
    const routeId = Number(request.params.routeId);

    const removedRoute = routes[routeId];
    console.log(routes[routeId]);
    console.log(routeId);

    routes = routes.filter(
        (route, index) => index !== routeId
    );
    await writeData(routes);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({info: `Route '${removedRoute.routeName}' was successfully deleted`});
});

app.patch('/routes/:routeId/purp/:routePurp', async (request, response) => {
    const routeId = Number(request.params.routeId);
    const newRoutePurp = Number(request.params.routePurp);
    routes[routeId].routePurp = newRoutePurp;
    console.log(newRoutePurp);
    await writeData(routes);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({info: `Purpose '${newRoutePurp}' was successfully edited in route '${routes[routeId].routeName}'`});
});

app.post('/routes/:routeId/stops', async (request, response) => {
    const {newStopName} = request.body;
    const routeId = Number(request.params.routeId);

    routes[routeId].stops.push(newStopName);
    await writeData(routes);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({info: `Stop '${newStopName}' was successfully added in route '${routes[routeId].routeName}'`});
});

app.patch('/routes/:routeId/stops/:stopId', async (request, response) => {
    const {newStopName} = request.body;
    const routeId = Number(request.params.routeId);
    const stopId = Number(request.params.stopId);

    routes[routeId].stops[stopId] = newStopName;
    await writeData(routes);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({info: `Stop '${stopId}' was successfully edited in route '${routes[routeId].routeName}'`});
});

app.delete('/routes/:routeId/stops/:stopId', async (request, response) => {
    const routeId = Number(request.params.routeId);
    const stopId = Number(request.params.stopId);

    console.log(routes);
    const removedStop = routes[routeId].stops[stopId];
    console.log(routes[routeId].stops.stopId);
    console.log(stopId);
    console.log(routeId);

    routes[routeId].stops = routes[routeId].stops.filter(
        (stop, index) => index !== stopId
    );
    await writeData(routes);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({info: `Stop '${removedStop}' was successfully deleted`});
});

app.patch('/routes/:routeId/displacement', async (request, response) => { //Здесь не учитываются по идее куда мы перемещаем
    const {stopId, destStopId} = request.body;
    const routeId = Number(request.params.routeId);

    if(destStopId < 0 || destStopId >= routes[routeId].stops.length)
    {
        response.setHeader('Content-Type', 'application/json');
        response.status(403).json({error: `Wrong destination stop ID: ${destStopId}`});
    }

    const movedStop = routes[routeId].stops[stopId];
    routes[routeId].stops[stopId] = routes[routeId].stops[destStopId];
    routes[routeId].stops[destStopId] = movedStop;

    await writeData(routes);
    
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({info: `Stop '${movedStop}' was successfully moved from place '${stopId}' to '${destStopId}'`});
});

app.listen(port, hostname, (err) => {
    if(err) {
        console.log('Error', err);
    }

    console.log(`server is working on ${hostname}:${port}`);
});