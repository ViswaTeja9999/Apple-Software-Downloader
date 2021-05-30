import React,{createContext,useReducer} from 'react';
import axios from 'axios';
import Reducer from './Reducer';

const initialState={
    resdeviceFirmware:[],
    firmwareResponse:[],
    deviceimage:null,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider=({children})=>{
    const [state, dispatch] = useReducer(Reducer, initialState);
    // const getFirmwarelist=()=>{
    //   const res=localStorage.getItem('oslist');
    //   return JSON.parse(res);
    // }
    // const getdeviceImage=()=>{
    //   const res=localStorage.getItem('deviceimage');
    //   return JSON.parse(res);
    // }
    // const getFirmwareDetails=()=>{
    //   const res=localStorage.getItem('firmwaredetails');
    //   return JSON.parse(res);
    // }
    async function getdeviceFirmware(deviceid){
      try {
        const res=await axios.post(`https://api.ipsw.me/v4/device/${deviceid}?type=ipsw`);
        dispatch({
          type: 'GET_FIRMWARE_FOR_DEVICE',
          payload: res.data,
        });
      } catch(err){
        dispatch({
          type: 'GET_FIRMWARE_FOR_DEVICE_ERR',
          payload: err.response,
        });
      }
    }

    async function setdeviceImage(modelImage){
      const res=modelImage;
      dispatch({
        type: 'DEVICE_IMG',
        payload: res,
      });
    }
    
    async function getfirmwareDetails(identifier,buildid){
        try {
          const res=await axios.get(`https://api.ipsw.me/v4/ipsw/${identifier}/${buildid}`);
          console.log(buildid);
          dispatch({
            type: 'GET_FIRMWARE_DETAILS',
            payload: res.data,
          });
        } catch(err){
          dispatch({
            type: 'GET_FIRMWARE_FOR_DEVICE_ERR',
            payload: err.response,
          });
        }
    }
    return (
        <GlobalContext.Provider
          value={{
            resdeviceFirmware:state.resdeviceFirmware,
            firmwareResponse:state.firmwareResponse,
            deviceimage:state.deviceimage,
            getdeviceFirmware,
            getfirmwareDetails,
            // getdeviceImage,
            // getFirmwareDetails,
            setdeviceImage,
            // getFirmwarelist,
          }}
        >
          {children}
        </GlobalContext.Provider>
      );
}
