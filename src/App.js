import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import DevicePage from './Pages/DevicePage';
import Header from './Components/Header';
import Footer from './Components/Footer';
import DeviceOsList from './Components/DeviceOsList';
import { GlobalProvider, GlobalContext } from './Context/GlobalState';
import DownloadOs from './Components/DownloadOs';
import { Grid, makeStyles, createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import React, { useContext } from 'react';

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: { main: '#0071e3' },
        background: { default: '#0d0d1a', paper: 'rgba(255,255,255,0.07)' },
        text: { primary: '#ffffff', secondary: 'rgba(255,255,255,0.6)' },
    },
});

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: { main: '#0071e3' },
        background: { default: '#dce4f0', paper: 'rgba(255,255,255,0.55)' },
        text: { primary: '#1c1c1e', secondary: 'rgba(0,0,0,0.55)' },
    },
});

function AppContent() {
    const { darkMode } = useContext(GlobalContext);
    const theme = darkMode ? darkTheme : lightTheme;

    const bgGradient = darkMode
        ? 'linear-gradient(135deg, #0d0d1a 0%, #1a1a3e 50%, #0a1628 100%)'
        : 'linear-gradient(135deg, #c8d8f0 0%, #dce8ff 50%, #ccd8ee 100%)';

    const useStyles = makeStyles(() => ({
        root: {
            minHeight: '100vh',
            background: bgGradient,
            position: 'relative',
            overflow: 'hidden',
        },
        blob1: {
            position: 'fixed',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: darkMode ? 'rgba(0,113,227,0.25)' : 'rgba(0,113,227,0.15)',
            filter: 'blur(100px)',
            top: '-100px',
            left: '-100px',
            pointerEvents: 'none',
            zIndex: 0,
        },
        blob2: {
            position: 'fixed',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: darkMode ? 'rgba(120,40,200,0.2)' : 'rgba(100,60,200,0.1)',
            filter: 'blur(80px)',
            bottom: '0px',
            right: '-50px',
            pointerEvents: 'none',
            zIndex: 0,
        },
        content: {
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        },
        viewcontainer: {
            flex: 1,
            overflowY: 'auto',
        },
    }));
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <div className={classes.root}>
                    <div className={classes.blob1} />
                    <div className={classes.blob2} />
                    <Grid container direction="column" className={classes.content}>
                        <Header />
                        <Grid item xs={12} className={classes.viewcontainer}>
                            <Switch>
                                <Route path='/download' component={DownloadOs} />
                                <Route path='/oslist' component={DeviceOsList} />
                                <Route path='/iPad' render={() => <DevicePage deviceType="iPad" />} />
                                <Route path='/mac' render={() => <DevicePage deviceType="Mac" />} />
                                <Route path='/iPhone' render={() => <DevicePage deviceType="iPhone" />} />
                                <Route path='/' component={Home} />
                            </Switch>
                        </Grid>
                        <Footer />
                    </Grid>
                </div>
            </Router>
        </ThemeProvider>
    );
}

function App() {
    return (
        <GlobalProvider>
            <AppContent />
        </GlobalProvider>
    );
}

export default App;
