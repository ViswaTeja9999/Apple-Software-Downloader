import { Grid, makeStyles, Paper, Typography ,Button} from '@material-ui/core'
import TouchAppIcon from '@material-ui/icons/TouchApp';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import React from 'react'

function StatusSideBar(props) {
    const useStyles=makeStyles((theme)=>({
        root:{
            height:'100vh',
        },
        paper:{
            height:'100vh',
            background:'black',
            color:'white',
            borderRight:'5px solid orange',
        },
        button:{
            width:'100%',
            background:'orange',
            color:'black',
            '&:disabled':{
                color:'grey',
                background:'none',
            },
            '&:hover':{
                background:'orange',
                color:'black',
                opacity:'0.5', 
            },
            height:'100px',
            alignItems:'left',
            marginTop:theme.spacing(5),
            marginBottom:theme.spacing(5),
        },
    }))
    const classes=useStyles();
    const firstbar=props.one;
    const secondbar=props.two;
    const thirdbar=props.three;
    return (
        <Grid container  className={classes.root}>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <Button startIcon={<DevicesOtherIcon/>} className={classes.button} disabled={firstbar}><Typography>Choose Your Device</Typography></Button>
                    <Button startIcon={<TouchAppIcon/>} className={classes.button} disabled={secondbar}><Typography>Select Software</Typography></Button>
                    <Button startIcon={<SystemUpdateIcon/>} className={classes.button} disabled={thirdbar}><Typography>Download</Typography></Button>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default StatusSideBar
