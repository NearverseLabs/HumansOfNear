import axios from 'axios';
import { API_URL } from 'config';
import { store } from 'store';
import snackbar from './snackbar';
import { removeAccount } from 'store/reducers/auth';
const axiosServices = axios.create();

axiosServices.interceptors.request.use(
  (config: any) => {
    config.baseURL = API_URL;
    const state = store.getState() as any;
    const accessToken = state.auth.token;
    if (accessToken) {
      config.headers['x-auth-token'] = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response && response.status === 400) {
      snackbar({
        message: "Validation Error!",
        content: response.data,
        color: "error",
        variant: "alert",
        vertical: "top",
        horizontal: "right",
        transition: "SlideLeft",
      });
    } else if (response && response.status === 401) {
      store.dispatch(removeAccount());
    } else if (response && response.status === 413) {
      // snackbar(response.data, 'error');
    } else if (response && response.status === 429) {
      // snackbar(response.data, 'error');
    } else {
      console.log(response);
    }
    return;
  }
);

export default axiosServices;
