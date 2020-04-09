import React from 'react';

import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';

// Leaflet
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import axios from 'axios';

const Item = props => <li onClick={() => props.deleteItem(props.item.id)}>{props.item.name}</li>

const Items = props => <ul>{props.items.map(item => <Item key={item.id} deleteItem={props.deleteItem} item={item}/>)}</ul>

function App({items, deleteItem}) {
    const [lat, setLat] = React.useState(51.505);
    const [lng, setLng] = React.useState(-0.09);
    const [zoom, setZoom] = React.useState(13);
    const [activePark, setActivePark] = React.useState(null);
    const [count, setCount] = React.useState(0);
    const [parkgeojson, setParkGeoJson] = React.useState(null);

    const position = [lat, lng];

    // - async useEffect needs empty array as dependency
    // - print useEffect needs parkgeojson as dependency


    const useMountEffect = (func) => React.useEffect(func, []);

    useMountEffect(() => {
        axios.get('park.json').then((data) => {
            setParkGeoJson(data);
        });
    });

    React.useEffect(() => {
        Promise.resolve().then(() => {
            alert(count);
        });
    }, [count]);

    React.useEffect(() => {
        Promise.resolve().then(() => {
            console.log(parkgeojson);
        });
    }, [parkgeojson]);

    let customSetActivePark = () => {
        setCount(count + 1);

        setActivePark("test");
    }

    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2> Welcome to React </h2>
            </div>
            <Map center={position} zoom={zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={position} onClick={customSetActivePark}>
                    <Popup>
                        A pretty CSS popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </Map>

            <p className="App-intro" style={{"marginTop": "20px"}}>
                Items
            </p>
            <Items items={items} deleteItem={deleteItem} />
        </div>
    );
}

function deleteItem(id) {
    return {
        type: "DELETE_ITEM",
        id,
    }
}

// TODO
function addItem(id) {
    return {
        type: "ADD_ITEM",
        id,
    }
}

// TODO
function changeItem(id) {
    return {
        type: "RENAME_ITEM",
        id,
    }
}

const mapStateToProps = state => {
    return {
        items: state.items,
    }
};

export default connect(mapStateToProps, { deleteItem })(App);
