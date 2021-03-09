import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8000/indicator";
const USER_API_BASE_URL_FORIGN = "http://localhost:8000/indicator/exeForeign";
const USER_API_BASE_URL_KOR = "http://localhost:8000/indicator/exeKorList";
const USER_API_BASE_URL_ONE_EURUSD = "http://localhost:8000/indicator/labelDalOneList";
const USER_API_BASE_URL_CHART_EURUSD = "http://localhost:8000/indicator/labelDalAllList";
const USER_API_BASE_URL_CHART = "http://localhost:8000/indicator/chart";
const USER_API_BASE_URL_INDI1 = "http://localhost:8000/indicator/indi1";
const USER_API_BASE_URL_INDI2 = "http://localhost:8000/indicator/indi2";
const USER_API_BASE_URL_CORRABS = "http://localhost:8000/indicator/corrAbs";

const TEST_API_BASE_URL = "http://localhost:7000/api";




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

   //차트데이터-국내환율
   chartIndi(num) {
       num = parseInt(num);
       return axios.get(USER_API_BASE_URL_CHART + '/' + num);
   }

   //차트데이터-해외환율
   chartIndiExeFor(symbol, num) {
       num = parseInt(num);
       return axios.get(USER_API_BASE_URL_CHART  + '/' + symbol + '/' + num);
   }

  //지표-유형1(국제금,WTI)
  indicators1(tableName, num) {
    num = parseInt(num);
    return axios.get(USER_API_BASE_URL_INDI1  + '/' + tableName + '/' + num);
   }

   //지표-유형2(미10년,미2년,달러인덱스,비트코인)
   indicators2(tableName, num) {
    num = parseInt(num);
    return axios.get(USER_API_BASE_URL_INDI2  + '/' + tableName + '/' + num);
   }
 
   //usdkrw 크롤링
   requestUsdkrw() {
    //alert('원달러크롤링')
    return axios.get(TEST_API_BASE_URL + "/requestUsdkrw");
    }

    //국제 금 크롤링
   requestGoldfor() {
    return axios.get(TEST_API_BASE_URL + "/requestGoldfor");
    }

    //wti 크롤링
   requestWTI() {
    return axios.get(TEST_API_BASE_URL + "/requestWTI");
    }

    //bond10 크롤링
    requestBond10() {
    return axios.get(TEST_API_BASE_URL + "/requestBond10");
    }

    //bond2 크롤링
    requestBond2() {
        return axios.get(TEST_API_BASE_URL + "/requestBond2");
    }

    //달러인덱스 크롤링
    requestDolleridx() {
        return axios.get(TEST_API_BASE_URL + "/requestDolleridx");
    }

    //유로달러 크롤링
    requestEurusd() {
        return axios.get(TEST_API_BASE_URL + "/requestEurusd");
    }

    //달러파운드 크롤링
    requestUsdgdp() {
        return axios.get(TEST_API_BASE_URL + "/requestUsdgdp");
    }

    //달러위안 크롤링
    requestUsdcny() {
        return axios.get(TEST_API_BASE_URL + "/requestUsdcny");
    }

    //달러엔 크롤링
    requestUsdjpy() {
        return axios.get(TEST_API_BASE_URL + "/requestUsdjpy");
    }

    //비트코인 크롤링
    requestBitcoin() {
        return axios.get(TEST_API_BASE_URL + "/requestBitcoin");
    }

    //상관관계 업데이트
    requestCorr() {
        return axios.get(TEST_API_BASE_URL + "/requestCorr");
    }
    
}

export default new IndApiService();