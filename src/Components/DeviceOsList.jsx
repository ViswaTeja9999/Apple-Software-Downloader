import { Grid, makeStyles, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Breadcrumbs } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import _ from 'lodash';
import { useHistory, Link } from 'react-router-dom';
import deviceSpecs from '../Data/deviceSpecs';

function DeviceOsList() {
    const { darkMode, getfirmwareDetails, resdeviceFirmware, deviceimage } = useContext(GlobalContext);
    const history = useHistory();

    const identifier = _.get(resdeviceFirmware, 'identifier', '');
    const specs = deviceSpecs[identifier] || null;

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
        deviceName: { fontWeight: 600, color: darkMode ? '#fff' : '#1c1c1e', marginBottom: theme.spacing(0.5) },
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
        sectionLabel: {
            fontWeight: 600,
            fontSize: '13px',
            color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1),
            paddingLeft: theme.spacing(1),
        },
        glassTable: {
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.45)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '12px',
            border: darkMode ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(255,255,255,0.65)',
            overflow: 'auto',
            maxHeight: '280px',
            marginBottom: theme.spacing(2),
        },
        headCell: {
            color: darkMode ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.4px',
            borderBottom: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.08)',
            background: darkMode ? 'rgb(16, 16, 34)' : 'rgb(238, 244, 252)',
            position: 'sticky',
            top: 0,
            zIndex: 1,
        },
        bodyCell: {
            color: darkMode ? 'rgba(255,255,255,0.85)' : '#1c1c1e',
            fontSize: '13px',
            borderBottom: darkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.04)',
        },
        tableRow: {
            cursor: 'pointer',
            '&:hover': { background: darkMode ? 'rgba(0,113,227,0.12)' : 'rgba(0,113,227,0.07)' },
            '&:last-child td': { borderBottom: 'none' },
        },
        signedIcon: { color: '#30d158' },
        unsignedIcon: { color: '#ff453a' },
        note: {
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing(1),
            marginTop: theme.spacing(1),
            color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
            fontSize: '12px',
        },
    }));
    const classes = useStyles();

    const tableHeaders = ['Signed', 'Version', 'Build', 'Released', 'Size', ''];
    const dateformat = (d) => d ? d.slice(0, 10) : 'N/A';
    const sizeformat = (s) => ((s) / 1e9).toFixed(2) + ' GB';

    const handleRowClick = (buildid) => {
        getfirmwareDetails(identifier, buildid);
        history.push('/download');
    };

    const FirmwareTable = ({ firmwares }) => (
        <TableContainer className={classes.glassTable}>
            <Table size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        {tableHeaders.map(h => (
                            <TableCell key={h} className={classes.headCell}>{h}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {firmwares.map(fw => (
                        <TableRow key={fw.buildid} className={classes.tableRow} onClick={() => handleRowClick(fw.buildid)}>
                            <TableCell className={classes.bodyCell}>
                                {fw.signed
                                    ? <CheckCircleOutlineIcon className={classes.signedIcon} fontSize="small" />
                                    : <CloseIcon className={classes.unsignedIcon} fontSize="small" />}
                            </TableCell>
                            <TableCell className={classes.bodyCell}>{fw.version}</TableCell>
                            <TableCell className={classes.bodyCell}>{fw.buildid}</TableCell>
                            <TableCell className={classes.bodyCell}>{dateformat(fw.releasedate)}</TableCell>
                            <TableCell className={classes.bodyCell}>{sizeformat(fw.filesize)}</TableCell>
                            <TableCell className={classes.bodyCell} style={{ color: '#0071e3', fontSize: '12px' }}>Details →</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const allFirmwares = resdeviceFirmware.firmwares || [];
    const signed = allFirmwares.filter(f => f.signed);
    const unsigned = allFirmwares.filter(f => !f.signed);

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <div className={classes.main}>
                    <div className={classes.heading}>
                        <Typography className={classes.headingtext}>Choose OS Version</Typography>
                        <Breadcrumbs separator="›" className={classes.breadcrumbs}>
                            <Link to="/" className={classes.bcLink}>Home</Link>
                            <Link to={deviceTypePath} className={classes.bcLink}>{deviceTypeLabel}</Link>
                            <span className={classes.bcCurrent}>{_.get(resdeviceFirmware, 'name', '')}</span>
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

                        <Typography className={classes.sectionLabel}>Signed ({signed.length})</Typography>
                        {signed.length > 0 ? <FirmwareTable firmwares={signed} /> : (
                            <Typography style={{ color: darkMode ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)', fontSize: '13px', marginBottom: 16 }}>No signed versions available</Typography>
                        )}

                        <Typography className={classes.sectionLabel}>Unsigned ({unsigned.length})</Typography>
                        {unsigned.length > 0 ? <FirmwareTable firmwares={unsigned} /> : (
                            <Typography style={{ color: darkMode ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)', fontSize: '13px', marginBottom: 16 }}>No unsigned versions</Typography>
                        )}

                        <div className={classes.note}>
                            <CheckCircleOutlineIcon style={{ color: '#30d158', fontSize: 16 }} />
                            <span>Signed = accepted by Apple for device restore</span>
                        </div>
                        <div className={classes.note}>
                            <CloseIcon style={{ color: '#ff453a', fontSize: 16 }} />
                            <span>Unsigned = no longer accepted by Apple</span>
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}

export default DeviceOsList;
