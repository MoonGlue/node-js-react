import {
    DOWNLOAD_ROUTES,
    ADD_ROUTE,
    EDIT_ROUTE,
    EDIT_ROUTE_PURP,
    REMOVE_ROUTE,
    ADD_STOP,
    EDIT_STOP,
    MOVE_STOP_DOWN,
    MOVE_STOP_UP,
    REMOVE_STOP
}   from "./actions";

const initialState = {
    routes: []
}

export default function reducer(state = initialState, { type, payload}) {
    switch (type) {

        case DOWNLOAD_ROUTES:
            return {
                ...state,
                routes: payload
            };

        case ADD_ROUTE:
            const newStateAdd = {
                ...state,
                routes: [
                    ...state.routes,
                    {
                        routeName: payload,
                        stops: []
                    }
                ]
            };
            newStateAdd.routes.sort((a,b) =>  Number(a.routeName) > Number(b.routeName) ?1 :-1);
            return newStateAdd;

        case EDIT_ROUTE:
            const newStateEdit = {
                ...state,
                routes: state.routes.map((route, index) =>
                    index !== payload.routeId
                        ? { ...route }
                        : {
                            ...route,
                            routeName: payload.newRouteName
                        })
            }
            newStateEdit.routes.sort((a,b) =>  Number(a.routeName) > Number(b.routeName) ?1 :-1);
            return newStateEdit;

        case REMOVE_ROUTE:
            const removedRoute = state.routes[payload.routeId];
            const otherRoutes = state.routes.filter(
                route => route !== removedRoute
            );
            return {
                ...state,
                routes: otherRoutes
            }

        case EDIT_ROUTE_PURP:
        const routeTmp = payload.routeId;    
        return {
                ...state,
                routes: state.routes.map((route, index) => {
                    if (index === routeTmp) return {
                        ...route,
                        routePurp: payload.routePurp
                    }
                    return { ...route }
                })
            }

        case ADD_STOP:
            return {
                ...state,
                routes: state.routes.map((route, index) =>
                    index !== payload.routeId
                        ? { ...route }
                        : { ...route, stops: [...state.routes[payload.routeId].stops, payload.stopName] })
            };

        case EDIT_STOP:
            return {
                ...state,
                routes: state.routes.map((route, index) =>
                    index !== payload.routeId
                        ? { ...route }
                        : {
                            ...route,
                            stops: route.stops.map((stop, stopIndex) =>
                                stopIndex !== payload.stopId
                                    ? stop 
                                    : payload.newStopName
                            )
                        })
            };

        case MOVE_STOP_DOWN:
            if (payload.stopId === state.routes[payload.routeId].length - 1) {
                return state;
            }
            const movedDownStopD = state.routes[payload.routeId].stops[payload.stopId];
            const movedUpStopD = state.routes[payload.routeId].stops[payload.stopId+1];
            console.log(movedDownStopD, movedUpStopD);

            return {
                ...state,
                routes: state.routes.map((route, index) => 
                index !== payload.routeId
                ? {...route}
                : {
                    ...route,
                    stops: route.stops.map((stop, ind) =>
                    {
                        if(ind === payload.stopId)
                        return movedUpStopD
                        if(ind === payload.stopId+1)
                        return movedDownStopD
                        return stop
                    })
                })
            };

        case MOVE_STOP_UP:
            if (payload.stopId === 0)
                return state;
            const movedDownStopU = state.routes[payload.routeId].stops[payload.stopId-1];
            const movedUpStopU = state.routes[payload.routeId].stops[payload.stopId];
            return {
                ...state,
                routes: state.routes.map((route, index) => 
                index !== payload.routeId
                ? {...route}
                : {
                    ...route,
                    stops: route.stops.map((stop, ind) =>
                    {
                        if(ind === payload.stopId-1)
                        return movedUpStopU
                        if(ind === payload.stopId)
                        return movedDownStopU
                        return stop
                    })
                })
            };

        case REMOVE_STOP:
            const removedStop = state.routes[payload.routeId].stops[payload.stopId];
            const otherStops = state.routes[payload.routeId].stops.filter(
                stop => stop !== removedStop
            );
            return {
                ...state,
                routes: state.routes.map((route, index) => index === payload.routeId
                    ? {
                        ...route,
                        stops: otherStops
                    }

                    : { ...route }
                )
            }
        default:
            return state;
    }
}