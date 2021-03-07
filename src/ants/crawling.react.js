// @flow
import React, { useState, useEffect } from "react"

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
// import { Alert } from 'react-bootstrap';
import IndApiService from "../api/IndApi";
import axios from 'axios';

import {
  Container,
  Alert,
  Grid,
  Card,
  Button,
  Form,
  Icon,
  Avatar,
  Profile,
  List,
  Media,
  Text,
  Comment,
  Page
} from "tabler-react";

import SiteWrapper from "../SiteWrapper.react";

function CrawlingPage() {
  let [usdkrw, usdkrwbyun] = useState([]);
  let [eurusd, eurusdbyun] = useState([]);
  let [usdgbp, usdgbpbyun] = useState([]);
  let [usdjpy, usdjpybyun] = useState([]);
  let [usdcny, usdcnybyun] = useState([]);
  
  let [wti,wtibyun] = useState([]);
  let [dolleridx,dolleridxbyun] = useState([]);
  let [bond10,bond10byun] = useState([]);
  let [bond2,bond2byun] = useState([]);
  let [goldfor,goldforbyun] = useState([]);
  let [bitcoin,bitcoinbyun] = useState([]);
  
  let indicator = {
    'name' : "",
  }
    useEffect(() => {
      console.log("유즈이펙트 실행")
      bitcoinGet();
      dolleridxGet();
      bond2Get();
      bond10Get();
      goldforGet();
      wtiGet();
      usdkrwGet();
      eurusdGet();
      usdcnyGet();
      usdgbpGet();
      usdjpyGet();
    }, []);

    function usdkrwGet(){
      console.log("usdkrw")
      IndApiService.chartIndi(1)
      .then(res => {
        console.log(res.data)
        usdkrwbyun(res.data)    
         
        setTimeout(()=>{                        
          $('#example').DataTable(
              {
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                 destroy: true
              }
            );
          },100)
        })
      .catch(err => {
        console.log(err);
      }); 
    }

    function eurusdGet(){
      IndApiService.chartIndiExeFor("EURUSD", 1)
      .then(res => {
        console.log(res.data)
        eurusdbyun(res.data)    
         
        setTimeout(()=>{                        
          $('#example').DataTable(
              {
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                 destroy: true
              }
            );
          },100)
        })
      .catch(err => {
        console.log(err);
      }); 
    }

    function usdcnyGet(){
      IndApiService.chartIndiExeFor("USDCNY", 1)
      .then(res => {
        console.log(res.data)
        usdcnybyun(res.data)    
         
        setTimeout(()=>{                        
          $('#example').DataTable(
              {
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                 destroy: true
              }
            );
          },100)
        })
      .catch(err => {
        console.log(err);
      }); 
    }

    function usdgbpGet(){
      IndApiService.chartIndiExeFor("USDGBP", 1)
      .then(res => {
        console.log(res.data)
        usdgbpbyun(res.data)    
         
        setTimeout(()=>{                        
          $('#example').DataTable(
              {
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                 destroy: true
              }
            );
          },100)
        })
      .catch(err => {
        console.log(err);
      }); 
    }

    function usdjpyGet(){
      IndApiService.chartIndiExeFor("USDJPY", 1)
      .then(res => {
        console.log(res.data)
        usdjpybyun(res.data)    
         
        setTimeout(()=>{                        
          $('#example').DataTable(
              {
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                 destroy: true
              }
            );
          },100)
        })
      .catch(err => {
        console.log(err);
      }); 
    }

    function wtiGet(){
      IndApiService.indicators1("wti", 1)
      .then(res => {
        console.log(res.data)
        wtibyun(res.data)    
         
        setTimeout(()=>{                        
          $('#example').DataTable(
              {
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                 destroy: true
              }
            );
          },100)
        })
      .catch(err => {
        console.log(err);
      }); 
    }

    function dolleridxGet(){
      IndApiService.indicators2("dolleridx", 1)
      .then(res => {
        console.log(res.data)
        dolleridxbyun(res.data)    
         
        setTimeout(()=>{                        
          $('#example').DataTable(
              {
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                 destroy: true
              }
            );
          },100)
        })
      .catch(err => {
        console.log(err);
      }); 
    }

  function bond2Get(){
      IndApiService.indicators2("bond2", 1)
      .then(res => {
        console.log(res.data)
        bond2byun(res.data)    
         
        setTimeout(()=>{                        
          $('#example').DataTable(
              {
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                destroy: true
              }
            );
          },100)
        })
      .catch(err => {
        console.log(err);
      }); 
    }

  function bond10Get(){
      IndApiService.indicators2("bond10", 1)
      .then(res => {
        console.log(res.data)
        bond10byun(res.data)    
         
        setTimeout(()=>{                        
          $('#example').DataTable(
              {
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                destroy: true
              }
            );
          },100)
        })
      .catch(err => {
        console.log(err);
      }); 
    }
  
    function goldforGet(){
      IndApiService.indicators1("goldfor", 1)
      .then(res => {
        console.log(res.data)
        goldforbyun(res.data)    
         
        setTimeout(()=>{                        
          $('#example').DataTable(
              {
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                destroy: true
              }
            );
          },100)
        })
      .catch(err => {
        console.log(err);
      }); 
    }

    function receivedUsdkrw() { 
      console.log("테스트")
      IndApiService.requestUsdkrw()
      .then(res => {
        usdkrwGet();
        alert("작업이 종료되었습니다")
      })
      .catch(err => {
        console.log(err);
        alert("크롤링 시 오류가 발생했습니다.")
      }); 
      
    }

  function bitcoinGet(){
    IndApiService.indicators2("bitcoin", 1)
    .then(res => {
      console.log(res.data)
      bitcoinbyun(res.data)    
       
      setTimeout(()=>{                        
        $('#example').DataTable(
            {
              "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
              destroy: true
            }
          );
        },100)
      })
    .catch(err => {
      console.log(err);
    }); 
  }

  return (
    
<SiteWrapper>
  
    <div align="center" style={{padding:"10px"}}>크롤링 작업이 완료되면 "작업이 완료되었습니다" 라는 메세지가 출력됩니다. <br/>
   메세지 출력 시까지 작업을 중단하지 말고 기다려 주세요.</div> 
<Page.Content title="Cralling" substring="gkgk">

        <Grid.Row>
          <Grid.Col md={12} xl={12}>
           
          <table id="example" className="display">
            <thead>
            
                <tr align = "center">
                    <th >최신일자</th>
                    <th>지표이름</th>
                    <th>크롤링</th>
                </tr>
            </thead>
            <tbody>
            
              {
                  usdkrw.map(function(data){
                   return(
                  <tr align = "center">
                      <td>{data['dates'].substring(0,10)}</td>
                      <td>원/달러</td>
                      <td><Button color="red"  onClick={ receivedUsdkrw }>Cralling Start</Button> </td>
                  </tr>
                   )
                  })   
              }
              {
                
                  eurusd.map(function(data){
                   return(
                  <tr align = "center">
                      <td>{data['dates'].substring(0,10)}</td>
                      <td>달러/유로</td>
                      <td><Button color="red">Cralling Start</Button> </td>
                  </tr>
                   )
                  })
              }
              {
                
                  usdgbp.map(function(data){
                   return(
                  <tr align = "center">
                      <td>{data['dates'].substring(0,10)}</td>
                      <td>영국 파운드/달러</td>
                      <td><Button color="red">Cralling Start</Button> </td>
                  </tr>
                   )
                  })
              }
              {
                
                  usdjpy.map(function(data){
                   return(
                  <tr align = "center">
                      <td>{data['dates'].substring(0,10)}</td>
                      <td>일본 엔/달러</td>
                      <td><Button color="red">Cralling Start</Button> </td>
                  </tr>
                   )
                  })
              }
              {
                 usdcny.map(function(data){
                  return(
                  <tr align = "center">
                      <td>{data['dates'].substring(0,10)}</td>
                      <td>중국 위안/달러</td>
                      <td><Button color="red">Cralling Start</Button> </td>
                  </tr>
                   )
                  })
              }
                {
                 dolleridx.map(function(data){
                  return(
                  <tr align = "center">
                      <td>{data['dates'].substring(0,10)}</td>
                      <td>달러인덱스</td>
                      <td><Button color="red">Cralling Start</Button> </td>
                  </tr>
                   )
                  })
              }
              {

                  wti.map(function(data){
                   return(
                  <tr align = "center">
                      <td>{data['dates'].substring(0,10)}</td>
                      <td>WTI</td>
                      <td><Button color="red">Cralling Start</Button> </td>
                  </tr>
                     )
                    })
              }
              {
                goldfor.map(function(data){
                  return(
                  <tr align = "center">
                      <td>{data['dates'].substring(0,10)}</td>
                      <td>국제 금</td>
                      <td><Button color="red">Cralling Start</Button> </td>
                  </tr>
                    )
                  })
              }
              {
                 bond10.map(function(data){
                  return(
                  <tr align = "center">
                      <td>{data['dates'].substring(0,10)}</td>
                      <td>미 10년 채권수익률</td>
                      <td><Button color="red">Cralling Start</Button> </td>
                  </tr>
                    )
                  })
              }
              {
                bond2.map(function(data){
                  return(
                  <tr align = "center">
                      <td>{data['dates'].substring(0,10)}</td>
                      <td>미 2년 채권수익률</td>
                      <td><Button color="red">Cralling Start</Button> </td>
                  </tr>
                   )
                  })
              }
              {
                 bitcoin.map(function(data){
                  return(
                  <tr align = "center">
                   
                      <td>{data['dates'].substring(0,10)}</td>
                      <td>비트코인</td>
                      <td><Button color="red">Cralling Start</Button> </td>
                    
                  </tr>
                    )
                  })
              }
             
            </tbody>
            <tfoot>
                
            </tfoot>
        </table>
    
          </Grid.Col>
         
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default CrawlingPage;
