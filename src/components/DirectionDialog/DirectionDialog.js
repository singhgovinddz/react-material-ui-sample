import React, { useEffect, useState } from 'react';
import './DirectionDialog.scss'
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Item from "@mui/material/Grid";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import RouteMap from '../RouteMap/RouteMap';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            left: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DirectionDialog({show, onClose, order}) {
  const [open, setOpen] = React.useState(false);
  const [sellerLocation, setSellerLocation] = React.useState();
  const [position, setPosition] = React.useState();
  

  React.useEffect(() => {
    if(order && order.orders[0] && order.orders[0].items[0]) {
      const [lng, lat] =  order.orders[0].items[0].product.product.address.location.coordinates
      setSellerLocation(`${lng},${lat}-${order.orders[0].sellerId}`);
    }
     
      navigator.geolocation.getCurrentPosition(({coords}) => {
        setPosition([coords.longitude, coords.latitude]);
      });
  }, [])
  
  
  const handleChange = (event) => {
    setSellerLocation(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  return (
    <div>
      <BootstrapDialog 
        sx={{ width:'100%', minHeight:'250px' }}
        className={'directiondialog'}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={show}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => onClose(false)}>
            <Typography fontSize='medium' fontWeight='bold' sx={{ ml:5 }} >
                Get Direction
            </Typography>
        </BootstrapDialogTitle>
        <DialogContent>
        <Box sx={{ minWidth: 120, minHeight:'70%' }}>
          <FormControl fullWidth>
            <Select              
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sellerLocation}
              onChange={handleChange}
            >
               {order.orders.map(val => {
                  const [lat, lng] = val.items[0] && val.items[0].product.product.address.location.coordinates;
                  
            return  <MenuItem key={val.id} value={`${lat},${lng}-${val.sellerId}`} >{val.sellerName}</MenuItem>
             })}
            </Select>
      </FormControl>
             {sellerLocation ? <RouteMap from={position} to={sellerLocation.substring(0, sellerLocation.indexOf('-')).split(',')} /> : null}
      
    </Box>
        </DialogContent>
        <DialogActions sx={{ px:4 }} >  
          <Button onClick={() => onClose(false)} variant="contained" autoFocus >
              Close
            </Button>            
         </DialogActions>     
      </BootstrapDialog>
    </div>
  );
}
