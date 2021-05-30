export default function Reducer (state, action)  {
    switch (action.type) {
      
        case 'GET_FIRMWARE_FOR_DEVICE':
            return{
                ...state,
                resdeviceFirmware:action.payload,
            }
            case 'DEVICE_IMG':
                localStorage.setItem('deviceimage',JSON.stringify(action.payload));
            return{
                ...state,
                deviceimage:action.payload,
            }
            case 'GET_FIRMWARE_DETAILS':
                return{
                    ...state,
                firmwareResponse:action.payload,
                }
  
      default:
        return state;
    }
  };
  