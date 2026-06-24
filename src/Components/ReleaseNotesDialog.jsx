import React, { useContext } from 'react';
import { makeStyles, Typography, Button, Dialog, DialogContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { GlobalContext } from '../Context/GlobalState';
import RELEASE_NOTES from '../Data/releaseNotes';

function ReleaseNotesDialog({ open, onClose, identifier, version }) {
    const { darkMode } = useContext(GlobalContext);

    const useStyles = makeStyles((theme) => ({
        paper: {
            background: darkMode ? 'rgba(20,20,40,0.95)' : 'rgba(245,248,255,0.97)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            borderRadius: '20px',
            border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.8)',
            boxShadow: darkMode
                ? '0 24px 80px rgba(0,0,0,0.6)'
                : '0 24px 80px rgba(0,0,0,0.12)',
        },
        titleRow: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: theme.spacing(2.5, 3, 0),
        },
        titleText: {
            fontWeight: 700,
            fontSize: '18px',
            color: darkMode ? '#ffffff' : '#1c1c1e',
        },
        versionBadge: {
            fontSize: '11px',
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: '20px',
            background: 'rgba(0,113,227,0.15)',
            border: '1px solid rgba(0,113,227,0.3)',
            color: '#0071e3',
            marginLeft: theme.spacing(1),
        },
        closeBtn: {
            minWidth: 'unset',
            padding: theme.spacing(0.75),
            borderRadius: '50%',
            color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
            '&:hover': {
                background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
            },
        },
        content: {
            padding: theme.spacing(2, 3, 3),
        },
        divider: {
            height: '1px',
            background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
            margin: theme.spacing(1.5, 0),
        },
        bulletList: {
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(1.5),
        },
        bulletItem: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: theme.spacing(1.5),
        },
        bulletIcon: {
            fontSize: '16px',
            color: '#30d158',
            marginTop: '2px',
            flexShrink: 0,
        },
        bulletText: {
            fontSize: '14px',
            lineHeight: '1.5',
            color: darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.75)',
        },
        footer: {
            padding: theme.spacing(0, 3, 2.5),
            display: 'flex',
            justifyContent: 'flex-end',
        },
        doneBtn: {
            background: '#0071e3',
            color: '#ffffff',
            borderRadius: '10px',
            textTransform: 'none',
            fontWeight: 600,
            padding: theme.spacing(1, 3),
            '&:hover': { background: '#005bbf' },
        },
        emptyState: {
            textAlign: 'center',
            padding: theme.spacing(3),
            color: darkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)',
            fontSize: '14px',
        },
    }));
    const classes = useStyles();

    const major = String(version || '').split('.')[0];
    const isMac = identifier && !identifier.startsWith('iPhone') && !identifier.startsWith('iPad');
    const notes = isMac ? RELEASE_NOTES.macos[major] : RELEASE_NOTES.ios[major];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{ className: classes.paper }}
        >
            <div className={classes.titleRow}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography className={classes.titleText}>
                        {notes ? notes.title : 'Release Notes'}
                    </Typography>
                    {version && <span className={classes.versionBadge}>{version}</span>}
                </div>
                <Button className={classes.closeBtn} onClick={onClose}>
                    <CloseIcon fontSize="small" />
                </Button>
            </div>

            <DialogContent className={classes.content}>
                <div className={classes.divider} />
                {notes ? (
                    <div className={classes.bulletList}>
                        {notes.highlights.map((h, i) => (
                            <div key={i} className={classes.bulletItem}>
                                <CheckCircleOutlineIcon className={classes.bulletIcon} />
                                <span className={classes.bulletText}>{h}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={classes.emptyState}>
                        Release notes are not available for this version.
                    </div>
                )}
            </DialogContent>

            <div className={classes.footer}>
                <Button onClick={onClose} className={classes.doneBtn} disableElevation>
                    Done
                </Button>
            </div>
        </Dialog>
    );
}

export default ReleaseNotesDialog;
