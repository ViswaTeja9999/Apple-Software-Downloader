import { Grid, makeStyles, Typography, Switch } from '@material-ui/core';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalState';

function Header() {
    const { darkMode, toggleDarkMode } = useContext(GlobalContext);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            let h = now.getHours();
            const m = now.getMinutes();
            const s = now.getSeconds();
            const apm = h >= 12 ? 'PM' : 'AM';
            let msg = h >= 4 && h < 12 ? 'Good Morning'
                : h >= 12 && h < 16 ? 'Good Afternoon'
                : h >= 16 && h < 20 ? 'Good Evening'
                : 'Good Night';
            if (h > 12) h -= 12;
            const pad = n => String(n).padStart(2, '0');
            setGreeting(`${msg}, ${pad(h)}:${pad(m)}:${pad(s)} ${apm}`);
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const glassStyle = {
        background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.45)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.7)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
    };

    const useStyles = makeStyles(() => ({
        root: { height: '52px' },
        bar: {
            ...glassStyle,
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
        },
        link: {
            textDecoration: 'none',
            color: darkMode ? '#ffffff' : '#1c1c1e',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        logo: {
            fontSize: '22px',
            fontWeight: '600',
            letterSpacing: '-0.3px',
        },
        apple: { color: '#0071e3' },
        right: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
        },
        greeting: {
            color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)',
            fontSize: '13px',
        },
        modeIcon: {
            color: darkMode ? '#f5c518' : '#0071e3',
            fontSize: '18px',
        },
    }));
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <div className={classes.bar}>
                    <Link to='/' className={classes.link}>
                        <Typography className={`${classes.logo} ${classes.apple}`}></Typography>
                        <Typography className={classes.logo}> Software Downloader</Typography>
                    </Link>
                    <div className={classes.right}>
                        <Typography className={classes.greeting}>{greeting}</Typography>
                        {darkMode
                            ? <Brightness2Icon className={classes.modeIcon} />
                            : <WbSunnyIcon className={classes.modeIcon} />
                        }
                        <Switch
                            checked={!darkMode}
                            onChange={toggleDarkMode}
                            color="primary"
                            size="small"
                        />
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}

export default Header;
