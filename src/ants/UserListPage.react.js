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
import UserApiService from "../api/UserApi";
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

function UserListPage() {
  let [userlist,userlist변경] = useState([]);
  let [userupdateview,userupdateview변경] = useState(false);
  
  let [이메일,이메일변경] = useState("");
  let [홈닉네임,홈닉네임변경] = useState("");
    

  const [show, setShow] = useState(false);

  let user = {
    'userid' : "",
    'email' : "",
    'kakaoname' : "",
    'nickname' : "",
    'phone' : "",
    'userdate' : "",
    'subscripstat' : "",
    'managestat' : ""
  }
  let [userdata,userdata변경] = useState(user);



    useEffect(() => {
      console.log("유즈이펙트 실행")
      userlistget();
    },[]);



    function userdelete(userdata){
      var result = window.confirm("삭제하시겠습니까?");
      if(result){
            UserApiService.deleteUser(userdata)
              .then(res => {             
                  console.log('***** Admin deleteUser success:', res.data);
                  $('#example').DataTable().destroy();
                  userlistget();
                  // window.location.reload(true);
                })
              .catch(err => {
                console.log('***** Admin deleteUser error:', err);
              }); 
          }else{
            console.log('삭제 취소')
          }

      
    }
  
  function userlistget(){
    UserApiService.fetchUsers()
    .then(res => {
      console.log(res.data)
      console.log("fetchUsers 성공")                
      userlist변경(res.data);
      
      setTimeout(()=>{                        
        $('#example').DataTable(
            {
              "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
              // destroy: true
            }
          );
        },100)
      })
    .catch(err => {
      console.log('***** Admin fetchUsers error:', err);
    }); 
  }

  function userupdate(data){
    setShow(true); 
    console.log(data)
    UserApiService.fetchUserByID(data)
    .then(res => {
      userdata변경(res.data);
      이메일변경(res.data.email)
      홈닉네임변경(res.data.nickname)
      })
      .catch(err => {
          console.log('***** Community fetchUserByID error:', err);
      }); 
  }
  function setupdate(){
    console.log(이메일);
    console.log(홈닉네임);
    console.log(userdata.userid);


  }

  return (
<SiteWrapper>
<Page.Content title="User LIST">
        <Grid.Row>
          <Grid.Col md={12} xl={12}>
            <Grid.Row>
            <Grid.Col xl={3} lg={3} md={3} sm={3} xs={0}>

            </Grid.Col>
            <Grid.Col xl={6} lg={6} md={6} sm={6} xs={12}>
            {show? 

              <Form.FieldSet>
                <Grid.Row>
                <Grid.Col xl={6} lg={6} md={6} sm={6} xs={6}>
                <Form.Group label="유저ID" isRequired readOnly >
                  <Form.Input name="example-text-input" readOnly value = {userdata.userid}/>
                </Form.Group>
                </Grid.Col>
                <Grid.Col xl={6} lg={6} md={6} sm={6} xs={6}>
                <Form.Group label="카카오네임" isRequired readOnly >
                  <Form.Input name="example-text-input" readOnly value = {userdata.kakaoname}/>
                </Form.Group>
                </Grid.Col>
                </Grid.Row>

                <Grid.Row>
                <Grid.Col xl={6} lg={6} md={6} sm={6} xs={6}>
                <Form.Group label="핸드폰" isRequired readOnly>
                  <Form.Input name="example-text-input" readOnly value = {userdata.phone}/>
                </Form.Group>
                </Grid.Col>
                <Grid.Col xl={6} lg={6} md={6} sm={6} xs={6}>
                <Form.Group label="가입일" className="mb-0" isRequired readOnly disabled>
                  <Form.Input name="example-text-input" readOnly value = {userdata.userdate.substring(0,19)}/>
                </Form.Group>
                </Grid.Col>
                </Grid.Row>

                <Grid.Row>
                <Grid.Col xl={6} lg={6} md={6} sm={6} xs={6}>
                <Form.Group label="이메일"  >
                  <Form.Input  value = {이메일} onChange={(e) => 이메일변경(e.target.value)} />
                </Form.Group>
                </Grid.Col>
                <Grid.Col xl={6} lg={6} md={6} sm={6} xs={6}>
                <Form.Group label="홈닉네임" className="mb-0">
                  <Form.Input value = {홈닉네임} onChange={(e) => 홈닉네임변경(e.target.value)}/>
                </Form.Group>
                </Grid.Col>
                </Grid.Row>

                  <Button.List>
                    <Button color="warning"  onClick={() => setupdate() }>수정</Button>
                    <Button color="secondary" onClick={() => setShow(false) }  >취소 </Button>
                  </Button.List>
              </Form.FieldSet>
              
            :
            null
             }
             </Grid.Col>
             </Grid.Row>
          <table id="example" className="display">
            <thead>
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
            </thead>
            <tbody>
              {
                userlist.map(function(data){
                return(
                  <tr>
                      <td>{data['userid']}</td>
                      <td>{data['email']}</td>
                      <td>{data['kakaoname']}</td>
                      <td>{data['nickname']}</td>
                      <td>{data['phone']}</td>
                      <td>{data['userdate'].substring(0,19)}</td>
                      <td>{data['subscripstat'] === 1 ? "구독" : "-" }</td>
                      <td>{data['managestat']  === 1 ? "차단" : "-" }</td>
                      <td> <Button color="yellow" onClick = {() => {userupdate(data['userid'])}}><Icon name="edit" /></Button> </td>
                      <td>  <Button color="red" onClick = {() => {userdelete(data['userid'])}}><Icon name="trash" /></Button> </td>
                  </tr>
                        )
                      })
              }
             
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
          
        {/* </div> */}

          </Grid.Col>
          {/* <Grid.Col md={6} xl={4}>
            <Card
              title="Built card"
              isCollapsible
              isClosable
              body="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Aperiam deleniti fugit incidunt, iste, itaque minima neque
            pariatur perferendis sed suscipit velit vitae voluptatem. A
            consequuntur, deserunt eaque error nulla temporibus!"
            />
          </Grid.Col>
          <Grid.Col md={6} xl={4}>
            <Card
              title="Card blue"
              isCollapsible
              isClosable
              statusColor="blue"
              body="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Aperiam deleniti fugit incidunt, iste, itaque minima neque
            pariatur perferendis sed suscipit velit vitae voluptatem. A
            consequuntur, deserunt eaque error nulla temporibus!"
            />
        	</Grid.Col> */}
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default UserListPage;
