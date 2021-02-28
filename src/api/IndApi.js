import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8000/indicator";
const USER_API_BASE_URL_FORIGN = "http://localhost:8000/indicator/exeForeign";
const USER_API_BASE_URL_KOR = "http://localhost:8000/indicator/exeKorList";
const USER_API_BASE_URL_ONE_EURUSD = "http://localhost:8000/indicator/labelDalOneList";
const USER_API_BASE_URL_CHART_EURUSD = "http://localhost:8000/indicator/labelDalAllList";

class IndApiService {

    //국외 환율 정보 리스트
    exeForeignList() {
         return axios.get(USER_API_BASE_URL_FORIGN);
     }
    
    //국내 환율 정보 리스트
    exeKorList() {
        return axios.get(USER_API_BASE_URL_KOR);
    }

    //목록페이지 차트_EURUSD
    labelDalAllList() {
        return axios.get(USER_API_BASE_URL_CHART_EURUSD);
    }

    //1일의 EURUSD 수치
     labelDalOneList() {
        return axios.get(USER_API_BASE_URL_ONE_EURUSD);
    }

    //차트라벨_EURUSD
    //labelDalAllList() {
    //    return axios.get(USER_API_BASE_URL_LABEL_EURUSD);
    //}

    // fetchUserByID(userID) {
    //     return axios.get(USER_API_BASE_URL + '/' + userID);
    // }

    // deleteUser(userID) {
    //     return axios.delete(USER_API_BASE_URL + '/' + userID);
    // }

    // addUser(user) {
    //     return axios.post(USER_API_BASE_URL, user);
    // }

    // editUser(user) {
    //     return axios.put(USER_API_BASE_URL + '/' + user.id, user)
    // }
 
}

export default new IndApiService();