import { Grid, makeStyles, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Button, Breadcrumbs } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import GetAppIcon from '@material-ui/icons/GetApp';
import CloseIcon from '@material-ui/icons/Close';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import deviceSpecs from '../Data/deviceSpecs';

const IOS_NOTES = {
    '26': 'https://support.apple.com/en-us/100100',
    '18': 'https://support.apple.com/en-us/111900',
    '17': 'https://support.apple.com/en-us/111898',
    '16': 'https://support.apple.com/en-us/111897',
    '15': 'https://support.apple.com/en-us/111896',
    '14': 'https://support.apple.com/en-us/114445',
};
const MACOS_NOTES = {
    '26': 'https://support.apple.com/en-us/100100',
    '15': 'https://support.apple.com/en-us/121247',
    '14': 'https://support.apple.com/en-us/108504',
    '13': 'https://support.apple.com/en-us/102575',
    '12': 'https://support.apple.com/en-us/102277',
    '11': 'https://support.apple.com/en-us/103593',
};

function getReleaseNotesUrl(identifier, version) {
    if (!identifier || !version) return null;
    const major = String(version).split('.')[0];
    const isMac = !identifier.startsWith('iPhone') && !identifier.startsWith('iPad');
    const map = isMac ? MACOS_NOTES : IOS_NOTES;
    return map[major] || 'https://support.apple.com/en-us/100100';
}

function DownloadOs() {
    const { darkMode, firmwareResponse, resdeviceFirmware, deviceimage } = useContext(GlobalContext);

    const identifier = _.get(firmwareResponse, 'identifier', '') || _.get(resdeviceFirmware, 'identifier', '');
    const version = _.get(firmwareResponse, 'version', '');
    const specs = deviceSpecs[identifier] || null;
    const releaseNotesUrl = getReleaseNotesUrl(identifier, version);

    const deviceTypeLabel = identifier.startsWith('iPhone') ? 'iPhone'
        : identifier.startsWith('iPad') ? 'iPad' : 'Mac';
    const deviceTypePath = identifier.startsWith('iPhone') ? '/iPhone'
        : identifier.startsWith('iPad') ? '/iPad' : '/mac';

    const useStyles = makeStyles((theme) => ({
        root: { minHeight: 'calc(100vh - 88px)' },
        main: { display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 88px)' },
        heading: {
            padding: theme.spacing(1.5, 2, 1),
            background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.45)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.65)',
        },
        headingtext: {
            fontWeight: 600,
            fontSize: '16px',
            color: darkMode ? '#ffffff' : '#1c1c1e',
        },
        breadcrumbs: {
            marginTop: '4px',
            '& .MuiBreadcrumbs-separator': {
                color: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            },
        },
        bcLink: {
            fontSize: '14px',
            color: '#0071e3',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
        },
        bcCurrent: {
            fontSize: '14px',
            color: darkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)',
        },
        scroll: { flex: 1, padding: theme.spacing(2) },
        deviceInfo: {
            textAlign: 'center',
            padding: theme.spacing(3),
            marginBottom: theme.spacing(2),
            background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.45)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '16px',
            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.7)',
        },
        deviceName: { fontWeight: 600, color: darkMode ? '#fff' : '#1c1c1e' },
        deviceId: { fontSize: '13px', color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)', fontFamily: 'monospace' },
        specRow: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: theme.spacing(0.75),
            marginTop: theme.spacing(1.5),
        },
        specChip: {
            fontSize: '11px',
            fontWeight: 500,
            padding: '3px 10px',
            borderRadius: '20px',
            background: darkMode ? 'rgba(0,113,227,0.18)' : 'rgba(0,113,227,0.1)',
            border: '1px solid rgba(0,113,227,0.3)',
            color: '#0071e3',
            letterSpacing: '0.2px',
        },
        glassTable: {
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.45)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '12px',
            border: darkMode ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(255,255,255,0.65)',
            overflow: 'hidden',
            marginBottom: theme.spacing(2),
        },
        thCell: {
            color: darkMode ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.4px',
            borderBottom: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
            width: '140px',
        },
        tdCell: {
            color: darkMode ? 'rgba(255,255,255,0.85)' : '#1c1c1e',
            fontSize: '13px',
            borderBottom: darkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.04)',
        },
        btnRow: {
            display: 'flex',
            gap: theme.spacing(1.5),
            flexWrap: 'wrap',
            margin: theme.spacing(2, 0),
        },
        downloadBtn: {
            background: '#0071e3',
            color: '#ffffff',
            borderRadius: '10px',
            textTransform: 'none',
            fontWeight: 600,
            padding: theme.spacing(1, 3),
            '&:hover': { background: '#005bbf' },
        },
        notesBtn: {
            borderRadius: '10px',
            textTransform: 'none',
            fontWeight: 600,
            padding: theme.spacing(1, 2.5),
            border: darkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.15)',
            color: darkMode ? 'rgba(255,255,255,0.8)' : '#1c1c1e',
            '&:hover': {
                background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                border: darkMode ? '1px solid rgba(255,255,255,0.35)' : '1px solid rgba(0,0,0,0.25)',
            },
        },
        urlBox: {
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
            borderRadius: '8px',
            padding: theme.spacing(1.5),
            marginTop: theme.spacing(1),
            wordBreak: 'break-all',
            fontSize: '12px',
            color: darkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
        },
        disclaimer: {
            marginTop: theme.spacing(2),
            fontSize: '12px',
            color: darkMode ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
        },
        signed: { color: '#30d158', display: 'flex', alignItems: 'center', gap: '4px' },
        unsigned: { color: '#ff453a', display: 'flex', alignItems: 'center', gap: '4px' },
    }));
    const classes = useStyles();

    const isSigned = _.get(firmwareResponse, 'signed');
    const rows = [
        { label: 'Signed', value: isSigned !== undefined ? (
            isSigned
                ? <span className={classes.signed}><CheckCircleOutlineIcon fontSize="small" /> Signed</span>
                : <span className={classes.unsigned}><CloseIcon fontSize="small" /> Unsigned</span>
        ) : '—' },
        { label: 'Device', value: _.get(resdeviceFirmware, 'name', '—') },
        { label: 'Identifier', value: <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{_.get(firmwareResponse, 'identifier', '—')}</span> },
        { label: 'Version', value: version || '—' },
        { label: 'Build', value: _.get(firmwareResponse, 'buildid', '—') },
        { label: 'Released', value: _.get(firmwareResponse, 'releasedate') ? String(_.get(firmwareResponse, 'releasedate')).slice(0, 10) : '—' },
        { label: 'Size', value: _.get(firmwareResponse, 'filesize') ? (_.get(firmwareResponse, 'filesize') / 1e9).toFixed(2) + ' GB' : '—' },
    ];

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <div className={classes.main}>
                    <div className={classes.heading}>
                        <Typography className={classes.headingtext}>Version Details</Typography>
                        <Breadcrumbs separator="›" className={classes.breadcrumbs}>
                            <Link to="/" className={classes.bcLink}>Home</Link>
                            <Link to={deviceTypePath} className={classes.bcLink}>{deviceTypeLabel}</Link>
                            <Link to="/oslist" className={classes.bcLink}>{_.get(resdeviceFirmware, 'name', deviceTypeLabel)}</Link>
                            <span className={classes.bcCurrent}>{version || 'Download'}</span>
                        </Breadcrumbs>
                    </div>

                    <div className={classes.scroll}>
                        <div className={classes.deviceInfo}>
                            {deviceimage && (
                                <img
                                    src={deviceimage}
                                    alt={_.get(resdeviceFirmware, 'name', '')}
                                    style={{ maxHeight: '80px', maxWidth: '120px', objectFit: 'contain', marginBottom: 8 }}
                                    onError={e => { e.target.style.display = 'none'; }}
                                />
                            )}
                            <Typography className={classes.deviceName}>{_.get(resdeviceFirmware, 'name', '—')}</Typography>
                            <Typography className={classes.deviceId}>{identifier}</Typography>
                            {specs && (
                                <div className={classes.specRow}>
                                    <span className={classes.specChip}>{specs.chip}</span>
                                    <span className={classes.specChip}>{specs.ram} RAM</span>
                                    {specs.battery && <span className={classes.specChip}>{specs.battery}</span>}
                                </div>
                            )}
                        </div>

                        <TableContainer className={classes.glassTable}>
                            <Table size="small">
                                <TableBody>
                                    {rows.map(r => (
                                        <TableRow key={r.label}>
                                            <TableCell component="th" scope="row" className={classes.thCell}>{r.label}</TableCell>
                                            <TableCell className={classes.tdCell}>{r.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <div className={classes.btnRow}>
                            <Button
                                startIcon={<GetAppIcon />}
                                href={_.get(firmwareResponse, 'url')}
                                className={classes.downloadBtn}
                                variant="contained"
                                disableElevation
                            >
                                Download Firmware
                            </Button>
                            {releaseNotesUrl && (
                                <Button
                                    startIcon={<OpenInNewIcon />}
                                    href={releaseNotesUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={classes.notesBtn}
                                    variant="outlined"
                                >
                                    Release Notes
                                </Button>
                            )}
                        </div>

                        <Typography className={classes.disclaimer}>
                            If download doesn't start, copy the link below into a new tab.
                        </Typography>
                        <div className={classes.urlBox}>{_.get(firmwareResponse, 'url', '')}</div>
                        <Typography className={classes.disclaimer}>
                            All firmware files are owned by Apple Inc. This app links directly to Apple's servers.
                        </Typography>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}

export default DownloadOs;
