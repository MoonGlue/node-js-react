import React, {memo} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import {
    addStop as addStopServer,
    editRoute as editRouteServer,
    removeRoute as removeRouteServer,
    editRoutePurp as editRoutePurpServer
} from '../../models/AppModel'
import {
    addStopAction,
    editRouteAction,
    removeRouteAction,
    editRoutePurpAction
} from '../../store/actions';
import Stop from '../Stop/Stop'

const Route = ({
    routeName,
    routePurp,
    routeId,
    stops,
    addStopDispatch,
    editRouteDispatch,
    removeRouteDispatch,
    editRoutePurpDispatch
}) => {
    const addStop = async () => {
        let newStopName = prompt('Введите остановку');
        
        if(!newStopName) return;

        newStopName = newStopName.trim();

        if(!newStopName) return;

        console.log({routeId, newStopName});
        const info = await addStopServer({routeId, newStopName});
        console.log(info);
        addStopDispatch({routeId, stopName: newStopName});
    }

    const editRoute = async () => {
        let newRouteName = prompt('Введите номер маршрута', routeName);

        if(!newRouteName) return;

        newRouteName = newRouteName.trim();

        if(!newRouteName || newRouteName === routeName || newRouteName.match(/[\p{Alpha}]/gu)) return;

        const info = await editRouteServer({routeId, newRouteName});
        console.log(info);
        editRouteDispatch({routeId,newRouteName});
    };

    const removeRoute = async () => {
        // eslint-disable-next-line no-restricted-globals
        if(confirm(`Маршрут '${routeName}' будет удалён. Продолжить?`)){
            const info = await removeRouteServer({routeId});
            console.log(info);
            removeRouteDispatch({routeId});
        }
    };

    const editRoutePurp = async (e) => {
        let change = e.value;
        console.log(change, routeName);
        console.log(typeof change);
        routePurp = change;
        change = HTMLElement.dataset;
        console.log(typeof change, change);
        const info = await editRoutePurpServer({routeId, routePurp});
            console.log(info);
            editRoutePurpDispatch({routeId, routePurp});
    }

    const options = [
        {value: '1', label: 'магистральный'},
        {value: '2', label: 'районный'},
        {value: '3', label: 'социальный'}
    ]

    return(

        <div className="tp-route">
        <div className="tp-route-block">
            <header className="tp-route-header">
                {routeName}
            </header>
            <div className="tp-route-controls-row">
                <div 
                className="tp-route-controls-icon edit-icon"
                onClick={editRoute}
                />
                <div 
                className="tp-route-controls-icon delete-icon"
                onClick={removeRoute}
                />
            </div>
        </div>
        <div className="tp-route-choose">
        <Select 
            placeholder="Назаначение"
            options={options}
            value={options.find((element, index, array) => {
                console.log(element.value);
                if(Number(element.value) === Number(routePurp)) {console.log("changing...");return element.value};
                console.log("ni",routePurp,element.value);
                return false;
            })}
            onChange={editRoutePurp}
        />
        </div>

        <div id="tp-route-text">
            Остановки:
        </div>
        <div className="tp-route-stops">
        {stops.map((stop, index) => (
            <Stop
                stopName={stop}
                stopId={index}
                routeId={routeId}
                key={`stop${index}-route${routeId}`}
            />
        ))}
        </div>
        <footer 
        className="tp-route-add-stop"
        onClick={addStop}
        >
            Добавить остановку
        </footer>
        </div>
        );
    };

const mapDispatchToProps = dispatch => ({
    addStopDispatch: ({routeId, stopName}) => dispatch(addStopAction({routeId, stopName})),
    editRouteDispatch: ({routeId, newRouteName}) => dispatch(editRouteAction({routeId, newRouteName})),
    removeRouteDispatch: ({routeId}) => dispatch(removeRouteAction({routeId})),
    editRoutePurpDispatch: ({routeId, routePurp}) => dispatch(editRoutePurpAction({routeId, routePurp}))
});

export default connect(
    null,
    mapDispatchToProps
)(memo(Route));
