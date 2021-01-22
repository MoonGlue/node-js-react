const DOWNLOAD_ROUTES = 'DOWNLOAD_ROUTES';
const ADD_ROUTE = 'ADD_ROUTE';
const EDIT_ROUTE = 'EDIT_ROUTE';
const EDIT_ROUTE_PURP = 'EDIT_ROUTE_PURP';
const REMOVE_ROUTE = 'REMOVE_ROUTE';
const ADD_STOP = 'ADD_STOP';
const EDIT_STOP = 'EDIT_STOP';
const MOVE_STOP_DOWN = 'MOVE_STOP_DOWN';
const MOVE_STOP_UP = 'MOVE_STOP_UP';
const REMOVE_STOP = 'REMOVE_STOP';

const downloadRoutesAction = (routes) => ({
    type: DOWNLOAD_ROUTES,
    payload: routes
});

const addRouteAction = (routeName) => ({
    type: ADD_ROUTE,
    payload: routeName,
});

const editRouteAction = ({routeId, newRouteName}) => ({
    type: EDIT_ROUTE,
    payload: {
        routeId,
        newRouteName
    }
});

const editRoutePurpAction = ({routeId, routePurp}) => ({
    type: EDIT_ROUTE_PURP,
    payload: {
        routeId,
        routePurp
    }
});

const removeRouteAction = ({routeId}) => ({
    type: REMOVE_ROUTE,
    payload: {
        routeId
    }
});

const addStopAction = ({routeId, stopName}) => ({
    type: ADD_STOP,
    payload: {
        routeId,
        stopName
    }
});

const editStopAction = ({routeId, stopId, newStopName}) => ({
    type: EDIT_STOP,
    payload: {
        routeId,
        stopId, 
        newStopName
    }
});

const moveStopDownAction = ({routeId, stopId}) => ({
    type: MOVE_STOP_DOWN,
    payload: {
        routeId,
        stopId
    }
});

const moveStopUpAction = ({routeId, stopId}) => ({
    type: MOVE_STOP_UP,
    payload: {
        routeId,
        stopId
    }
});

const removeStopAction = ({routeId, stopId}) => ({
    type: REMOVE_STOP,
    payload: {
        routeId,
        stopId
    }
});

export {
    DOWNLOAD_ROUTES,
    ADD_ROUTE,
    EDIT_ROUTE,
    EDIT_ROUTE_PURP,
    REMOVE_ROUTE,
    ADD_STOP,
    EDIT_STOP,
    MOVE_STOP_DOWN,
    MOVE_STOP_UP,
    REMOVE_STOP,
    downloadRoutesAction,
    addRouteAction,
    editRouteAction,
    editRoutePurpAction,
    removeRouteAction,
    addStopAction,
    editStopAction,
    moveStopDownAction,
    moveStopUpAction,
    removeStopAction
}