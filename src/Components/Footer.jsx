import { Grid, makeStyles, Paper,Typography } from '@material-ui/core'
import React from 'react'

function Footer() {
    const useStyles=makeStyles((theme)=>({
        root:{
            height:'15px',
        },
        paper:{
            textAlign:'center',
            alignContent:'center',
            height:'100%',
            color:'black',
            background:'orange',
        },
    }))
    const classes=useStyles();
    return (
        <Grid container  className={classes.root}>
            <Grid item xs={12}>
               <Paper elevation={3} square className={classes.paper}>
                  <Typography>Copyright © by Viswa Teja</Typography>
               </Paper>
            </Grid>
        </Grid>
    )
}

export default Footer
