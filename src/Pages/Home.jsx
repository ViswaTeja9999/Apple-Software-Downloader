import React from 'react'
import {Grid, makeStyles, Paper, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';

function Home() {
    const useStyles=makeStyles((theme)=>({
        homecontainer:{
            height:'100%',
            textAlign:'center',
            alignContent:'center',
            padding:theme.spacing(3),
        },
        title:{
            margin:theme.spacing(5),
        },
        titlepaper:{
            padding:theme.spacing(4),
            background:'linear-gradient(45deg, #FF512F, #F09819)',
            borderRadius:'15px',
        },
        itemscontainer:{
            width:'100%',
            display:'flex',
            flexWrap:'wrap',
            justifyContent:'space-around',
        },
        itemcontainer:{
           margin:theme.spacing(4),
           minHeight:'200px',
           minWidth:'200px',
        },
        itempaper:{
            borderRadius:'15px',
            height:'100%',
            width:'100%',
            background:'linear-gradient(45deg,#1FA2FF,#12D8FA,#A6FFCB)',
            '&:hover':{
                opacity:'0.5',
            },
            padding:theme.spacing(2)
        },
        link:{
            textDecoration:"none",
            color:'black',
        },
        titles:{
            fontWeight:'550',
        },
        img:{
            marginTop:'15px',
            maxWidth:'100%',
            height:'auto'
        }
    }))
    const items=[
        {
            path:'/iPhone',
            cardtitle:'iPhone',
            description:'Click here to download iOS firmware for iPhone',
            itemimg:'assets/iPhones/iPhone13,4.png'
        },
        {
            path:'/iPad',
            cardtitle:'iPad',
            description:'Click here to download iPadOS firmware for iPad',
            itemimg:'assets/iPads/iPad13,8.png'
        },
        {
            path:'/mac',
            cardtitle:'Macs',
            description:'Click here to download macOS firmware for Mac with M1',
            itemimg:'assets/Macs/MacBookPro17,1.png'
        },
    ];
    const classes=useStyles();
    return (
        <Grid container >
            <Grid item xs={12} className={classes.homecontainer}>
           <Grid item xs={12} className={classes.title}>
              <Paper className={classes.titlepaper}>
                  <Typography variant='h3'> Software Downloader</Typography>
                  <Typography variant='h6'>Download iOS,macOS and iPadOS</Typography>
              </Paper>
           </Grid>
           <Grid item xs={12}>
                  <Typography>Choose a Product</Typography>
           </Grid>
           <Grid item xs={12} className={classes.itemscontainer}>
               {items&&items.map((list)=>{
                   return(
                    <Grid item xs={3} className={classes.itemcontainer}>
                    <Link to={list.path} className={classes.link}>
                    <Paper className={classes.itempaper}>
                    <Typography variant='h4' className={classes.titles}>{list.cardtitle}</Typography>
                    <Typography variant='body1'>{list.description}</Typography>
                    <img src={list.itemimg} alt='img'className={classes.img}/>
                    </Paper>
                    </Link>
                    </Grid>
                   )
               })}
           </Grid>
           </Grid>
        </Grid>
    )
}

export default Home
