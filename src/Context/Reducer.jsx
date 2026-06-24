export default function Reducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_DARK_MODE':
            localStorage.setItem('darkMode', JSON.stringify(!state.darkMode));
            return { ...state, darkMode: !state.darkMode };
        case 'DEVICE_LIST_LOADING':
            return { ...state, deviceListLoading: true };
        case 'GET_ALL_DEVICES':
            return { ...state, deviceList: action.payload, deviceListLoading: false };
        case 'GET_FIRMWARE_FOR_DEVICE':
            localStorage.setItem('resdeviceFirmware', JSON.stringify(action.payload));
            return { ...state, resdeviceFirmware: action.payload };
        case 'DEVICE_IMG':
            localStorage.setItem('deviceimage', JSON.stringify(action.payload));
            return { ...state, deviceimage: action.payload };
        case 'GET_FIRMWARE_DETAILS':
            localStorage.setItem('firmwareResponse', JSON.stringify(action.payload));
            return { ...state, firmwareResponse: action.payload };
        default:
            return state;
    }
}
