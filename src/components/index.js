import { lazy } from 'react';
// import Footer from './footer/Footer';
// import Header from '../components/header/Header';
import SellerDialog from './sellerDialog/SellerDialog';
import LoginButton from './LoginButton';
import SearchFilter from "./SearchFilter/SearchFilter";
import ProductList from "../components/productlist/ProductList";
import Cart from "./Cart/Cart";
import Product from './Product/Product';
import Loader from './Loader/Loader';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import DeliveryAddressDialog from './deliveryaddressdialog/DeliveryAddressDialog';
import AlertDialog from './AlertDialog/AlertDialog';
import Map from './Map/Map';
import EmptyCart from "../pages/checkout/EmptyCart";
import AlertPopup from './AlertPopup/AlertPopup';
import ErrorSnackbar from './Snackbar/Snackbar';


const Header=lazy(()=>import("../components/header/Header"))
const Footer=lazy(()=>import("./footer/Footer"))


export {
    Header,
    Footer,
    // DashboardHeader,
    SellerDialog,
    LoginButton,
    SearchFilter,
    ProductList,
    Cart,
    Product,
    Loader,
    CheckoutForm,
    DeliveryAddressDialog,
    AlertDialog,
    Map,
    EmptyCart,
    AlertPopup,
    ErrorSnackbar
}