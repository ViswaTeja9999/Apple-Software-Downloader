import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './Pages/Home';
import Iphone from './Pages/Iphone';
import Mac from './Pages/Mac';
import Ipad from './Pages/Ipad';
import Header from './Components/Header';
import Footer from './Components/Footer';
import DeviceOsList from './Components/DeviceOsList';
import { GlobalProvider } from './Context/GlobalState';
import DownloadOs from './Components/DownloadOs';
import { Grid, makeStyles,Paper} from '@material-ui/core';

function App() {
  const useStyles=makeStyles((theme)=>({
    root:{
      height:'100vh',
    },
    paper:{
      background:'black',
      height:'100vh',
      overflowY:'hidden',
      color:'white',
    },
    viewcontainer:{
      height:'90vh',
      overflowY:'scroll',
    },
  }))
  const classes=useStyles();
  return (
    <GlobalProvider>
    <Router>
    <Grid container xs={12} >
    <Grid item xs={12} className={classes.root}>
      <Paper square className={classes.paper}>
      <Header/>
      <Grid item xs={12} className={classes.viewcontainer}>
      <Switch>
        <Route path='/download' component={DownloadOs}/>
        <Route path='/oslist' component={DeviceOsList}/>
        <Route path='/iPad' component={Ipad}/>
        <Route path='/mac' component={Mac}/>
        <Route path='/iPhone' component={Iphone}/>
        <Route path='/' component={Home}/> 
      </Switch>
      </Grid>
      <Footer/>
      </Paper>
    </Grid>
    </Grid>
    </Router>
    </GlobalProvider>
  );
}

export default App;
