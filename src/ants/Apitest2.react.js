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
import CommentApiService from "../api/CommentApi";
import axios from 'axios';
import './datatables.css';
// import gapi from "https://apis.google.com/js/api.js"

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

function Apitest2() {
  
  
  var [quertOutput,quertOutput변경] = useState([]);



   // Replace with your view ID.
   var VIEW_ID = '238527580';

   // Query the API and print the results to the page.
   function queryReports() {
     window.gapi.client.request({
       path: '/v4/reports:batchGet',
      //  path: '/v4/userActivity:search',
       root: 'https://analyticsreporting.googleapis.com/',
       method: 'POST',
       body: {
         reportRequests: [
           {
             viewId: VIEW_ID,
             dateRanges: [
               {
                 startDate: '10daysAgo',
                 endDate: 'today'
               }
             ],
             metrics: [
               {
                 expression: 'ga:sessions'
               }
              //  ,
              //  {
              //   expression: 'ga:users'
              //  }
             ]
           }
         ]
       }
     }).then(displayResults, console.error.bind(console));
   }
 
   function displayResults(response) {
     var formattedJson = JSON.stringify(response.result, null, 2);
     quertOutput변경(formattedJson);
   }


  return (
<SiteWrapper>
<Page.Content title="API TEST22">
{/* <script src="https://apis.google.com/js/client.js?onload=authorize"></script> */}

        <Grid.Row>
          <Grid.Col md={12} xl={12}>
            <Grid.Row>
            <Grid.Col xl={3} lg={3} md={3} sm={3} xs={0}>

            </Grid.Col>
            <Grid.Col xl={6} lg={6} md={6} sm={6} xs={12}>
            
                  <button id="auth-button" onClick= {() => {queryReports();}}>Authorize</button>
                  <textarea cols="80" rows="20" id="query-output" value={quertOutput}></textarea>
             </Grid.Col>
             </Grid.Row>

          </Grid.Col>

        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default Apitest2;
