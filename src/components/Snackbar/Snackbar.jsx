import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';

// const Snackbar = styled('div')`
//     background: #333333;   

// `
export default class ErrorSnackbar extends React.Component {
    constructor() { 
      super();
      this.state = {
        open: false,
        message: 'Something went wrong',
        showUndo: false
      }
    }
  
   
    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      this.setState({...this.state, open: false})
      
    }
    
    action = (showUndo) =>  {
      
      return <React.Fragment>
        {this.state.showUndo ?  <Button size="small" onClick={this.handleClose} sx={{color:'#fff'}}>
          UNDO
        </Button>  : null}
       
        
        <IconButton
          size="small"
          aria-label="close"          
          onClick={this.handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    }
  
    render () {
      return (
        <div>
  
          <Snackbar    
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}        
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            // message={this.state.message}
            
          >
             <Alert onClose={this.handleClose} 
             severity="error"
              sx={{
                 width: '100%'                        
                 }}>
               {this.state.message}
            </Alert>
          </Snackbar>
        </div>
      );
    }
  
    
  }