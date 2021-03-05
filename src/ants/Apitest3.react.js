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
import {renderButton,checkSignedIn} from'../utils'

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

function Apitest3() {
  
  const [isSignedIn, setIsSignedIn] = useState(false);

  const updateSignin = (signedIn) => { //(3)
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
      console.log("init성공(3)");
    }
  };

  const init = () => { //(2)
    checkSignedIn()
      .then((signedIn) => {
        updateSignin(signedIn);
        console.log("init성공(2)");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    window.gapi.load("auth2", init); //(1)
  },[]);
  return (
<SiteWrapper>
<Page.Content title="API TEST333444">
{/* <script src="https://apis.google.com/js/client.js?onload=authorize"></script> */}

        <Grid.Row>
          <Grid.Col md={12} xl={12}>
            <Grid.Row>
            <Grid.Col xl={3} lg={3} md={3} sm={3} xs={0}>

            </Grid.Col>
            <Grid.Col xl={6} lg={6} md={6} sm={6} xs={12}>
            {!isSignedIn ? (
                <div id="signin-button"></div>
              ) : (
                <div>Coming soon...</div>
              )}
             </Grid.Col>
             </Grid.Row>

          </Grid.Col>

        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default Apitest3;
