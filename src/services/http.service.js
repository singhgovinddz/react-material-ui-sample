import axios from 'axios';
import ToasterService from './toaster.service';

const HttpService = axios.create({
  baseURL:ENV.API_URL,
  headers: {
  }
});

/*** Interceptor ***/

HttpService.interceptors.request.use(request => {

  return request;
}, error => {
  return Promise.reject(error);
});

export default HttpService;