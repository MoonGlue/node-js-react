import React, {memo} from 'react';
import {connect} from 'react-redux';
import {
    editStop as editStopServer,
    moveStop as moveStopServer,
    removeStop as removeStopServer
} from '../../models/AppModel'
import {
    editStopAction,
    moveStopDownAction,
    moveStopUpAction,
    removeStopAction
} from '../../store/actions';

const Stop = ({
    stopName,
    stopId,
    routeId,
    editStopDispatch,
    moveStopUpDispatch,
    moveStopDownDispatch,
    removeStopDispatch
}) => {

    const editStop = async () => {
        let newStopName = prompt('Введите остановку', stopName);

        if(!newStopName) return;

        newStopName = newStopName.trim();

        if(!newStopName || newStopName === stopName) return;

        const info = await editStopServer({routeId, stopId, newStopName});
        console.log(info);
        editStopDispatch({routeId, stopId, newStopName});
    };

    const removeStop = async () => {
        // eslint-disable-next-line no-restricted-globals
        if(confirm(`Остановка '${stopName}' будет удалена. Продолжить?`)){
            const info = await removeStopServer({routeId, stopId});
            console.log(info);
            removeStopDispatch({routeId, stopId});
        }
    };

    const moveStopDown = async () => {
        try {
            const info = await moveStopServer({
                routeId,
                stopId,
                destStopId: stopId + 1
            });
            console.log(info);
            moveStopDownDispatch({ routeId, stopId });
        } catch (error) {
            console.log(error);
        }
    };

    const moveStopUp = async () => {
        try {
            const info = await moveStopServer({
                routeId,
                stopId,
                destStopId: stopId - 1
            });
            console.log(info);
            moveStopUpDispatch({ routeId, stopId });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="tp-route-stop">
            <div className="tp-route-stop-text">
                {stopName}
            </div>
            <div className="tp-route-stop-controls">
                <div className="tp-route-stop-controls-row">
                    <div
                        className="tp-route-stop-controls-icon up-arrow-icon"
                        onClick={moveStopUp}
                    ></div>
                    <div
                        className="tp-route-stop-controls-icon down-arrow-icon"
                        onClick={moveStopDown}
                    ></div>
                </div>
                <div className="tp-route-stop-controls-row">
                    <div
                        className="tp-route-stop-controls-icon edit-icon"
                        onClick={editStop}
                    ></div>
                    <div
                        className="tp-route-stop-controls-icon delete-icon"
                        onClick={removeStop}
                    ></div>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    editStopDispatch: ({routeId, stopId, newStopName}) => dispatch(editStopAction({routeId, stopId, newStopName})),
    moveStopDownDispatch: ({routeId, stopId}) => dispatch(moveStopDownAction({routeId, stopId})),
    moveStopUpDispatch: ({routeId, stopId}) => dispatch(moveStopUpAction({routeId, stopId})),
    removeStopDispatch: ({routeId, stopId}) => dispatch(removeStopAction({routeId, stopId}))
});

export default connect(
    null,
    mapDispatchToProps
)(memo(Stop))