import {
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Button,
  Hidden
} from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import GetAppIcon from '@material-ui/icons/GetApp';
import CloseIcon from "@material-ui/icons/Close";
import React, { useContext, useEffect } from "react";
import StatusSideBar from "../Components/StatusSideBar";
import { GlobalContext } from "../Context/GlobalState";
import _ from "lodash";

function DownloadOs() {
  const { deviceimage,firmwareResponse,resdeviceFirmware} = useContext(GlobalContext);
  // const deviceimage=setdeviceImage();
  // const firmwarelist=getFirmwarelist();
  // const firmwaredetails=getFirmwareDetails();
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
    paper: {
      display: "flex",
      height: "100vh",
      width:'fit-content',
      background: "black",
      color: "white",
      textAlign: "center",
      overflowY: "hidden",
    },
    heading: {
      borderBottom: "1px solid black",
      background: "orange",
      display: "flex",
      justifyContent: "space-between",
    },
    headingtext: {
      fontWeight: "600px",
      fontSize: "20px",
      color: "black",
      marginRight: "10px",
    },
    table: {
      background: "black",
      color: "white",
      border: "1px solid orange",
    },
    pagecontainer: {
      height: "90vh",
      overflowY: "scroll",
    },
    tablehead: {
      background: "black",
    },
    tableCellTh: {
      color: "white",
      fontSize: "18px",
      fontWeight: "600",
    },
    tableCellBody: {
      color: "white",
      fontSize: "15px",
    },
    tableRowBody: {
      background: "none",
      "&:hover": {
        opacity: "0.5",
      },
    },
    signedIcon: {
      color: "green",
    },
    unsignedIcon: {
      color: "red",
    },
    note: {
      display: "flex",
      marginTop: theme.spacing(2),
    },
    button: {
      color: "black",
      background:'orange',
      margin:theme.spacing(2),
      '&:hover':{
          background:'orange',
          color:'white',
      }
    },
    notes:{
        margin:theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const tableThList = [
    {
      name: "Signed",
    },
    {
      name: "Device Name",
    },
    {
        name:'Model Identifier',
    },
    {
        name:'Version Number'
    },
    {
      name: "Build Number",
    },
    {
      name: "Released Date",
    },
    {
      name: "OS Size",
    },
  ];
  const notelist = [
    {
      icon: <CheckCircleOutlineIcon style={{ color: "green" }} />,
      message:
        "means this version in signed by Apple Inc and can be used for restoring your device",
    },
    {
      icon: <CloseIcon style={{ color: "red" }} />,
      message:
        "means this version in not signed by Apple Inc and cannot be used for restoring your device",
    },
  ];
  const dateformat = (releasedate) => {
    if (releasedate === null) {
      let msg = "NOT AVAILABLE";
      return msg;
    }
    let res = releasedate.slice(0, 10);
    return res;
  };
  const sizefromat = (size) => {
    const res = (size / (1e+9)).toFixed(2) + " GB";
    return res;
  };
  useEffect(()=>{

  },[])
  return (
    <Grid container  className={classes.root}>
      <Grid item xs={12}>
        <Paper square className={classes.paper}>
          <Hidden xsDown>
          <Grid item xs={3}>
          <StatusSideBar one={true} two={true} three={false} />
          </Grid>
          </Hidden>
          <Grid item xs={9}>
            <Grid item xs={12} className={classes.heading}>
              <Typography className={classes.headingtext}>
                Version Details
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.pagecontainer}>
              <Grid item xs={12}>
                <img src={deviceimage} alt="device" />
                <Typography>
                  Device Name:{_.get(resdeviceFirmware, "name")}
                </Typography>
                <Typography>
                  Device Identifier:{_.get(resdeviceFirmware, "identifier")}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid xs={12} className={classes.heading}>
                  <Typography className={classes.headingtext}>
                    Version Information:
                  </Typography>
                </Grid>
                <TableContainer>
                  <Table>
                    <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row" className={classes.tableCellTh}>{tableThList[0].name}</TableCell>
                          <TableCell scope='row' className={classes.tableCellBody}>{(_.get(firmwareResponse,'signed'))?'Signed':'Unsigned'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row" className={classes.tableCellTh}>{tableThList[1].name}</TableCell>
                          <TableCell scope='row' className={classes.tableCellBody}>{_.get(resdeviceFirmware, "name")}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row" className={classes.tableCellTh}>{tableThList[2].name}</TableCell>
                          <TableCell scope='row' className={classes.tableCellBody}>{_.get(firmwareResponse,'identifier')}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row" className={classes.tableCellTh}>{tableThList[3].name}</TableCell>
                          <TableCell scope='row' className={classes.tableCellBody}>{_.get(firmwareResponse,'version')}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row" className={classes.tableCellTh}>{tableThList[4].name}</TableCell>
                          <TableCell scope='row' className={classes.tableCellBody}>{_.get(firmwareResponse,'buildid')}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row" className={classes.tableCellTh}>{tableThList[5].name}</TableCell>
                          <TableCell scope='row' className={classes.tableCellBody}>{(_.get(firmwareResponse,'releasedate'))}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row" className={classes.tableCellTh}>{tableThList[6].name}</TableCell>
                          <TableCell scope='row' className={classes.tableCellBody}>{sizefromat(_.get(firmwareResponse,'filesize'))}</TableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid item xs={12}>
                    <Button startIcon={<GetAppIcon/>} href={_.get(firmwareResponse,'url')} className={classes.button}>Download</Button>
                    <Typography className={classes.notes}>If download doesn't start copy the link below in a seperate tab.</Typography>
                     <Typography className={classes.notes}>{_.get(firmwareResponse,'url')}</Typography>
                     <Typography className={classes.notes}>All softwares disturbuted in this website are owned by Apple.Inc .We are just using the Apple's software server link to download the file.</Typography>
                </Grid>
                {notelist.map((list) => (
                  <Grid item xs={12} className={classes.note}>
                    <Typography>{list.icon}</Typography>
                    <Typography>{list.message}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default DownloadOs;
