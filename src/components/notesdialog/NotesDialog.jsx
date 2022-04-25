import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import CloseIcon from "@mui/icons-material/Close";
import TextareaAutosize from '@mui/material/TextareaAutosize';

function NotesDialog({show, onClose, onSubmit}) {

    const [notes, setnotes] = React.useState(null);

    return (
        <div>
            <Dialog
                open={show}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{pb:0}}>
                    <span onClick={() => onClose()} > <CloseIcon sx={{cursor:"pointer"}}  /> </span>
                </DialogTitle>
                <DialogContent className={"notes-dialog-content"} sx={{pt:1}}>
                    <DialogContentText id="alert-dialog-description">
                        <InputLabel sx={{mt:1, mb: 1, fontWeight:'600' }} id="labelId">Add Notes</InputLabel>
                        <TextareaAutosize
                        aria-label="minimum height"
                        minRows={10}
                        style={{ width: 400, fontFamily: "Roboto,Helvetica,Arial,sans-serif" }}
                        onKeyUp={(event) => {
                            if (event.key== 'Enter')
                            onSubmit(notes)
                          }}
                        value={notes}
                        onChange={(e) => setnotes(e.target.value)}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => onSubmit(notes)} sx={{mr:2, mb:1}}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default NotesDialog;