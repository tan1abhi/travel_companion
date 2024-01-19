import React , {useState} from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar ,Box,InputBase, Typography } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';


const Header = ({setCoords}) => {
    const classes= useStyles();
    const[autocomplete, setAutocomplete]=useState(null);

    const onLoad= (autoC)=> setAutocomplete(autoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoords({lat,lng});
    }

    return(
        <div>
            <AppBar position="static">
                <Toolbar className={classes.Toolbar}>
                    <Typography variant="h3" className={classes.title}>
                        Travel Advisor
                    </Typography>
                    <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore new places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder="search..." classes={{ root:classes.InpupRoot , input:classes.inputInput}} />
                        </div>
                    </Autocomplete>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;