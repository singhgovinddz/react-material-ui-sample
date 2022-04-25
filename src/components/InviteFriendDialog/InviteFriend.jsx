import * as React from 'react';
import  './InviteFriend.scss'
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
import MapIcon from '@mui/icons-material/Map';
import Item from "@mui/material/Grid";
import CreateIcon from "@mui/icons-material/Create";
import ProductImage from "../../assets/productlistimage.jpg";
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { CircularProgress, InputLabel, TextField } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import { NotificationService } from '../../services';
import { getReadableDate, getReadableDay, getReadableSlots } from '../../utils';
import { green } from '@mui/material/colors';

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

export default function InviteFriendDialog({show, onClose, eventDetails}) {
  const [open, setOpen] = React.useState(false);
  const [friends, setFriends] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [sendingMail, setSendingEmail] = React.useState(false);

  const inviteFriend = () => {
    if(eventDetails && email){  
    setSendingEmail(true)
    const newArr = eventDetails.map(val => val.items.map(item => item.product.product.name))
    const eventName = newArr.length > 1 && newArr.flat(1)
    const firstName = eventDetails[0].deliveryDetails.firstName
    const inviteDetails = {
      emails: email,
      eventName: eventName,
      firstName: firstName
    }
    NotificationService.inviteFriends(inviteDetails)
      .then((data) => {
        setSendingEmail(false)
        onClose(false)
          }
      )
      .catch((err) => setSendingEmail(false))
    }      
  }

  const handleAddFriend = () => {
    if(friends){
      let newFriends = [];
      if(!email){
        setEmail([friends])
      }else {
        newFriends = [...email, friends]
        setEmail(newFriends)
      }
    }
  }

  return (
    <div>
      <BootstrapDialog 
        sx={{ width:'100%' }}
        className={'addcalendar'}
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={show}
      >
        <BootstrapDialogTitle id="customized-dialog-title"onClose={() => onClose(false)}>
            <Typography fontSize='medium' fontWeight='bold' sx={{ ml:5 }} >
                Invite Friends to Event
            </Typography>
        </BootstrapDialogTitle>
        <DialogContent>
        {eventDetails.length && eventDetails.map((val,i) => {
              return <Item key={i}>
                  <Item className={"heading_top"} sx={{ display: 'flex', p: 1 }}>
                      <Typography sx={{ display: 'flex', justifyContent:'space-between' }}>                                
                          <Item sx={{ display:'flex' }}>
                              <Typography sx={{ fontWeight: "bold", fontSize: '15px', pr: 1 }}>Event:</Typography>
                              <Typography sx={{ fontWeight: "400", fontSize: '15px', mr:1  }}>
                              <span>{getReadableDay(val?.date)} {getReadableSlots(val?.slot)}</span>                              
                              </Typography>                                   
                          </Item>
                      </Typography>
                  </Item>
                  <Item sx={{ display:'flex', paddingTop:'5px' }}>
                      <Typography sx={{fontSize:'13px', textDecoration: 'underline', pl:1, pb: 1}} >{val?.address}</Typography>
                      <MapIcon sx={{ ml:1, fontSize:'20px', cursor:"pointer"}}/>
                  </Item> 
                  {val.items.map((item,i) => {
                    return <Item key={i}>
                      <Item  key={item.product.id} sx={{ display:'flex', pr:{xs:0, sm:0, md:2}, mt:2, mb:2, alignItems:'center' }}>
                          <Item>
                            <img width={70} style={{ borderRadius:'6px'}} src={item.product.image[0].thumbnail} alt={"productimage"}/>
                          </Item>
                          <Item sx={{display:"flex", flexDirection:"column", width:"100%"}}>
                            <Item sx={{display:"flex", justifyContent:"space-between", width:"200px"}}>
                              <Typography sx={{ mb: 1, ml:1, color:'black', fontWeight:'bold' }}>{item.product.product.name}</Typography>
                            </Item>
                          </Item>
                        </Item>
                    </Item> })}
                  </Item>
            })}      
        {email && email.map((val,index) => {
          return <Item key={index} sx={{ display:'flex', paddingTop:'5px' }}>
            <Typography sx={{fontSize:'13px', textDecoration: 'underline', pl:1, pb: 1}} >{val}</Typography>
            <DeleteSharpIcon sx={{ ml:1, fontSize:'20px', cursor:"pointer"}}/>
          </Item>
        })}  
        <Item className={'checkout_email'} sx={{ display: 'flex', flexDirection: 'column', pr: { xs: 0, sm: 0, md: 2 } }}>
            <InputLabel sx={{ mt: 2, mb: 1, fontWeight: '300' }} id="labelId">Email *</InputLabel>
            <TextField  name="email" className={'zip_code'} sx={{ width: '100%', textAlign: 'center', p: 0, }} size="small" labelId="labelId" id="outlined-basic" label="" variant="outlined" onChange={(e) => setFriends(e.target.value)}/>
        </Item> 
        <Item 
        sx={{
             display:'flex', 
             flexDirection:'column', 
             pr:{xs:0, sm:0, md:2}, 
             mb:3,
             mt:2 
             }}>                   
            <Button variant="outlined" color={'inherit'} sx={{borderRadius:'50px', width:"max-content",  px:3, textTransform:"inherit"}} onClick={() => handleAddFriend()}>
                <AddIcon sx={{ fontSize: '14px' }} /> Friend                   
            </Button>
        </Item>
        </DialogContent>
        <DialogActions sx={{ px:4 }}>
          <Button variant="contained" color={'inherit'} 
              sx={{borderRadius:'50px', width:"max-content", px:3, textTransform:"inherit",  mb:2}} 
              autoFocus 
              disabled={sendingMail}
              onClick={inviteFriend}
          >
            {sendingMail ? (
                <CircularProgress
                    size={24}
                    sx={{color: green[500], position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px'}}
                />
            )  : <AddIcon sx={{ fontSize: '14px' }} /> } 
            invite                 
            </Button>
          {/* <Button variant='contained' >
            invite
          </Button> */}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
