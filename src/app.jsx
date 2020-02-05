import React, { Component } from 'react';

import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';

const Item = props => <li onClick={() => props.deleteItem(props.item.id)}>{props.item.name}</li>

const Items = props => <ul>{props.items.map(item => <Item key={item.id} deleteItem={props.deleteItem} item={item}/>)}</ul>

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2> Welcome to React </h2>
                </div>
                <p className="App-intro">
                    Items
                </p>

                <div className="leaflet-map-endpoint">
                    map goes here, read docs
                </div>

                <Items items={this.props.items} deleteItem={this.props.deleteItem} />
            </div>
        );
    }
}

function deleteItem(id) {
    return {
        type: "DELETE_ITEM",
        id,
    }
}

const mapReduxStateToProps = state => {
    return {
        items: state.items,
    }
};

export default connect(mapReduxStateToProps, { deleteItem })(App);
