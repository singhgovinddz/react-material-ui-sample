import http from './http.service';
import AuthService from './auth.service';
import { getCookie } from '../utils';
import CommonService from './common.service';
class ProductService {
  // get product by ID
  get = async (id) => {
    const response = await http.get(ENV.PRODUCT_API_CONTEXT + "/test");
    return response.data;
  };

  // get near by products
  getNearBy = async () => {
    const response = await http.get(
      ENV.PRODUCT_API_CONTEXT + "/test"
    );
    return response.data;
  };

  // add to cart authorization
  addToCartAuth = async (payload) => {
    const response = await http.post(
      ENV.PRODUCT_API_CONTEXT + "/test",
      payload,
      {
        headers: {
          authorization: `bearer ${AuthService.token}`,
        },
      }
    );
    return response.data;
  };
  // public add to cart
  addToCartPublic = async (payload) => {
    const anonymousId = getCookie("anonymousID");
    const response = await http.post(
      ENV.PRODUCT_API_CONTEXT + "/test=" + anonymousId,
      payload
    );
    if (response && response.data && response.data.uId) {
      document.cookie = `anonymousID=${response.data.uId}`;
    }
    return response.data;
  };
  
  // Filter or Search
  

  getAvailiblity = async (pId) => {
    const response = await http.get(
      ENV.PRODUCT_API_CONTEXT + "/test=" + pId
    );
    const data = response.data;
    if (!data) return [];
    const newData = [];
    data.forEach((d) => {
      let currentHour = +(
        new Date().getHours() +
        "." +
        new Date().getMinutes()
      );
      const today = new Date();
      const _date = new Date(d.date);

      if (
        _date.getDate() === today.getDate() &&
        _date.getMonth() == today.getMonth()
      ) {
        if (d.startTime >= currentHour + 1) newData.push(d);
      } else {
        newData.push(d);
      }
    });
    return newData;
  };

  //get all timeSlots
  getTimeSlot = async () => {
    const response = await http.get(
      ENV.PRODUCT_API_CONTEXT + "/getAvailiblity"
    );
    const data = response.data;
    if (!data) return null;
    const result = {};
    // sort slots from low to high
    let currentHour = +(new Date().getHours() + "." + new Date().getMinutes());
    let currentDate = new Intl.DateTimeFormat("en-US").format(new Date());

    Object.entries(data).forEach(([date, slots]) => {
      const toLocalDate = new Intl.DateTimeFormat("en-US").format(
        new Date(date)
      );
      let filteredData = [];
      if (toLocalDate === currentDate) {
        filteredData = slots
          .filter((s) => {
            return s.startTime > currentHour + 1;
          })
          .sort((a, b) => {
            if (a.startTime > b.startTime) return 1;
            if (a.startTime < b.startTime) return -1;
            if (a.startTime == b.startTime) return 0;
            // return -1;
          });
      } else {
        filteredData = slots.sort((a, b) => {
          if (a.startTime > b.startTime) return 1;
          if (a.startTime < b.startTime) return -1;
          if (a.startTime == b.startTime) return 0;
          // return -1;
        });
      }
      if (filteredData.length) {
        result[date] = filteredData;
      }
    });
    return result;
  };

  getScore = async () => {
    return [1, 5, 10];
  };

  // Search product by id
  searchProductById = async (id) => {
    const response = await http.get(
      ENV.PRODUCT_API_CONTEXT + `/test?id=${id}`
    );
    return response.data;
  };

 
 
}

export default new ProductService();