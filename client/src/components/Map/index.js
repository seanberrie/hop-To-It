import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';



export class MapContainer extends Component {
    state = {
        showingInfoWindow : false,
        activeMarker: {},
        selectedPlace: {}
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked = ( props ) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {
        let { breweries } = this.props;
        return(
            <div style={{ height: '30vh', width: '30vh'}}>
                <Map google={this.props.google}
                zoom={10}
                initialCenter={{
                    lat: 34.0522, 
                    lng: -118.2437 
                }}
                onClick={this.onMapClicked}
                >
            { breweries.map((brewery, i) => {
                const index = i + 1;
                return ( 
                <Marker
                onClick={this.onMarkerClick}
                key={i}
                label={index.toString()}
                brewery={brewery}
                position={ {lat: `${brewery.location.lat}`, lng: `${brewery.location.lng}`}} />
                )
            })}
               
                <InfoWindow
                marker = {this.state.activeMarker}
                visible = {this.state.showingInfoWindow}>
                <div>
                    { this.state.selectedPlace.brewery
                    ? (
                        <h3>{this.state.selectedPlace.brewery.name}</h3>
                    ) : (
                        <h3>Brewery Not Loaded</h3>
                    )}
                </div>    
                </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg"
})(MapContainer)