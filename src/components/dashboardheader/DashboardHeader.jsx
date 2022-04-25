import { useHistory } from 'react-router-dom';
import './DashboardHeader.scss'
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";
import Box from "@mui/material/Box";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import LoginButton from '../LoginButton';

function ScrollTop(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );
        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16, zIndex:1 }}
            >
                {children}
            </Box>
        </Zoom>
    );
}
const DashboardHeader = ({cart, onChange}) => {
    const history = useHistory();
    let props;
    return <>
        <Box sx={{ flexGrow: 1,}}>
            <React.Fragment>
                <CssBaseline />
                <AppBar className={'search_header'}>
                    <Grid container rowSpacing={1} sx={{ pl:{ xs:1, sm:1, md:3 }, pr:{ xs: 1, sm: 1, md:3 } }}>
                        <Grid item xs={12} sm={3} sx={{ display:'flex', alignItems:'center' }} >
                            <Item sx={{ pl:{ xs:0, sm:0, md:1} }}>
                                {/* <img sx={{width:{xs:'50%', sm:'20%', md:'12%'}}} src={Logo} alt={'logo'}/> */}
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ }}>
                            <Item sx={{  display:"flex", alignItems:'center', pr:{ xs:0, sm:0, md: 4}, mb:{xs:1} }}>
                                <ArrowBackIosIcon sx={{fontSize:'14px', cursor:'pointer', mr: 1 }} onClick={() => history.push('/')}/>
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 5px', mr: 1, display: 'flex', alignItems: 'center', width:'80%', borderRadius:'28px', }}
                                >
                                    <InputBase
                                        sx={{ p: '2px 5px', ml: 1, flex: 1, fontSize:"10px", }}
                                        placeholder={'Search anything'}
                                        inputProps={''}
                                        onChange= { (event) => event.target.value.length > 3 ? onChange( event.target.value) : null}
                                    />
                                </Paper>
                                <IconButton className={'search_button'} type="submit" sx={{ p: 1,}} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={3}  sx={{ pl:{ xs:0, sm:0, md:4 }, display:'flex', justifyContent:'space-between'}} >
                            <Item sx={{  display:"flex", alignItems:'center'}}>
                                <Badge color="secondary" badgeContent={cart && cart.items.length || 0} showZero>
                                    <ShoppingCartIcon />
                                </Badge>
                                {cart && cart.totalPrice && <Typography sx={{ ml: 2, fontWeight:'700' }} variant="p" component="div">
                                    ${cart.totalCost}
                                </Typography>}
                                
                            </Item>
                            <Item sx={{  display:"flex", alignItems:'center'}}>
                                <LoginButton />
                            </Item>
                        </Grid>
                    </Grid>
                </AppBar>
                <Toolbar id="back-to-top-anchor" sx={{minHeight:'52px!important'}} />
                <ScrollTop {...props}>
                    <Fab color="primary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
            </React.Fragment>
        </Box>
    </>
}

export default DashboardHeader;