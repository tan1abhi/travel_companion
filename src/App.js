import React,{useState, useEffect} from "react";
import { CssBaseline,Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import Map from "./components/Map/Map";
import { Widgets } from "@material-ui/icons";
import {getPlacesData} from './api';


const App=() =>{ 

    const[places,setPlaces]=useState([]);
    const[filteredPlaces,setFilteredPlaces]=useState([]);
    const[coords, setCoords]=useState({lat :0, lng :0});
    const[bounds,setBounds]=useState({});
    const[childClicked,setChildClicked]=useState(null);

    const[isLoading , setisLoading]=useState(false);
    const [type,setType] = useState('restaurants');
    const [rating,setRating]= useState('');

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords: {latitude,longitude}})=>{
            setCoords({lat:latitude , lng:longitude});
        })
},[]);

useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

    useEffect(()=>{
        if(bounds.sw && bounds.ne){
       setisLoading(true);



        getPlacesData(type , bounds.sw, bounds.ne)
        .then((data)=>{
        
            setPlaces(data?.filter((place)=> place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
            setisLoading(false);
        })
    }
    },[bounds,type]);

    
    return(

        <>
            <CssBaseline />
            <Header setCoords={setCoords}/>
            <Grid container spacing={3} style={{Width : '100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                    places={filteredPlaces.length ? filteredPlaces : places}
                    childClicked={childClicked}
                    isLoading={isLoading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                    />
                    
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                    setCoords={setCoords}
                    setBounds={setBounds}
                    coords={coords}
                    places={filteredPlaces.length ? filteredPlaces : places}
                    setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;
  