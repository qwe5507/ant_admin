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

function CommentListPage() {
  let [commentlist,commentlist변경] = useState([]);
  // let [userupdateview,userupdateview변경] = useState(false);
  
  let [이메일,이메일변경] = useState("");
  let [홈닉네임,홈닉네임변경] = useState("");
    

  const [show, setShow] = useState(false);

  let comment = {
    'comment_id' : "",
    'board_id' : "",
    'userid' : "",
    'comment_createdata' : "",
    'comment_LikeNum' : "",
     'comment_content' : "",
     'comment_hidden' : "",
     'MANAGER_ID' : ""
    }
  let [commentdata,commentdata변경] = useState(comment);



    useEffect(() => {
      console.log("유즈이펙트 실행")
      commentlistget();
    },[]);
  
  function commentlistget(){
    CommentApiService.fetchComments()
    .then(res => {
      console.log(res.data)
      console.log("fetchComments 성공")                
      commentlist변경(res.data);
      
      setTimeout(()=>{                        
        $('#example').DataTable(
            {
              "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
              // scrollY: "400px",
              // "iDisplayLength": 25,
              // "bDestroy": true,
              // "bJQueryUI": true,
              // "sPaginationType": "full_numbers",
              // "bAutoWidth": false
              // scrollX: true,
            //   fixedColumns: {
            //                 leftColumns: 1
            //  }
            }
          );
        },100)
      })
    .catch(err => {
      console.log('***** Admin fetchComments error:', err);
    }); 
  }

  function commentshow(data){
    setShow(true);

    CommentApiService.fetchCommentByID(data.comment_id)
      .then(res => {
        console.log(res.data)
        console.log("fetchCommentByID 성공")                
        commentdata변경(res.data);
        

        })
      .catch(err => {
        console.log('***** Admin fetchCommentByID error:', err);
      }); 
  

  }

  function commentHidden(data){
    console.log(data);
    var result = window.confirm("해당 댓글을 숨김처리하시겠습니까?");
    if(result){
      if(data.comment_hidden == 0){
        data.comment_hidden = 1;
        CommentApiService.editComment(data) 
        .then(res => {
          console.log(res.data)
          console.log("editComment 성공")
          $('#example').DataTable().destroy();
          commentlistget();
          })
        .catch(err => {
          console.log('***** Admin editComment error:', err);
        }); 
      }else{

      }
    }
  }
  function commentDisHidden(data){
    console.log(data);
    var result = window.confirm("해당 댓글을 숨김 해체 하시겠습니까?");
    if(result){
      if(data.comment_hidden == 1){
        data.comment_hidden = 0;
        CommentApiService.editComment(data) 
        .then(res => {
          console.log(res.data)
          console.log("editComment 성공")
          $('#example').DataTable().destroy();
          commentlistget();
          })
        .catch(err => {
          console.log('***** Admin editComment error:', err);
        }); 
      }else{
        // window.alert("이미 숨김처리된 게시물 입니다.");
      }
    }
  }
  function commentDelete(data){
    console.log(data);
    var result = window.confirm("해당 댓글을 삭제 하시겠습니까?");
      if(result){
        // data.board_hidden = 0;
        CommentApiService.deleteComment(data.comment_id) 
        .then(res => {
          console.log(res.data)
          console.log("deleteComment 성공")
          $('#example').DataTable().destroy();
          commentlistget();
          setShow(false);
          })
        .catch(err => {
          console.log('***** Admin deleteComment error:', err);
        }); 
      }else{
        // window.alert("이미 숨김처리된 게시물 입니다.");
      }
    
  }
 
  return (
<SiteWrapper>
<Page.Content title="Comment LIST">
        <Grid.Row>
          <Grid.Col md={12} xl={12}>
            <Grid.Row>
            <Grid.Col xl={3} lg={3} md={3} sm={3} xs={0}>

            </Grid.Col>
            <Grid.Col xl={6} lg={6} md={6} sm={6} xs={12}>
            {show? 

              <Form.FieldSet>
                <Grid.Row>
                <Grid.Col xl={1} lg={1} md={1} sm={1} xs={1}></Grid.Col>
                <Grid.Col xl={3} lg={3} md={3} sm={3} xs={3}>
                <Form.Group label="댓글ID" isRequired readOnly >
                  <Form.Input name="example-text-input" readOnly value = {commentdata.comment_id}/>
                </Form.Group>
                </Grid.Col>
                <Grid.Col xl={3} lg={3} md={3} sm={3} xs={3}>
                <Form.Group label="게시물ID" isRequired readOnly >
                  <Form.Input name="example-text-input" readOnly value = {commentdata.board_id}/>
                </Form.Group>
                </Grid.Col>
                <Grid.Col xl={4} lg={4} md={4} sm={4} xs={4}>
                <Form.Group label="홈닉네임" isRequired readOnly >
                  <Form.Input name="example-text-input" readOnly value = {commentdata.nickname}/>
                </Form.Group>
                </Grid.Col>
                <Grid.Col xl={1} lg={1} md={1} sm={1} xs={1}></Grid.Col>
                </Grid.Row>

                <Grid.Row>
                <Grid.Col xl={1} lg={1} md={1} sm={1} xs={1}></Grid.Col>
                <Grid.Col xl={5} lg={5} md={5} sm={5} xs={5}>
                <Form.Group label="작성일" isRequired readOnly>
                  <Form.Input name="example-text-input" readOnly value = {commentdata.comment_createdata.substring(0,19)}/>
                </Form.Group>
                </Grid.Col>
                <Grid.Col xl={5} lg={5} md={5} sm={5} xs={5}>
                <Form.Group label="좋아요수" className="mb-0" isRequired readOnly disabled>
                  <Form.Input name="example-text-input" readOnly value = {commentdata.comment_LikeNum}/>
                </Form.Group>
                </Grid.Col>
                <Grid.Col xl={1} lg={1} md={1} sm={1} xs={1}></Grid.Col>
                </Grid.Row>
                <Grid.Row>
                <Grid.Col xl={1} lg={1} md={1} sm={1} xs={1}></Grid.Col>
                  <Grid.Col md={10} xl={10}>
                      <Card
                        statusColor="yellow"
                        body={commentdata.comment_content}
                      />
                    </Grid.Col>
                  <Grid.Col xl={1} lg={1} md={1} sm={1} xs={1}></Grid.Col>
                  </Grid.Row>
                  <Grid.Row>
                      <Grid.Col md={0} xl={7}></Grid.Col>
                      <Grid.Col md={12} xl={5}>
                      <Button.List>
                        {commentdata.comment_hidden === 0 ?
                        <Button color="warning"  onClick={() => commentHidden(commentdata) } >숨김</Button>
                        : 
                        <Button color="warning"  onClick={() => commentDisHidden(commentdata) } >숨김해체</Button>
                        }
                         <Button color="danger" onClick={() => commentDelete(commentdata) } >삭제 </Button>
                        <Button color="secondary" onClick={() => setShow(false) }  >취소 </Button>
                      </Button.List>
                      </Grid.Col>
                  </Grid.Row>
              </Form.FieldSet>
              
            :
            null
             }
             </Grid.Col>
             </Grid.Row>
          <table id="example" className="table">
            <thead>
                <tr>
                    <th>댓글ID</th>
                    <th>게시물ID</th>
                    <th>홈닉네임</th>
                    <th>내용</th>
                    <th>작성일</th>
                    <th>좋아요수</th>
                    <th>숨김</th>
                    <th>관리자ID</th>
                </tr>
            </thead>
            <tbody>
              {
                commentlist.map(function(data){
                return(
                  <tr  onClick = {() => {commentshow(data)}}>
                      <td>{data['comment_id']}</td>
                      <td>{data['board_id']}</td>
                      <td>{data['nickname']}</td>
                      <td>{data['comment_content']}</td>
                      <td>{data['comment_createdata'] === null ? "-": data['comment_createdata'].substring(0,19)}</td>
                      <td> {data['comment_LikeNum'] }</td>
                      <td>{data['comment_hidden'] === 0 ? "-": "숨김"}</td>
                      <td>{data['MANEGER_ID'] === undefined ? "-": data['manager_id']}</td>

                  </tr>
                        )
                      })
              }
             
            </tbody>
            <tfoot>
                <tr>
                    <th>댓글ID</th>
                    <th>게시물ID</th>
                    <th>홈닉네임</th>
                    <th>내용</th>
                    <th>작성일</th>
                    <th>좋아요수</th>
                    <th>숨김</th>
                    <th>관리자ID</th>
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

export default CommentListPage;
