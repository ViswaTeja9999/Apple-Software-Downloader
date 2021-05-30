import { Grid, Typography, makeStyles } from '@material-ui/core'
import { GlobalContext } from '../Context/GlobalState';
import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom';

function DeviceList(props) {
    const {getdeviceFirmware,setdeviceImage}=useContext(GlobalContext);
    const useStyles=makeStyles((theme)=>({
        root:{
            height:'300px',
            margin:theme.spacing(3)
        },
        details:{
            alignContent:'center',
            marginInline:'30px',
        },
        button:{
            textDecoration:'none',
            color:'white',
            '&:hover':{
                color:'orange',
            },
        },
        imagecontainer:{
            height:'230px',
            width:'270px'
        },
    }))
    const modelName=props.modelname;
    const modelId=props.modelnumber;
    const modelImage=props.modelimage;
    const history=useHistory();
    const classes=useStyles();
    const handledeviceClick=
        (e) => {
            e.preventDefault();
        const deviceid=modelId;
        getdeviceFirmware(deviceid);
        setdeviceImage(modelImage);
        history.push('/oslist');
        }
    return (
        <Grid container  className={classes.root}>
            <Link  onClick={handledeviceClick} className={classes.button}>
           <Grid item xs={12}>
               <Grid item xs={12}>
                <Grid item className={classes.imagecontainer}>
               <img src={modelImage} alt='img'/>
               </Grid>
               <Grid item xs={12} classname={classes.details}>
                <Typography>{modelName}</Typography>
                <Typography>{modelId}</Typography>
                </Grid>
           </Grid>
           </Grid>
           </Link>
        </Grid>
    )
}

export default DeviceList
