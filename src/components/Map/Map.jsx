import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlineIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";


const Map = ({ setCoords , setBounds, coords, setChildClicked, places }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");
  

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
  
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <Marker
            key={i}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            place={place}
            isDesktop={isDesktop}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

const Marker = ({ place, isDesktop }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.markerContainer}
      lat={Number(place.latitude)}
      lng={Number(place.longitude)}
    >
      {isDesktop ? (
        <Paper elevation={3} className={classes.paper}>
          <Typography className={classes.Typography} variant="subtitle2" gutterBottom>
            {place.name}
          </Typography>

          <img
            className={classes.pointer}
            src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
            alt={place.name}
          />
          <Rating size="small" value={Number(place.rating)} readOnly />
        </Paper>
      ) : (
        <LocationOnOutlineIcon color="primary" fontSize="large" />
      )}
    </div>
  );
};

export default Map;
