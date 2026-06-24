import { Grid, makeStyles, Typography, TextField, CircularProgress, Select, MenuItem, Breadcrumbs } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import DeviceList from '../Components/DeviceList';
import { GlobalContext } from '../Context/GlobalState';
import deviceImageMap from '../Data/deviceImageMap';

function DevicePage({ deviceType }) {
    const { darkMode, deviceList, deviceListLoading, getAllDevices } = useContext(GlobalContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState('all');

    useEffect(() => {
        getAllDevices(deviceType);
        setSelectedYear('all');
        setSearchQuery('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deviceType]);

    const devicePath = deviceType === 'Mac' ? '/mac' : `/${deviceType}`;

    const getYear = (identifier) => deviceImageMap[identifier]?.year || null;

    const searchFiltered = deviceList.filter(device =>
        device.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const allYears = [...new Set(
        deviceList.map(d => getYear(d.identifier)).filter(Boolean)
    )].sort((a, b) => b - a);

    const displayDevices = searchFiltered.filter(d => {
        if (selectedYear === 'all') return true;
        return getYear(d.identifier) === selectedYear;
    });

    const grouped = {};
    displayDevices.forEach(d => {
        const yr = getYear(d.identifier) || 'Other';
        if (!grouped[yr]) grouped[yr] = [];
        grouped[yr].push(d);
    });
    const groupKeys = Object.keys(grouped).sort((a, b) => {
        if (a === 'Other') return 1;
        if (b === 'Other') return -1;
        return b - a;
    });

    const useStyles = makeStyles((theme) => ({
        root: { minHeight: 'calc(100vh - 88px)' },
        main: { display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 88px)' },
        heading: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: theme.spacing(1.5, 2, 1),
            background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.45)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.65)',
            gap: theme.spacing(1),
        },
        headingLeft: {
            display: 'flex',
            flexDirection: 'column',
        },
        headingtext: {
            fontWeight: 600,
            fontSize: '16px',
            color: darkMode ? '#ffffff' : '#1c1c1e',
            flexShrink: 0,
        },
        breadcrumbs: {
            marginTop: '4px',
            '& .MuiBreadcrumbs-separator': {
                color: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            },
        },
        bcLink: {
            fontSize: '14px',
            color: '#0071e3',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
        },
        bcCurrent: {
            fontSize: '14px',
            color: darkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)',
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing(1),
            flexShrink: 0,
        },
        yearSelect: {
            background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.7)',
            borderRadius: '8px',
            color: darkMode ? '#ffffff' : '#1c1c1e',
            fontSize: '13px',
            height: '40px',
            '& .MuiSelect-select': {
                padding: '8px 32px 8px 12px',
                fontSize: '13px',
                color: darkMode ? '#ffffff' : '#1c1c1e',
            },
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '& .MuiSvgIcon-root': { color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' },
        },
        searchInput: {
            background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.7)',
            borderRadius: '8px',
            '& input': { color: darkMode ? '#ffffff' : '#1c1c1e', fontSize: '13px' },
            '& fieldset': { border: 'none' },
        },
        devicecontainer: {
            flex: 1,
            overflowY: 'auto',
            padding: theme.spacing(2),
        },
        yearSection: {
            marginBottom: theme.spacing(1),
        },
        yearLabel: {
            display: 'inline-flex',
            alignItems: 'center',
            padding: theme.spacing(0.4, 2),
            marginBottom: theme.spacing(1.5),
            marginLeft: theme.spacing(1.5),
            background: darkMode ? 'rgba(0,113,227,0.18)' : 'rgba(0,113,227,0.1)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: '20px',
            border: '1px solid rgba(0,113,227,0.3)',
            color: '#0071e3',
            fontWeight: 700,
            fontSize: '14px',
            letterSpacing: '0.3px',
        },
        listview: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        loader: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
        },
        noResults: {
            color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
            margin: theme.spacing(4),
        },
    }));
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <div className={classes.main}>
                    <div className={classes.heading}>
                        <div className={classes.headingLeft}>
                            <Typography className={classes.headingtext}>Choose Your {deviceType}</Typography>
                            <Breadcrumbs separator="›" className={classes.breadcrumbs}>
                                <Link to="/" className={classes.bcLink}>Home</Link>
                                <span className={classes.bcCurrent}>{deviceType}</span>
                            </Breadcrumbs>
                        </div>
                        <div className={classes.controls}>
                            <Select
                                value={selectedYear}
                                onChange={e => setSelectedYear(e.target.value)}
                                variant="outlined"
                                className={classes.yearSelect}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            background: darkMode ? 'rgba(30,30,50,0.95)' : 'rgba(255,255,255,0.97)',
                                            backdropFilter: 'blur(20px)',
                                            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                                            borderRadius: '10px',
                                            color: darkMode ? '#fff' : '#1c1c1e',
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="all" style={{ fontSize: '13px' }}>All Years</MenuItem>
                                {allYears.map(yr => (
                                    <MenuItem key={yr} value={yr} style={{ fontSize: '13px' }}>{yr}</MenuItem>
                                ))}
                            </Select>
                            <TextField
                                placeholder={`Search ${deviceType}...`}
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                variant="outlined"
                                size="small"
                                className={classes.searchInput}
                            />
                        </div>
                    </div>

                    <div className={classes.devicecontainer}>
                        {deviceListLoading ? (
                            <div className={classes.loader}>
                                <CircularProgress style={{ color: '#0071e3' }} />
                            </div>
                        ) : displayDevices.length === 0 ? (
                            <Typography className={classes.noResults}>No devices found</Typography>
                        ) : selectedYear !== 'all' ? (
                            <div className={classes.listview}>
                                {displayDevices.map(device => (
                                    <Grid item xs={6} sm={4} md={3} key={device.identifier}>
                                        <DeviceList
                                            modelname={device.name}
                                            modelnumber={device.identifier}
                                            deviceType={deviceType}
                                        />
                                    </Grid>
                                ))}
                            </div>
                        ) : (
                            groupKeys.map(yr => (
                                <div key={yr} className={classes.yearSection}>
                                    <div className={classes.yearLabel}>{yr}</div>
                                    <div className={classes.listview}>
                                        {grouped[yr].map(device => (
                                            <Grid item xs={6} sm={4} md={3} key={device.identifier}>
                                                <DeviceList
                                                    modelname={device.name}
                                                    modelnumber={device.identifier}
                                                    deviceType={deviceType}
                                                />
                                            </Grid>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}

export default DevicePage;
