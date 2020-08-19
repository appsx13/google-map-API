import React from 'react';
import './App.css';
import { GoogleMap ,withScriptjs, withGoogleMap , Marker, InfoWindow } from 'react-google-maps';
import * as parksData from "./data/skateboard-parks.json"


function Map() {

  const [selectedPark , setSelectedPark] = useState(null);

  return (
      <GoogleMap  defaultZoom={10} 
                  defaultCenter = {{ lat:45.280622216516925 , lng:-75.760235255689508 }} >
          {parksData.features.map( (park) => (
            <Marker  
                key={park.properties.PARK_ID}  
                position = {{ lat: park.geometry.coordinates[1] , 
                              lng: park.geometry.coordinates[0] }} 
                onClick = { () => {
                  setSelectedPark(park);
                }} />
          ))}

          {selectedPark && (
            <InfoWindow  position = {{ lat: selectedPark.geometry.coordinates[1] , 
                                       lng: selectedPark.geometry.coordinates[0] }} >

              <div>Park Details</div>                            
           </InfoWindow>
          )}  

      </GoogleMap> 
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App(){
    return (
      <div  style = {{ width: "100vw" , height: "100vh" }}  >
        <WrappedMap 
          googleMapURL ={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDG5HkQKzfzcdYq0GvInCIKye93ygeJYkc`}
          loadingElement = { <div style= {{ height : "100%" }} /> } 
          containerElement = { <div style= {{ height : "100%" }} /> }
          mapElement = { <div style= {{ height : "100%" }} /> } />
      </div>
    );
};