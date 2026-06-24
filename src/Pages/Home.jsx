import React, { useContext, useEffect, useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../Context/GlobalState';

const CARD_WIDTH = 260;
const CARD_GAP = 24;
const SECTION_WIDTH = CARD_WIDTH * 3 + CARD_GAP * 2; // 708px

const NAV_ITEMS = [
    {
        path: '/iPhone', title: 'iPhone', description: 'Download iOS firmware for your iPhone',
        Icon: PhoneIphoneIcon,
        image: 'https://cdsassets.apple.com/live/7WUAS350/images/iphone/iphone-17-pro-colors.png',
    },
    {
        path: '/iPad', title: 'iPad', description: 'Download iPadOS firmware for your iPad',
        Icon: TabletMacIcon,
        image: 'https://cdsassets.apple.com/live/7WUAS350/images/ipad/fall-2025-ipad-pro-m5-11in.png',
    },
    {
        path: '/mac', title: 'Mac', description: 'Download macOS firmware for Apple Silicon Macs',
        Icon: LaptopMacIcon,
        image: 'https://cdsassets.apple.com/live/7WUAS350/images/macbook-pro/macbook-pro-14in-m5-colors.png',
    },
];

const LATEST_DEVICE = {
    iOS:    { id: 'iPhone17,1', logo: 'https://developer.apple.com/assets/elements/icons/ios/ios-256x256_2x.png' },
    iPadOS: { id: 'iPad16,5',   logo: 'https://developer.apple.com/assets/elements/icons/ipados/ipados-256x256_2x.png' },
    macOS:  { id: 'Mac16,1',    logo: 'https://developer.apple.com/assets/elements/icons/finder/finder-256x256_2x.png' },
};

const MACOS_CODENAMES = {
    '27': 'Emerald', '26': 'Tahoe', '15': 'Sequoia', '14': 'Sonoma',
    '13': 'Ventura', '12': 'Monterey', '11': 'Big Sur',
};

function Home() {
    const { darkMode } = useContext(GlobalContext);
    const [latestOS, setLatestOS] = useState({ iOS: null, iPadOS: null, macOS: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        const fetches = Object.entries(LATEST_DEVICE).map(([key, { id }]) =>
            axios.get(`https://api.ipsw.me/v4/device/${id}?type=ipsw`)
                .then(res => {
                    const firmwares = res.data?.firmwares || [];
                    const signed = firmwares.filter(f => f.signed);
                    const latest = signed.length > 0
                        ? signed.sort((a, b) => new Date(b.releasedate) - new Date(a.releasedate))[0]
                        : firmwares[0] || null;
                    if (mounted) setLatestOS(prev => ({ ...prev, [key]: latest }));
                })
                .catch(() => {})
        );
        Promise.all(fetches).then(() => { if (mounted) setLoading(false); });
        return () => { mounted = false; };
    }, []);

    const useStyles = makeStyles((theme) => ({
        container: {
            minHeight: 'calc(100vh - 88px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing(4),
            gap: theme.spacing(4),
        },
        hero: {
            textAlign: 'center',
            padding: theme.spacing(5, 6),
            background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            borderRadius: '24px',
            border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.75)',
            boxShadow: darkMode
                ? '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                : '0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
            width: '100%',
            maxWidth: `${SECTION_WIDTH}px`,
            boxSizing: 'border-box',
        },
        heroTitle: {
            fontWeight: 700,
            letterSpacing: '-1px',
            color: darkMode ? '#ffffff' : '#1c1c1e',
        },
        heroSub: {
            color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
            marginTop: theme.spacing(1),
        },
        cardsRow: {
            display: 'flex',
            gap: `${CARD_GAP}px`,
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
            maxWidth: `${SECTION_WIDTH}px`,
        },
        card: {
            width: `${CARD_WIDTH}px`,
            padding: theme.spacing(4, 3),
            background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderRadius: '20px',
            border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.75)',
            boxShadow: darkMode
                ? '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)'
                : '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
            textAlign: 'center',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'pointer',
            boxSizing: 'border-box',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: darkMode
                    ? '0 12px 40px rgba(0,113,227,0.25), inset 0 1px 0 rgba(255,255,255,0.12)'
                    : '0 12px 40px rgba(0,113,227,0.15), inset 0 1px 0 rgba(255,255,255,0.95)',
            },
        },
        link: { textDecoration: 'none' },
        icon: { fontSize: '56px', color: '#0071e3', marginBottom: theme.spacing(2) },
        cardImg: { height: '90px', maxWidth: '140px', objectFit: 'contain', marginBottom: theme.spacing(2) },
        cardTitle: { fontWeight: 600, color: darkMode ? '#ffffff' : '#1c1c1e', marginBottom: theme.spacing(1) },
        cardDesc: { fontSize: '13px', color: darkMode ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)' },

        // Latest releases section
        latestSection: { width: '100%', maxWidth: `${SECTION_WIDTH}px` },
        latestHeading: {
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
            marginBottom: theme.spacing(1.5),
            paddingLeft: theme.spacing(0.5),
        },
        latestRow: {
            display: 'flex',
            gap: `${CARD_GAP}px`,
            flexWrap: 'wrap',
        },
        osCard: {
            flex: `0 0 ${CARD_WIDTH}px`,
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing(2),
            padding: theme.spacing(2, 2.5),
            background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '16px',
            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.75)',
            boxShadow: darkMode ? '0 2px 16px rgba(0,0,0,0.25)' : '0 2px 16px rgba(0,0,0,0.05)',
            boxSizing: 'border-box',
        },
        osIconWrap: {
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            overflow: 'hidden',
            flexShrink: 0,
            background: 'transparent',
        },
        osLogo: {
            width: '44px',
            height: '44px',
            objectFit: 'contain',
        },
        osInfo: { display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 },
        osName: {
            fontSize: '15px',
            fontWeight: 700,
            color: darkMode ? '#ffffff' : '#1c1c1e',
        },
        osVersion: {
            fontSize: '12px',
            color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
        },
        osDate: {
            fontSize: '11px',
            color: darkMode ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
        },
        osSigned: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            fontSize: '11px',
            color: '#30d158',
            fontWeight: 500,
            marginTop: '2px',
        },
        skeleton: {
            flex: `0 0 ${CARD_WIDTH}px`,
            height: '76px',
            borderRadius: '16px',
            background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
            border: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.06)',
        },
    }));
    const classes = useStyles();

    const formatDate = (iso) => {
        if (!iso) return '';
        return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getOSLabel = (key, version) => {
        if (!version) return key;
        const major = String(version).split('.')[0];
        if (key === 'macOS') {
            const name = MACOS_CODENAMES[major];
            return name ? `macOS ${major} ${name}` : `macOS ${version}`;
        }
        return `${key} ${major}`;
    };

    return (
        <Grid container>
            <Grid item xs={12} className={classes.container}>
                <div className={classes.hero}>
                    <Typography variant="h3" className={classes.heroTitle}>
                         Software Downloader
                    </Typography>
                    <Typography variant="h6" className={classes.heroSub}>
                        Download iOS, iPadOS and macOS firmware
                    </Typography>
                </div>

                <div className={classes.cardsRow}>
                    {NAV_ITEMS.map(({ path, title, description, Icon, image }) => (
                        <Link to={path} className={classes.link} key={path}>
                            <div className={classes.card}>
                                {image
                                    ? <img src={image} alt={title} className={classes.cardImg} onError={e => { e.target.style.display = 'none'; }} />
                                    : <Icon className={classes.icon} />
                                }
                                <Typography variant="h5" className={classes.cardTitle}>{title}</Typography>
                                <Typography className={classes.cardDesc}>{description}</Typography>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className={classes.latestSection}>
                    <Typography className={classes.latestHeading}>Latest Releases</Typography>
                    <div className={classes.latestRow}>
                        {Object.entries(LATEST_DEVICE).map(([key, { logo }]) => {
                            if (loading) return <div key={key} className={classes.skeleton} />;
                            const fw = latestOS[key];
                            if (!fw) return null;
                            return (
                                <div key={key} className={classes.osCard}>
                                    <div className={classes.osIconWrap}>
                                        <img
                                            src={logo}
                                            alt={key}
                                            className={classes.osLogo}
                                            onError={e => { e.target.style.display = 'none'; }}
                                        />
                                    </div>
                                    <div className={classes.osInfo}>
                                        <span className={classes.osName}>{getOSLabel(key, fw.version)}</span>
                                        <span className={classes.osVersion}>{fw.version} · {fw.buildid}</span>
                                        <span className={classes.osDate}>{formatDate(fw.releasedate)}</span>
                                        {fw.signed && (
                                            <span className={classes.osSigned}>
                                                <CheckCircleOutlineIcon style={{ fontSize: 12 }} /> Signed
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}

export default Home;
