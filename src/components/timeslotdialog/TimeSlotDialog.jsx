import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import './TimeSlotDialog.scss'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {Tab, Tabs, Typography} from "@material-ui/core";
import Grid from "@mui/material/Grid";
import CalendarPicker from '@mui/lab/CalendarPicker';
import CloseIcon from '@mui/icons-material/Close';
import { convertIsoToLocal, getReadableDay} from '../../utils';

function TimeSlotDialog({show, onSubmit, onClose, timeSlots = {}, loading = false}) {
    const [valueone, setValueone] = useState('one');
    const [timeSlotDate, setTimeSlotDate] = useState(null)
    const [newTimeSlot] = useState(Object.keys(timeSlots))

    const onChange = (newValue, slot, _date) => {
        const selectedDate = convertIsoToLocal(_date)
        setTimeSlotDate({timeSlot: [slot], selectedDate: selectedDate})
        setValueone(newValue)
    } 
    const styles = theme => ({

    })

    return (
        <div>
            <Dialog className={'main_timeslot_dialog'} open={show} onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" variant="subtitle2" sx={{textAlign:"right", pb:1, fontWeight:"bold", display:"flex", alignItems:"center"}}>
                    Select Delivery Time and Date  <CloseIcon sx={{cursor:"pointer",  ml:3}} onClick={() => onClose()}  />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                            <Grid>
                                {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
                                {/*    <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />*/}
                                {/*</LocalizationProvider>*/}
                                {Object.keys(timeSlots).sort((a, b) => {
                                            const d1 = new Date(a)
                                            const d2 = new Date(b);
                                            console.log('d1', d1, 'd2', d2);
                                            if(d1 > d2) return 1;
                                            if(d1 < d2) return -1;
                                            if(d1 == d2) return 0;
                                            
                                            // return -1;
                                        }).map((date, index) => {
                                    return <div key={date}>
                                        <Typography className={"timeslot_heading" + ((date) == valueone.split(' - ')[1] ? " active" : "")}
                                            color={'black'} sx={{ pt: 2, pb: 2, fontWeight: "bold" }}>
                                            {getReadableDay(date)}
                                        </Typography>
                                        {timeSlots[date].map((slot)=> {
                                            return <div key={slot.id} className={'timeslot_tabs'}>
                                                <Button
                                                    className={'timeslot_tab' + ((slot.id + ' - ' + date) == valueone ? " active" : "")}
                                                    size="large"
                                                    variant="contained"
                                                    onClick={(e) => onChange(slot.id + ' - ' + date, slot, date)}
                                                    sx={{ width: "100%", mt: 1, mb: 1 }}
                                                >
                                                    <span className={'from_time'} style={{ marginRight: '5px' }}> {+(slot.startTime % 12 || 12) + (slot.startTime < 12 ? "AM" : "PM")} </span>
                                                    <span className={'to_time'}> TO {+(slot.endTime % 12 || 12) + (slot.endTime < 12 ? "AM" : "PM")} </span>
                                                </Button>
                                            </div>
                                        })}
                                    </div>
                                })}
                                
                            </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={!timeSlotDate} className={'sumbit-timeslot'} variant="contained" sx={{ width:"100%"}} onClick={(event) => {onSubmit(event, timeSlotDate); onClose(false)} } >Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default TimeSlotDialog;