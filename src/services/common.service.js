import http from './http.service';

class CommonService {
    // Get All Categories
    getCategories = async () => {
        const response =  await http.get(ENV.COMMON_API_CONTEXT + '/test'); 
        return response.data;
    }
    // Get All Product Types
    getTypes = async () => {
        const response =  await http.get(ENV.COMMON_API_CONTEXT + '/test'); 
        return response.data;
    }

   

   

}

export default new CommonService();