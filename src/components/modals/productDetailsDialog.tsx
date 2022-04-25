import React from "react";
import Button from "@mui/material/Button";
import Item from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import * as ProductStyle from '../../pages/product/productDetailsStyling'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { FlexDivColumn, FlexDivRow } from "../Common/styled";
import {
  CalorieValue,
  CustomRating,
  FlexDivCenter,
  ImageDiv,
  NextButton,
  SaladNameSpan,
  SellerName,
  PriceTag
} from "../../pages/product/productDetailsStyling";
import { Stack } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import ShareIcon from "@mui/icons-material/Share";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Loader from "../Loader/Loader";
import styling from 'styled-components'

export const CustomImage = styling.img`
  width: 100%;
  max-width: 420px;
  max-height: 420px;
  object-fit: contain;
  height: auto;
`;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 0,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export interface ProductDetailsDialogProps {
  data: any;
  children?: React.ReactNode;
  onSellerClick: (arg: any) => void;
}

const ProductDetailsDialog: React.FC<ProductDetailsDialogProps> = ({
  data,
  onSellerClick,
  children,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen} style={{ cursor: "pointer" }}>
        {children}
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
         
        </BootstrapDialogTitle>
        <DialogContent>
          <FlexDivColumn
            style={{ marginLeft: 20, marginRight: 20, marginTop: 16 }}
          >
            {data ? (
              <>
                <ImageDiv>
                  <CustomImage src={data.image[0].url} alt={"product_image"} />
                </ImageDiv>

                <FlexDivCenter>
                  <SaladNameSpan>  {data.product.name} </SaladNameSpan>
                </FlexDivCenter>
                {data.sellerName ? <FlexDivCenter>
                  <SellerName>
                    {" "}
                    by <Typography onClick={() => onSellerClick(data)} sx={{cursor: 'pointer', ml:1, fontSize: '18px'}}> {data?.sellerName} </Typography>
                  </SellerName>{" "}
                  {data.sellerUrl && (
                    
                      <OpenInNewIcon style={{ fontSize: 20 }} />
                    </IconButton>
                  )}
                </FlexDivCenter>: <SellerName style={{justifyContent:'center'}}>(Info Not Available)</SellerName>}
                {/* <FlexDivCenter>
                  {" "}
                  <CalorieValue>560 Cal</CalorieValue>
                </FlexDivCenter> */}
                <FlexDivRow  
                  style={{ marginTop:'15px'}}
                  >
                    <ProductStyle.FlexDivCenter 
                      style={{ marginRight:'40px'}} 
                    >
                      {" "}
                      <Stack sx={{ alignItems: "center" }} spacing={1}>
                        <ProductStyle.CustomRating
                          name="half-rating-read"
                          defaultValue={5}
                          precision={1}
                          readOnly
                        />
                      </Stack>
                      {/* <Typography component="p">
                        No review available 
                      </Typography> */}
                    </ProductStyle.FlexDivCenter>
                    <ProductStyle.FlexDivCenter>
                      <Typography sx={{ display:'flex' }}>
                          <Typography component="div" fontWeight="bold" sx={{ color:'#73bf39', pl:1 }}>
                            {data.score}
                          </Typography>
                      </Typography>
                    </ProductStyle.FlexDivCenter>
                </FlexDivRow>
                <FlexDivCenter
                  style={{
                    justifyContent: "center",
                    marginTop: 21,
                  }}
                >
                  {data.product.price  ? <div>
                    <PriceTag>
                      ${data.product.price && parseFloat(data.product.price).toFixed(2)}
                    </PriceTag>
                    {data.product.unit ? <Typography component="div" fontSize="small" sx={{textAlign:'center'}}>
                      / {data.product.unit}
                    </Typography> : null }
                  </div> : null }
                </FlexDivCenter>               
                <FlexDivColumn style={{ marginTop: 16, marginBottom: 16 }}>
                    <Typography component="div" sx={{display:'flex', flexDirection:'column'}}>
                      <ProductStyle.Description>
                        {" "}
                        {data?.product?.description}
                      </ProductStyle.Description>                     
                    </Typography>
                </FlexDivColumn>
                <Item
                      className={'product_share_icon'}
                      sx={{ 
                        justifyContent: "left", 
                        mt: 2, 
                        mb: 2,   
                        display:'flex',
                        flexDirection:{xs:'column', sm:'row', md:'row'}                    
                        
                      }}
                    >
                      <FlexDivColumn
                          style={{ 
                            display:'flex', 
                            flexDirection:"row" }}
                      >
                        {/* <FavoriteIcon sx={ProductStyle.SocialMediaIconFirstChild} />
                        <ShareIcon sx={ProductStyle.SocialMediaIconStyle} />
                        <FacebookIcon sx={ProductStyle.SocialMediaIconStyle} />
                        <TwitterIcon sx={ProductStyle.SocialMediaIconStyle} /> */}
                      </FlexDivColumn>
                      <FlexDivColumn 
                        style={{ 
                          display:"flex", 
                          flexDirection:"row",
                        }}
                      >
                        {/* <InstagramIcon sx={ProductStyle.SocialMediaIconStyle} />
                        <PinterestIcon sx={ProductStyle.SocialMediaIconStyle} />
                        <YouTubeIcon sx={ProductStyle.SocialMediaIconStyle} /> */}
                      </FlexDivColumn>
                    </Item>
                </>
              ) : (
                <Loader msg={"Loading"} />
              )}
            </FlexDivColumn>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </div>
  );
};

export default ProductDetailsDialog;
