import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

function Footer() {
    const { darkMode } = useContext(GlobalContext);

    const useStyles = makeStyles(() => ({
        root: { height: '36px' },
        bar: {
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.65)',
        },
        text: {
            fontSize: '12px',
            color: darkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)',
        },
    }));
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <div className={classes.bar}>
                    <Typography className={classes.text}>Copyright © Viswa Teja — All software owned by Apple Inc.</Typography>
                </div>
            </Grid>
        </Grid>
    );
}

export default Footer;
