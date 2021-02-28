import axios from 'axios';

const PAYMENT_API_BASE_URL = "http://localhost:8000/payment";

const PAYMENT_API_BASE_URL_CON = "http://localhost:8000/payment/confirm";

class PaymentApiService {

    addPayment(payment) {
        return axios.post(PAYMENT_API_BASE_URL, payment);
    }

    modifyPayment(payment) {
        return axios.put(PAYMENT_API_BASE_URL + '/' + payment.userId, payment);
    }
   
    conformSub(userId){
        return axios.get(PAYMENT_API_BASE_URL_CON + '/' + userId);
    }
 
}

export default new PaymentApiService();