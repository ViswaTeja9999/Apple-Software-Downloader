import { makeStyles, Typography } from '@material-ui/core';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import { GlobalContext } from '../Context/GlobalState';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import deviceImageMap from '../Data/deviceImageMap';

const CATEGORY_ICONS = {
    iPhone: PhoneIphoneIcon,
    iPad: TabletMacIcon,
    Mac: LaptopMacIcon,
};

function DeviceList({ modelname, modelnumber, deviceType }) {
    const { darkMode, getdeviceFirmware, setdeviceImage } = useContext(GlobalContext);
    const history = useHistory();
    const [imgFailed, setImgFailed] = useState(false);

    const entry = deviceImageMap[modelnumber];
    const imageUrl = entry?.image;
    const showImage = imageUrl && !imgFailed;

    const useStyles = makeStyles((theme) => ({
        card: {
            margin: theme.spacing(1.5),
            padding: theme.spacing(2.5, 2),
            background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            borderRadius: '16px',
            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.7)',
            boxShadow: darkMode
                ? '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)'
                : '0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: darkMode
                    ? '0 8px 30px rgba(0,113,227,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                    : '0 8px 30px rgba(0,113,227,0.12), inset 0 1px 0 rgba(255,255,255,0.95)',
            },
        },
        link: { textDecoration: 'none', display: 'block' },
        imgWrap: {
            height: '130px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        },
        img: {
            maxHeight: '120px',
            maxWidth: '150px',
            objectFit: 'contain',
        },
        icon: {
            fontSize: '72px',
            color: '#0071e3',
            opacity: 0.85,
        },
        name: {
            fontSize: '13px',
            fontWeight: 500,
            color: darkMode ? '#ffffff' : '#1c1c1e',
            marginTop: theme.spacing(0.5),
        },
        identifier: {
            fontSize: '11px',
            color: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
        },
    }));
    const classes = useStyles();

    const DeviceIcon = CATEGORY_ICONS[deviceType] || PhoneIphoneIcon;

    const handleClick = (e) => {
        e.preventDefault();
        getdeviceFirmware(modelnumber);
        setdeviceImage(imageUrl || null);
        history.push('/oslist');
    };

    return (
        <Link onClick={handleClick} className={classes.link}>
            <div className={classes.card}>
                <div className={classes.imgWrap}>
                    {showImage ? (
                        <img
                            src={imageUrl}
                            alt={modelname}
                            className={classes.img}
                            onError={() => setImgFailed(true)}
                        />
                    ) : (
                        <DeviceIcon className={classes.icon} />
                    )}
                </div>
                <Typography className={classes.name}>{modelname}</Typography>
                <Typography className={classes.identifier}>{modelnumber}</Typography>
            </div>
        </Link>
    );
}

export default DeviceList;
