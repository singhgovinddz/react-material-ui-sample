import React, { useState}  from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Item from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import {Map} from '../../components'

import { UserService } from '../../services';
import Autocomplete from "@mui/material/Autocomplete";
import { CircularProgress } from '@mui/material';
import { CommonService } from '../../services';
import { useHistory } from 'react-router-dom';
import { useTranslation, Trans } from "react-i18next";
import  {FormControlLabel, Checkbox} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';



function DeliveryAddressDialog({show, address = null,  onClose, onSubmit, fullNameCheck = true, onAddress = () => {}, newAddress}) {
    const [date, setDate] = React.useState(new Date());
    const [form, setForm] = React.useState(null);
    const [ loading, setLoading ] = React.useState(false);
    const [locationList, setLocationList] = React.useState([]);
    const history = useHistory();
    const { t } = useTranslation();
    const [loader, setloader] = React.useState(false);
    const [isDefault, setIsDefault] = React.useState(address?.isDefault);
    const [showError, setShowError] = useState(false);
    
    React.useEffect(() => {
        if(address) {
            Object.keys(address).includes('isDefault') ? setIsDefault(address.isDefault) : setIsDefault(false)
            setForm({...form, address: {...address.detailedAddress, freeformAddress: address.address}});
        } else {
            setForm(null)
            setIsDefault(false)
        }
    }, [address])
    const _onClose=()=>{
        setForm(null)
        setShowError(false)
        onClose()
    }
    const createNew = async (e) => {
        e.preventDefault();
        setForm(null);
        setLocationList([])
        setLoading(true);
        if (form && form.address) {
            if (address) {
                await UserService.updateAddress({
                    ...address,
                    address: form.address.freeformAddress,
                    detailedAddress: address.detailedAddress,
                    isDefault: isDefault
                })
            } else {
                const res = await UserService.addAddress({
                    address: form.address.freeformAddress,
                    detailedAddress: {address: form.address,
                    position: form.position
                },
                    isDefault: isDefault
                })
                if(res) {
                    if(isDefault){ setIsDefault(false) }
                }
            }
        }
        onSubmit();
        setLoading(false);
    }

    const onDelete = async (e) => {
        e.preventDefault();
        setLoading(true);
        await UserService.deleteAddress(address.id);
        onSubmit();
        setLoading(false);
    }
   
    const onAddressChange = async (e) => {
        if(!e) return;
        if (e.type && e.type === "click") {
          return
        } else {
          const value = e?.target?.value;
          if (value) {
            setloader(true)
            setShowError(true)
            const locations = await CommonService.getLocationsResult(value, 'address');
            setLocationList(locations);
            setloader(false)
          }
        }
      };

    const handleCheck = (e) => {
        if(e.target.checked) {
            setIsDefault(true)
        }else {
            setIsDefault(false)
        }
    }
    
    return (
        <div>
            <Dialog open={show} onClose={() => _onClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                    maxWidth="sm"
            >
                <DialogTitle id="alert-dialog-title" >
                    <span> <CloseIcon sx={{cursor:"pointer"}} onClick={() => _onClose()}/> <Typography sx={{ color:'black', fontWeight:'bold' }}>{address ? <Item>Update Location</Item> : <Item>Add Location</Item>}</Typography> </span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid className={'main_timeslot_dialog'}  sx={{ mb:1 }}>
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                filterOptions ={(x) => x}
                                style={{ borderRadius: 6, fontSize:'10px', backgroundColor:'white'}}
                                value={form}
                                onBlur={() => {if(!form)  setShowError(true)}}
                                onInputChange={(e) => onAddressChange(e)}
                                onChange={(event, newValue) => {
                                    console.log('newVal', newValue);
                                    if (newValue) {
                                        setForm(newValue);
                                        setShowError(false)
                                    }
                                    else if(newValue === null){
                                        setForm(null);
                                        setShowError(true)
                                        setLocationList([])
                                    }
                                }}
                                options={locationList}
                                getOptionLabel={(option) => option?.address?.freeformAddress}
                                renderInput={(params) => {
                                    return <TextField 
                                        sx={{ '& .MuiOutlinedInput-root': { p:0 }, fontSize: '10px !important', mb:1, }} 
                                            {...params}   
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                <React.Fragment>
                                                    {loader ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                                )}} 
                                    />;
                                    }}
                                />
                            {showError ? <Typography sx={{ mt: 1, color: "#c00", fontWeight: "bold", fontSize: '11px' }}>
                            Select valid address
                            </Typography> : null}
                            <FormControlLabel  control={<Checkbox />} onClick={(e) => handleCheck(e)} checked={isDefault} label='Use as default location'   />
                            <Item sx={{display:'flex', alignItems:'center'}}>
                            {address && <Button variant="outlined" color="error" disabled={loading} style={{ borderRadius: "100px",fontWeight: "bold", width:'22%', marginRight:'5%', justifyContent:'space-around', textTransform:'capitalize' }} sx={{mt:4}} onClick={(e) => onDelete(e)}>
                                            <CancelIcon fontSize="small" />
                                            Delete
                                        </Button>}
                                <Button variant="contained" disabled={loading || showError || !form?.address} onClick={(e) => createNew(e)} style={{ borderRadius: "100px", width: '100%', background: '#333', fontWeight: "bold", textTransform: 'capitalize' }}
                                    sx={{
                                        mt: 4,
                                        background: '#333'
                                    }}>
                                    {!address && !loading ? 'Save' : null}
                                    {address && !loading ? 'Update' : null}
                                    {address && loading ? 'Updating...' : null}
                                    {!address && loading ? 'Saving...' : null}
                                </Button>
                            </Item>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}
export default DeliveryAddressDialog;