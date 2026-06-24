import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import Reducer from './Reducer';

const savedDark = localStorage.getItem('darkMode');
const savedResdeviceFirmware = localStorage.getItem('resdeviceFirmware');
const savedFirmwareResponse = localStorage.getItem('firmwareResponse');
const savedDeviceImage = localStorage.getItem('deviceimage');

const initialState = {
    darkMode: savedDark !== null ? JSON.parse(savedDark) : true,
    deviceList: [],
    deviceListLoading: false,
    resdeviceFirmware: savedResdeviceFirmware ? JSON.parse(savedResdeviceFirmware) : [],
    firmwareResponse: savedFirmwareResponse ? JSON.parse(savedFirmwareResponse) : [],
    deviceimage: savedDeviceImage ? JSON.parse(savedDeviceImage) : null,
};

export const GlobalContext = createContext(initialState);

const DEVICE_PREFIXES = {
    iPhone: ['iPhone'],
    iPad: ['iPad'],
    Mac: ['Mac', 'iMac', 'ADP'],
};

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    function toggleDarkMode() {
        dispatch({ type: 'TOGGLE_DARK_MODE' });
    }

    async function getAllDevices(type) {
        dispatch({ type: 'DEVICE_LIST_LOADING' });
        try {
            const res = await axios.get('https://api.ipsw.me/v4/devices?type=ipsw');
            const prefixes = DEVICE_PREFIXES[type] || [];
            const filtered = res.data
                .filter(device => prefixes.some(p => device.identifier.startsWith(p)))
                .sort((a, b) => {
                    const getMajor = id => {
                        const m = id.match(/(\d+),/);
                        return m ? parseInt(m[1]) : 0;
                    };
                    return getMajor(b.identifier) - getMajor(a.identifier);
                });
            dispatch({ type: 'GET_ALL_DEVICES', payload: filtered });
        } catch (err) {
            dispatch({ type: 'GET_ALL_DEVICES', payload: [] });
        }
    }

    async function getdeviceFirmware(deviceid) {
        try {
            const res = await axios.post(`https://api.ipsw.me/v4/device/${deviceid}?type=ipsw`);
            dispatch({ type: 'GET_FIRMWARE_FOR_DEVICE', payload: res.data });
        } catch (err) {
            dispatch({ type: 'GET_FIRMWARE_FOR_DEVICE_ERR', payload: err.response });
        }
    }

    function setdeviceImage(modelImage) {
        dispatch({ type: 'DEVICE_IMG', payload: modelImage });
    }

    async function getfirmwareDetails(identifier, buildid) {
        try {
            const res = await axios.get(`https://api.ipsw.me/v4/ipsw/${identifier}/${buildid}`);
            dispatch({ type: 'GET_FIRMWARE_DETAILS', payload: res.data });
        } catch (err) {
            dispatch({ type: 'GET_FIRMWARE_FOR_DEVICE_ERR', payload: err.response });
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                darkMode: state.darkMode,
                toggleDarkMode,
                deviceList: state.deviceList,
                deviceListLoading: state.deviceListLoading,
                resdeviceFirmware: state.resdeviceFirmware,
                firmwareResponse: state.firmwareResponse,
                deviceimage: state.deviceimage,
                getAllDevices,
                getdeviceFirmware,
                getfirmwareDetails,
                setdeviceImage,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
