import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

function StatusSideBar(props) {
    const { darkMode } = useContext(GlobalContext);

    const useStyles = makeStyles((theme) => ({
        root: { height: '100%' },
        sidebar: {
            height: '100%',
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.35)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRight: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.6)',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: theme.spacing(4),
        },
        step: {
            width: '100%',
            justifyContent: 'flex-start',
            padding: theme.spacing(2, 3),
            marginBottom: theme.spacing(1),
            borderRadius: 0,
            color: darkMode ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)',
            background: 'transparent',
            textTransform: 'none',
            '&:disabled': {
                color: darkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
                background: 'transparent',
            },
            '&:not(:disabled)': {
                background: darkMode ? 'rgba(0,113,227,0.15)' : 'rgba(0,113,227,0.1)',
                borderLeft: '3px solid #0071e3',
            },
        },
        label: { fontSize: '13px', fontWeight: 500 },
    }));
    const classes = useStyles();

    const steps = [
        { icon: <DevicesOtherIcon />, label: 'Choose Your Device', disabled: props.one },
        { icon: <TouchAppIcon />, label: 'Select Software', disabled: props.two },
        { icon: <SystemUpdateIcon />, label: 'Download', disabled: props.three },
    ];

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <div className={classes.sidebar}>
                    {steps.map(s => (
                        <Button
                            key={s.label}
                            startIcon={s.icon}
                            className={classes.step}
                            disabled={s.disabled}
                        >
                            <Typography className={classes.label}>{s.label}</Typography>
                        </Button>
                    ))}
                </div>
            </Grid>
        </Grid>
    );
}

export default StatusSideBar;
