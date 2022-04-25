import http from './http.service';
import {types, categories} from './seller.data';
import {ENV} from '../environment';

const SellerService = {};

// Create New Seller
SellerService.save = (newSeller) => {
    return http.post(ENV.SELLER_API_CONTEXT+'/test', newSeller);
};

SellerService.getAll = () => {
    return http.get(ENV.SELLER_API_CONTEXT+'/test')
}

/**
 *  QueryParms: {qty: number}
 *  Seller Calculator
 */

SellerService.calculate = async (qty) => {
    const response =  await http.get(`${ENV.SELLER_API_CONTEXT}/test=${qty}`);
    return response.data
}

// Get All Categories
SellerService.getCategories = () => {
    return Promise.resolve(categories);
}

// Get Types 
SellerService.getTypes = () => {
    return Promise.resolve(types);
}

// Validate Reigon Using Seller id and Zip
SellerService.validateRegion = async ({sellerId, zipCode}) => {
    const response =  await http.get(`${ENV.SELLER_API_CONTEXT}/test=${sellerId}&zipCode=${zipCode}`);
    return response.data
}

// Get All Sellers
SellerService.getSellers = async () => {
    const response =  await http.get(ENV.SELLER_API_CONTEXT + '/test');
    return response.data
}

SellerService.newSellerSchema = {
    companyName: '',
    url: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    vendorType: [],
    category: 'fruit_salads',
    type: 'mixed_fruit',
    postcode: 0,
    range: '',
    rangeUnit: 'mile',
    monthlyProduction: 0
}

export default SellerService;
