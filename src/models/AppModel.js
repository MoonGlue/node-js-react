const localhost = 'localhost';

const getRoutes = async () => {
    const response = await fetch(`http://${localhost}:5321/routes`, {
        method: 'GET',
    });
    const routes = await response.json();
    return routes;
};

const addRoute = async (route) => {
    const response = await fetch(`http://${localhost}:5321/routes`, {
        method: 'POST',
        body: JSON.stringify(route),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const {info} = await response.json();

    return info;
};

const editRoute = async ({routeId, newRouteName}) => {
    const response = await fetch(`http://${localhost}:5321/routes/${routeId}`, {
        method: 'PATCH',
        body: JSON.stringify({newRouteName}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const {info} = await response.json();

    return info;
};

const removeRoute = async ({routeId}) => {
    const response = await fetch(`http://${localhost}:5321/routes/${routeId}`, {
        method: 'DELETE'
    });

    const {info} = await response.json();

    return info;
};

const editRoutePurp = async ({routeId, routePurp}) => {
    const response = await fetch(`http://${localhost}:5321/routes/${routeId}/purp/${routePurp}`, {
        method: 'PATCH'
    });

    console.log(routePurp);
    const {info} = await response.json();

    return info;
};

const addStop = async ({routeId, newStopName}) => {
    console.log({routeId, newStopName});
    const response = await fetch(`http://${localhost}:5321/routes/${routeId}/stops`, {
        method: 'POST',
        body: JSON.stringify({newStopName}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const {info} = await response.json();

    return info;
};

const editStop = async ({routeId, stopId, newStopName}) => {
    const response = await fetch(`http://${localhost}:5321/routes/${routeId}/stops/${stopId}`, {
        method: 'PATCH',
        body: JSON.stringify({newStopName}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const {info} = await response.json();

    return info;
};

const removeStop = async ({routeId, stopId}) => {
    const response = await fetch(`http://${localhost}:5321/routes/${routeId}/stops/${stopId}`, {
        method: 'DELETE'
    });

    const {info} = await response.json();

    return info;
};

const moveStop = async ({routeId, stopId, destStopId}) => {
    const response = await fetch(`http://${localhost}:5321/routes/${routeId}/displacement`, {
        method: 'PATCH',
        body: JSON.stringify({stopId, destStopId}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.status !== 200) {
        const {error} = await response.json();
        return Promise.reject(error);
    }

    const {info} = await response.json();

    return info;
};

export {
    getRoutes,
    addRoute,
    editRoute,
    removeRoute,
    editRoutePurp,
    addStop,
    editStop,
    moveStop,
    removeStop
};