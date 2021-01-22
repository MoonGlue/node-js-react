import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {getRoutes, addRoute} from '../../models/AppModel'
import {
    downloadRoutesAction,
    addRouteAction,
} from '../../store/actions';
import Route from '../Route/Route';
import './App.css';



class App extends PureComponent {
    state = {
        isInputShown: false,
        inputValue: ''
    };

    async componentDidMount() {
        const routes = await getRoutes();
        this.props.downloadRoutesDispatch(routes);
    }

    showInput = () => this.setState({isInputShown: true});

    onInputChange = ({target: {value}}) => this.setState({inputValue: value});

    onKeyDown = async (event) => {

        if(event.key === 'Escape') {
            this.setState({
                isInputShown: false,
                inputValue: ''
            })
        }

        if(event.key === 'Enter') {
            if(this.setState.inputValue !== ''){
                this.state.inputValue = this.state.inputValue.trim();
                if(this.state.inputValue !== '')
                {
                const info = await addRoute({
                    routeName: this.state.inputValue,
                    stops: []
                }).then(info => console.log(info));
                console.log(info);
                this.props.addRouteDispatch(this.state.inputValue);
            }
            }

            this.setState({
                isInputShown: false,
                inputValue: ''
            })
        }
    }

    render() {
        const {isInputShown, inputValue} = this.state;
        const {routes} = this.props;

        return (
            <Fragment>
                <header id="main-header">
                    Троллейбусный парк
                </header>
                <hr id="line" />
                <header id="second-header">
                    Маршруты
                </header>

                <main id="tp-container"> 
                    {routes.map((route, index) => (
                        <Route
                            routeName={route.routeName}
                            routeId={index}
                            routePurp={route.routePurp}
                            stops={route.stops}
                            key={`route${index}`}
                        />
                    ))}
                    <div className="tp-route">
                    {!isInputShown && (
                        <header className="tp-route-header"
                        onClick={this.showInput}
                        >
                        Добавить маршрут
                        </header>
                    )}
                    {isInputShown && (
                        <input
                        type="number"
                        min="1"
                        id="add-route-input"
                        placeholder="Новый маршрут"
                        value={inputValue}
                        onChange={this.onInputChange}
                        onKeyDown={this.onKeyDown}
                        />
                    )}
                    </div>
                </main>
                <footer>
                    <div id="author">
                        by Goroshkov Daniil
                    </div>
                </footer>
            </Fragment>
        )
    }
}

const mapStateToProps = ({routes}) => ({routes});

const mapDispatchToProps = dispatch => ({
    addRouteDispatch: (routeName) => dispatch(addRouteAction(routeName)),
    downloadRoutesDispatch: (routes) => dispatch(downloadRoutesAction(routes))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);