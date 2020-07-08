import Axios from 'axios';
import qs from 'qs';
// // 获取token
// const user_info = JSON.parse(localStorage.getItem('user_info'));
// if (user_info !== null) {
//     // 将token添加到header中
//     Axios.defaults.headers.common['Authorization'] = 'Bearer ' + user_info.user_token;
// }
// // console.log(Axios.defaults.headers);

export default {
    get(url, params) {
        return new Promise((resolve, reject) => {
            Axios.get(url, { params })
                 .then(response => {
                    resolve(response);
                 })
                 .catch(error => {
                    reject(error);
                 });
        })
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            Axios.post(url, qs.stringify( params ))
                 .then(response => {
                    resolve(response);
                 })
                 .catch(error => {
                     reject(error);
                 });
        })
    }
}