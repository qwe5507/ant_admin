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
import BoardApiService from "../api/BoardApi";
import CommentApiService from "../api/CommentApi";
import axios from 'axios';
import './datatables.css';


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

function DeclarePage() {

  return (
<SiteWrapper>
<Page.Content title="Declare LIST">
        <Grid.Row>
          <Grid.Col md={12} xl={12}>

            <Grid.Row>
            <Grid.Col xl={3} lg={3} md={3} sm={3} xs={0}>

            </Grid.Col>
            
            <Grid.Col xl={6} lg={6} md={6} sm={6} xs={12}>
           

             </Grid.Col>
             </Grid.Row>
          <table id="example" className="table">
            <thead>
                <tr>
                    <th>게시판ID</th>
                    <th>홈닉네임</th>
                    <th>제목</th>
                    <th>내용</th>
                    <th>작성일</th>
                    <th>수정일</th>
                    <th>조회수</th>
                    <th>좋아요수</th>
                    <th>숨김</th>
                    <th>관리자ID</th>
                </tr>
            </thead>
            <tbody>
             
             
            </tbody>
            <tfoot>
                <tr>
                  <th>유저ID</th>
                    <th>이메일</th>
                    <th>카카오닉네임</th>
                    <th>홈닉네임</th>
                    <th>핸드폰</th>
                    <th>가입일</th>
                    <th>구독</th>
                    <th>차단</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>
            </tfoot>
        </table>
          </Grid.Col>

        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default DeclarePage;
