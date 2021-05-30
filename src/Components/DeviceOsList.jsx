import { Grid,makeStyles,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Hidden} from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import React,{useContext} from 'react'
import StatusSideBar from '../Components/StatusSideBar'
import { GlobalContext } from '../Context/GlobalState';
import _ from 'lodash';
import { Link, useHistory } from 'react-router-dom';

function DeviceOsList() {
    const {getfirmwareDetails,deviceimage,resdeviceFirmware} = useContext(GlobalContext);
    const useStyles=makeStyles((theme)=>({
        root:{
            height:'100vh',
        },
        paper:{
            display:'flex',
            height:'100vh',
            width:'fit-content',
            background:'black',
            color:'white',
            textAlign:'center',
            overflowY:'hidden',
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
        table:{
            background:'black',
            color:'white',
            border:'1px solid orange'
        },
        pagecontainer:{
            height:'90vh',
            overflowY:'scroll'
        },
        tablehead:{
            background:'black',
        },
        tableCellHead:{
            color:'white',
            fontSize:'18px',
            fontWeight:'600',
        },
        tableCellBody:{
            color:'white',
            fontSize:'15px',
        },
        tableRowBody:{
            background:'none',
            '&:hover':{
                opacity:'0.5',
            },
        },
        signedIcon:{
            color:'green',
        },
        unsignedIcon:{
            color:'red',
        },
        note:{
            display:'flex',
            marginTop:theme.spacing(2),
        },
        link:{
            color:'orange'
        }
    }))
    // const firmwarelist=getFirmwarelist();
    const dimage=deviceimage;
    const classes=useStyles();
    const tableHeadList=[
        {
            name:'Signed'
        },
        {
            name:'Version Number',
        },
        {
           name:'Build Number',
        },
        {
            name:'Released Date',
        },
        {
            name:'OS Size',
        },
        {
            name:'Version Information',
        }
    ];
    const notelist=[
        {
            icon:<CheckCircleOutlineIcon style={{color:'green'}}/>,
            message:'or Signed means this version in signed by Apple Inc and can be used for restoring your device',
        },
        {
            icon:<CloseIcon style={{color:'red'}}/>,
            message:'or UnSigned means this version in not signed by Apple Inc and cannot be used for restoring your device',
        },
    ];
    const history=useHistory();
    function handleLinkClick(item){
        const buildid=item;
        getfirmwareDetails(_.get(resdeviceFirmware,'identifier'),buildid);
        history.push('/download');
    }
    const dateformat=(releasedate)=>{
        if(releasedate===null){
            let msg='NOT AVAILABLE'
            return msg;
        }
        const res=(releasedate).slice(0,10);
        return res;
    }
    const sizefromat=(size)=>{
        const res=((size)/(1e+9)).toFixed(2)+' GB'
        return res;
    };
    return (
        <Grid container  className={classes.root}>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                <Hidden xsDown>
                <Grid item xs={3}>
               <StatusSideBar one={false} two={true} three={true}/>
               </Grid>
               </Hidden>
                   <Grid item xs={9}>
                        <Grid item xs={12} className={classes.heading}>
                            <Typography className={classes.headingtext}>Choose OS Version</Typography>
                        </Grid>
                    <Grid item xs={12} className={classes.pagecontainer}>
                    <Grid item xs={12}>
                        <img src={dimage} alt='device'/>
                        <Typography>Device Name:{_.get(resdeviceFirmware,'name')}</Typography>
                        <Typography>Device Identifier:{_.get(resdeviceFirmware,'identifier')}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid xs={12} className={classes.heading}>
                        <Typography className={classes.headingtext}>Signed Versions:</Typography>
                        </Grid>
                        <TableContainer>
                            <Table>
                                <TableHead className={classes.tablehead}>
                                    <TableRow>
                                        {tableHeadList.map((list)=>
                                             <TableCell className={classes.tableCellHead}>{list.name}</TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                        {resdeviceFirmware.firmwares&&resdeviceFirmware.firmwares.filter(item=>item.signed===true).map((list)=>
                        <TableRow className={classes.tableRowBody} onClick={handleLinkClick.bind(this,list.buildid)}>
                        <TableCell className={classes.tableCellBody}>{list.signed===true?<Typography className={classes.signedIcon}><CheckCircleOutlineIcon/></Typography>:<Typography className={classes.unsignedIcon}><CloseIcon/></Typography>}</TableCell>
                        <TableCell className={classes.tableCellBody}>{list.version}</TableCell>
                        <TableCell className={classes.tableCellBody}>{list.buildid}</TableCell>
                        <TableCell className={classes.tableCellBody}>{dateformat(list.releasedate)}</TableCell>
                        <TableCell className={classes.tableCellBody}>{sizefromat(list.filesize)}</TableCell>
                        <TableCell className={classes.tableCellBody} ><Link className={classes.link} >Click Here</Link></TableCell>
                        </TableRow>
                        )}
                        </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid xs={12} className={classes.heading}>
                        <Typography className={classes.headingtext}>Unsigned Versions:</Typography>
                        </Grid>
                        <TableContainer>
                            <Table>
                                <TableHead className={classes.tablehead}>
                                    <TableRow>
                                        {tableHeadList.map((list)=>
                                             <TableCell className={classes.tableCellHead}>{list.name}</TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                        {resdeviceFirmware.firmwares&&resdeviceFirmware.firmwares.filter(item=>item.signed===false).map((list)=>
                        <TableRow className={classes.tableRowBody} onClick={handleLinkClick.bind(this,list.buildid)}>
                        <TableCell className={classes.tableCellBody}>{list.signed===true?<Typography className={classes.signedIcon}><CheckCircleOutlineIcon/></Typography>:<Typography className={classes.unsignedIcon}><CloseIcon/></Typography>}</TableCell>
                        <TableCell className={classes.tableCellBody}>{list.version}</TableCell>
                        <TableCell className={classes.tableCellBody}>{list.buildid}</TableCell>
                        <TableCell className={classes.tableCellBody}>{dateformat(list.releasedate)}</TableCell>
                        <TableCell className={classes.tableCellBody}>{sizefromat(list.filesize)}</TableCell>
                        <TableCell className={classes.tableCellBody} ><Link className={classes.link} >Click Here</Link></TableCell>
                        </TableRow>
                        )}
                        </TableBody>
                            </Table>
                        </TableContainer>
                        {notelist.map((list)=>
                        <Grid item xs={12} className={classes.note}>
                                <Typography>{list.icon}</Typography>
                                <Typography>{list.message}</Typography>
                        </Grid>
                        )}
                    </Grid>
                   </Grid>
                   </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default DeviceOsList
