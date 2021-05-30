import { Grid, makeStyles, Paper, Typography,Hidden } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Header() {
    const [greeting,setGreeting]=useState();
    const useStyles=makeStyles((theme)=>({
        root:{
            height:theme.spacing(6),
            overflow:'hidden'
        },
        paper:{
            height:'90%',
            display:'flex',
            alignContent:'center',
            background:'black',
            justifyContent:'space-between',
            border:'1px solid grey',
        },
        link:{
            textDecoration:"none",
            color:'orange',
            padding:theme.spacing(1),
            marginRight:'20px',
        },
        greeting:{
            color:'white',
            padding:theme.spacing(1),
        }
    }))
    const classes=useStyles();
    const getapm=(x)=>{
        if(x>12){
            return 'PM';
        }
        else{
            return 'AM';
        }
    }
    const gettime=(x,y,z)=>{
        if(x>12){
            x=x-12;
        }
        if(x<10){
            x='0'+x;
        }
        if(y<10){
            y='0'+y;
        }
        if(z<10){
            z='0'+z;
        }
        return x+':'+y+':'+z;
    }
    const getmsg=(y)=>{
        if(y>=4&&y<12){
            return 'Good Morning';
        }else if(y>=12&&y<16){
            return 'Good Afternoon';
        }else if(y>=16&&y<20){
            return 'Good Evening';
        }else {
            return 'Good Night';
        }
    }
    const greetmsg=()=>{
        const today=new Date();
        const x= today.getHours();
        const y=today.getMinutes();
        const z=today.getSeconds();
        const msg=getmsg(x);
        const clockformat=gettime(x,y,z);
        const apm=getapm(x);
        const time=clockformat;
        const result=msg+','+time+' '+apm;
        setGreeting(result); 
    }
    setInterval(greetmsg,1000);
    return (
        <Grid container  className={classes.root}>
            <Grid item xs={12}>
               <Paper className={classes.paper} square>
                  <Link to='/' className={classes.link}><Typography variant='h5'> Software Downloader</Typography></Link>
                  <Hidden xsDown>
                  <Typography variant='h6' className={classes.greeting}>{greeting}</Typography>
                  </Hidden>
               </Paper>
            </Grid>
        </Grid>
    )
}

export default Header
