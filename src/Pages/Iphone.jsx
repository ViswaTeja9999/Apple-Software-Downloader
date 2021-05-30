import { Grid,makeStyles,Paper,Typography, Select,MenuItem,Hidden} from '@material-ui/core'
import React, {useState} from 'react'
import DeviceList from '../Components/DeviceList';
import StatusSideBar from '../Components/StatusSideBar'
import phonelist from '../Data/DataiPhones';

function Iphone() {

    const useStyles=makeStyles((theme)=>({
        root:{
            height:'100vh',
        },
        paper:{
            display:'flex',
            flexWrap:'wrap',
            width:'fit-content',
            height:'100vh',
            background:'black',
            color:'white',
            textAlign:'center',
            overflowY:'hidden',
        },
        devicecontainer:{
            height:'90vh',
            overflowY:'scroll',
        },
        heading:{
            borderBottom:'1px solid black',
            background:'orange',
            display:'flex',
            justifyContent:'space-between',
        },
        headingtext:{
            fontWeight:'600px',
            fontSize:'20px',
            color:'black',
            marginRight:'10px',
        },
        listview:{
           display:'flex',
           flexWrap:'wrap',
           margin:theme.spacing(5),
        },
        deviceitem:{
            margin:theme.spacing(5),
            padding:theme.spacing(2),
        },
    }))
    const classes=useStyles();
    const [filterSelected,setFilterSelected]=useState(false);
    const [filterYear,setFilterYear]=useState();
    const handlefilterChange=(e)=>{
        if(e.target.value==='all'){
            setFilterSelected(false);
            e.preventDefault()
        }
        else{
            setFilterSelected(true);
            e.preventDefault()
        }
        setFilterYear(e.target.value);
        e.preventDefault()
        }
    return (
        <Grid container xs={12} className={classes.root}>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                <Hidden xsDown>
                <Grid item xs={3}>
               <StatusSideBar one={false} two={true} three={true}/>
               </Grid>
               </Hidden>
                   <Grid item xs={9}>
                        <Grid item xs={12} className={classes.heading}>
                            <Grid item>
                            <Typography className={classes.headingtext}>Choose Your Device</Typography>
                            </Grid>
                            <Grid item className={classes.heading}>
                                <Typography className={classes.headingtext}>Filter by Year:</Typography>
                            <Select value={filterYear} onChange={handlefilterChange} defaultValue='all'>
                                <MenuItem value='all'>All Models</MenuItem>
                                {phonelist.map((list)=>
                                <MenuItem value={list.releaseyear}>{list.releaseyear}</MenuItem>
                                )}
                            </Select>
                            </Grid>
                        </Grid>
                        <Grid xs={12} className={classes.devicecontainer}>
                            {phonelist.filter(!filterSelected?year=>year.releaseyear:year=>year.releaseyear===filterYear).map((item)=>
                                 <Grid item xs={12}>
                                    <Grid item xs={12} className={classes.heading}>
                                        <Typography className={classes.headingtext}>{item.releaseyear}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={classes.listview}>
                                            {item.devices.map((items)=>
                                             <Grid item xs={3} className={classes.deviceitem}>
                                                          <DeviceList
                                                           modelname={items.modelname}
                                                           modelnumber={items.modelnumber}
                                                           modelimage={items.modelimage}
                                                           />
                                            </Grid>
                                            )}
                                        </Grid>
                                    </Grid>
                                )}
                         </Grid>
                   </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Iphone
