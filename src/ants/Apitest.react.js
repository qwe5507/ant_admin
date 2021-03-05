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

function Apitest() {
  
  
  var [quertOutput,quertOutput변경] = useState([]);



  var CLIENT_ID = "46053362336-2p4bla0m72ejj3umng35l0c4e0fhmpvg.apps.googleusercontent.com"; // <-- 발급받은 Client ID 입력 

  // Set authorized scope.
  var SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];

  function authorize(event) {
    if (window.gapi.client.request !== undefined) {
    // console.log
    // Handles the authorization flow.
    // `immediate` should be false when invoked from the button click.
    // var useImmdiate = event ? false : true;
    var authData = {
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: false
    };

    window.gapi.auth.authorize(authData, function (response) {
        // var authButton = document.getElementById('auth-button');
        if (response.error) {
            // authButton.hidden = false;
        }
        else {
            // authButton.hidden = true;
            queryAccounts();
        }
    });
    clearInterval( window.interval );
    }
}

function queryAccounts() {
    // Load the Google Analytics client library.
    window.gapi.client.load('analytics', 'v3').then(function () {

        // Get a list of all Google Analytics accounts for this user
        window.gapi.client.analytics.management.accounts.list().then(handleAccounts);
    });
}

function handleAccounts(response) {
    // Handles the response from the accounts list method.
    if (response.result.items && response.result.items.length) {
        // Get the first Google Analytics account.
        var firstAccountId = response.result.items[0].id;

        // Query for properties.
        queryProperties(firstAccountId);
    } else {
        console.log('No accounts found for this user.');
    }
}

function queryProperties(accountId) {
    // Get a list of all the properties for the account.
    window.gapi.client.analytics.management.webproperties.list(
        { 'accountId': accountId })
      .then(handleProperties)
      .then(null, function (err) {
          // Log any errors.
          console.log(err);
      });
}

function handleProperties(response) {
    // Handles the response from the webproperties list method.
    if (response.result.items && response.result.items.length) {

        // Get the first Google Analytics account
        var firstAccountId = response.result.items[0].accountId;

        // Get the first property ID
        var firstPropertyId = response.result.items[0].id;

        // Query for Views (Profiles).
        queryProfiles(firstAccountId, firstPropertyId);
    } else {
        console.log('No properties found for this user.');
    }
}

function queryProfiles(accountId, propertyId) {
    // Get a list of all Views (Profiles) for the first property
    // of the first Account.
    window.gapi.client.analytics.management.profiles.list({
        'accountId': accountId,
        'webPropertyId': propertyId
    })
    .then(handleProfiles)
    .then(null, function (err) {
        // Log any errors.
        console.log(err);
    });
}

function handleProfiles(response) {
    // Handles the response from the profiles list method.
    if (response.result.items && response.result.items.length) {
        // Get the first View (Profile) ID.
        var firstProfileId = response.result.items[0].id;
        // Query the Core Reporting API.
        queryCoreReportingApi(firstProfileId);

    } else {
        console.log('No views (profiles) found for this user.');
    }
}

function queryCoreReportingApi(profileId) {
    // Query the Core Reporting API for the number sessions for
    // the past seven days.
    window.gapi.client.analytics.data.ga.get({
        'ids': 'ga:' + profileId,
        // ## 조회 시작일자
        'start-date': 'today',
        // ## 조회 마지막일자
        'end-date': 'today',
        // ##  -- 사용자, 신규 방문자, 세션, 이탈률, 평균세션시간(초), 페이지뷰 수, 세션당 페이지수, 사용자당 세션 수 
        'metrics': 'ga:users,ga:newUsers,ga:sessions,ga:bounceRate,ga:avgSessionDuration,ga:pageviews,ga:pageviewsPerSession,ga:sessionsPerUser',
        // ##  -- 소스 , 매체
        'dimensions': 'ga:source,ga:medium'
    })
    .then(function (response) {
        var formattedJson = JSON.stringify(response.result, null, 2);
        quertOutput변경(formattedJson);
    })
    .then(null, function (err) {
        // Log any errors.
        console.log(err);
    });
}


  return (
<SiteWrapper>
<Page.Content title="API TEST">
{/* <script src="https://apis.google.com/js/client.js?onload=authorize"></script> */}

        <Grid.Row>
          <Grid.Col md={12} xl={12}>
            <Grid.Row>
            <Grid.Col xl={3} lg={3} md={3} sm={3} xs={0}>

            </Grid.Col>
            <Grid.Col xl={6} lg={6} md={6} sm={6} xs={12}>
            
                  <button id="auth-button" onClick= {() => {authorize();}}>Authorize</button>
                  <textarea cols="80" rows="20" id="query-output" value={quertOutput}></textarea>
             </Grid.Col>
             </Grid.Row>

          </Grid.Col>

        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default Apitest;
