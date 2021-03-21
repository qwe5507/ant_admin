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
import ReactHtmlParser from 'react-html-parser';


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

function BoardListPage() {
  let [boardlist,boardlist변경] = useState([]);
  let [boardCommentlist,boardCommentlist변경] = useState([]);
  let [userupdateview,userupdateview변경] = useState(false);
  
  let [이메일,이메일변경] = useState("");
  let [홈닉네임,홈닉네임변경] = useState("");
    

  const [show, setShow] = useState(false);
  const [twoshow,twoshow변경] = useState(false);

  let board = {
    'userid' : "",
    'board_id' : "",
    'nickname' : "",
    'board_title' : "",
    'board_content' : "",
     'board_createdata' : "",
     'board_modifydata' : "",
     'board_hidden' : "",
     'MANAGER_ID' : "",
     'board_viewnum' : "",
     'board_LikeNum' : ""
  }
  let [boarddata,boarddata변경] = useState(board);



    useEffect(() => {
      console.log("유즈이펙트 실행")
      boardlistget();
    },[]);
  
  function boardlistget(){
    BoardApiService.fetchBoards()
    .then(res => {
      console.log(res.data)
      console.log("fetchBoard 성공")                
      boardlist변경(res.data);
      
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
      console.log('***** Admin fetchBoard error:', err);
    }); 
  }

  function boardshow(data){
    twoshow변경(false);
    setShow(true);
    
      BoardApiService.fetchBoardByID(data.board_id)
      .then(res => {
        console.log(res.data)
        console.log("fetchBoardByID 성공")                
        boarddata변경(res.data);
        

        })
      .catch(err => {
        console.log('***** Admin fetchBoardByID error:', err);
      }); 
  

  }

  function boardHidden(data){
    console.log(data);
    var result = window.confirm("해당 게시물을 숨김처리하시겠습니까?");
    if(result){
      if(data.board_hidden == 0){
        data.board_hidden = 1;
        BoardApiService.editBoard(data) 
        .then(res => {
          console.log(res.data)
          console.log("editBoard 성공")
          $('#example').DataTable().destroy();
          boardlistget();
          })
        .catch(err => {
          console.log('***** Admin editBoard error:', err);
        }); 
      }else{
        // window.alert("이미 숨김처리된 게시물 입니다.");
      }
    }
  }
  function boardDisHidden(data){
    console.log(data);
    var result = window.confirm("해당 게시물을 숨김 해체 하시겠습니까?");
    if(result){
      if(data.board_hidden == 1){
        data.board_hidden = 0;
        BoardApiService.editBoard(data) 
        .then(res => {
          console.log(res.data)
          console.log("editBoard 성공")
          $('#example').DataTable().destroy();
          boardlistget();
          })
        .catch(err => {
          console.log('***** Admin editBoard error:', err);
        }); 
      }else{
        // window.alert("이미 숨김처리된 게시물 입니다.");
      }
    }
  }
  function boardDelete(data){
    console.log(data);
    var result = window.confirm("해당 게시물을 삭제 하시겠습니까?");
      if(result){
        // data.board_hidden = 0;
        BoardApiService.deleteBoard(data.board_id) 
        .then(res => {
          console.log(res.data)
          console.log("deleteBoard 성공")
          $('#example').DataTable().destroy();
          boardlistget();
          setShow(false);
          })
        .catch(err => {
          console.log('***** Admin editBoard error:', err);
        }); 
      }else{
        // window.alert("이미 숨김처리된 게시물 입니다.");
      }
    
  }
  function commentshow(data) {
    
    CommentApiService.fetchCommentsByBoardID(data.board_id)
    .then(res => {
      console.log(res.data)
      console.log("fetchCommentsByBoardID 성공")
      boardCommentlist변경(res.data);
      })
    .catch(err => {
      console.log('***** Admin fetchCommentsByBoardID error:', err);
    }); 

    twoshow변경(true);
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
          boardshow(data.board_id);
          twoshow변경(true)
          // $('#example').DataTable().destroy();
          // commentlistget();
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
          boardshow(data.board_id);
          twoshow변경(true)
          // $('#example').DataTable().destroy();
          // commentlistget();
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
          boardshow(data.board_id);
          twoshow변경(false);
          // $('#example').DataTable().destroy();
          // commentlistget();
          // setShow(false);
          })
        .catch(err => {
          console.log('***** Admin deleteComment error:', err);
        }); 
      }else{
        // window.alert("이미 숨김처리된 게시물 입니다.");
      }
    
  }

  var 탭UI = { 
    boardstate : <p>상품정보</p>,
    commentstate : <p>배송관련</p>
  }
  return (
<SiteWrapper>
<Page.Content title="Board LIST">
        <Grid.Row>
          <Grid.Col md={12} xl={12}>

            <Grid.Row>
            <Grid.Col xl={3} lg={3} md={3} sm={3} xs={0}>

            </Grid.Col>
            
            <Grid.Col xl={6} lg={6} md={6} sm={6} xs={12}>
            {show? 

              <Form.FieldSet>

                <Grid.Row>
                <Grid.Col xl={8} lg={8} md={8} sm={8} xs={8}></Grid.Col>
                <Grid.Col xl={4} lg={4} md={4} sm={4} xs={4}>
                <Button RootComponent="a" color="primary" size="sm" onClick = {() => {twoshow변경(false)}}>
                        게시물
                      </Button>
                      <Button
                        RootComponent="a"
                        color="secondary"
                        size="sm"
                        className="ml-2"
                        onClick = {() => {commentshow(boarddata)}}
                        >
                        댓글 관리
                      </Button>
                 </Grid.Col>
                </Grid.Row>

                { !twoshow ?
                <div>
                <Grid.Row>
                <Grid.Col xl={6} lg={6} md={6} sm={6} xs={6}>
                <Form.Group label="게시판ID" isRequired readOnly >
                  <Form.Input name="example-text-input" readOnly value = {boarddata.board_id}/>
                </Form.Group>
                </Grid.Col>
                <Grid.Col xl={6} lg={6} md={6} sm={6} xs={6}>
                <Form.Group label="홈닉네임" isRequired readOnly >
                  <Form.Input name="example-text-input" readOnly value = {boarddata.nickname}/>
                </Form.Group>
                </Grid.Col>
                </Grid.Row>

                <Grid.Row>
                <Grid.Col xl={6} lg={6} md={6} sm={6} xs={6}>
                <Form.Group label="작성일" isRequired readOnly>
                  <Form.Input name="example-text-input" readOnly value = {boarddata.board_createdata.substring(0,19)}/>
                </Form.Group>
                </Grid.Col>
                <Grid.Col xl={3} lg={3} md={3} sm={3} xs={3}>
                <Form.Group label="조회수" className="mb-0" isRequired readOnly disabled>
                  <Form.Input name="example-text-input" readOnly value = {boarddata.board_viewnum}/>
                </Form.Group>
                </Grid.Col>
                <Grid.Col xl={3} lg={3} md={3} sm={3} xs={3}>
                <Form.Group label="좋아요수" className="mb-0" isRequired readOnly disabled>
                  <Form.Input name="example-text-input" readOnly value = {boarddata.board_LikeNum}/>
                </Form.Group>
                </Grid.Col>
                
                </Grid.Row>


                <Grid.Col md={12} xl={12}>
                    <Card
                      title={boarddata.board_title}
                      // isCollapsible
                      // isClosable
                      statusColor="yellow"
                      body={ReactHtmlParser(boarddata.board_content)}
                    />
                  </Grid.Col>
                  <Grid.Row>
                      <Grid.Col md={0} xl={7}></Grid.Col>
                      <Grid.Col md={12} xl={5}>
                      <Button.List>
                        {boarddata.board_hidden === 0 ?
                        <Button color="warning"  onClick={() => boardHidden(boarddata) } >숨김</Button>
                        : 
                        <Button color="warning"  onClick={() => boardDisHidden(boarddata) } >숨김해체</Button>
                        }
                        <Button color="danger" onClick={() => boardDelete(boarddata) } >삭제 </Button>
                        <Button color="secondary" onClick={() => setShow(false) }  >취소 </Button>
                      </Button.List>
                      </Grid.Col>
                  </Grid.Row>
                  </div>
                  :
                  boardCommentlist.map(function(data){
                    return(
                      <div>
                              <Form.FieldSet>
                                  <Grid.Row>
                                  <Grid.Col xl={1} lg={1} md={1} sm={1} xs={1}></Grid.Col>
                                  <Grid.Col xl={3} lg={3} md={3} sm={3} xs={3}>
                                  <Form.Group label="댓글ID" isRequired readOnly >
                                    <Form.Input name="example-text-input" readOnly value = {data.comment_id}/>
                                  </Form.Group>
                                  </Grid.Col>
                                  <Grid.Col xl={3} lg={3} md={3} sm={3} xs={3}>
                                  <Form.Group label="게시물ID" isRequired readOnly >
                                    <Form.Input name="example-text-input" readOnly value = {data.board_id}/>
                                  </Form.Group>
                                  </Grid.Col>
                                  <Grid.Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                  <Form.Group label="홈닉네임" isRequired readOnly >
                                    <Form.Input name="example-text-input" readOnly value = {data.nickname}/>
                                  </Form.Group>
                                  </Grid.Col>
                                  <Grid.Col xl={1} lg={1} md={1} sm={1} xs={1}></Grid.Col>
                                  </Grid.Row>
                  
                                  <Grid.Row>
                                  <Grid.Col xl={1} lg={1} md={1} sm={1} xs={1}></Grid.Col>
                                  <Grid.Col xl={5} lg={5} md={5} sm={5} xs={5}>
                                  <Form.Group label="작성일" isRequired readOnly>
                                    <Form.Input name="example-text-input" readOnly value = {data.comment_createdata.substring(0,19)}/>
                                  </Form.Group>
                                  </Grid.Col>
                                  <Grid.Col xl={5} lg={5} md={5} sm={5} xs={5}>
                                  <Form.Group label="좋아요수" className="mb-0" isRequired readOnly disabled>
                                    <Form.Input name="example-text-input" readOnly value = {data.comment_LikeNum}/>
                                  </Form.Group>
                                  </Grid.Col>
                                  <Grid.Col xl={1} lg={1} md={1} sm={1} xs={1}></Grid.Col>
                                  </Grid.Row>
                                  <Grid.Row>
                                  <Grid.Col xl={1} lg={1} md={1} sm={1} xs={1}></Grid.Col>
                                    <Grid.Col md={10} xl={10}>
                                        <Card
                                          statusColor="yellow"
                                          body={data.comment_content}
                                        />
                                      </Grid.Col>
                                    <Grid.Col xl={1} lg={1} md={1} sm={1} xs={1}></Grid.Col>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Col md={0} xl={7}></Grid.Col>
                                        <Grid.Col md={12} xl={5}>
                                        <Button.List>
                                          {data.comment_hidden === 0 ?
                                          <Button color="warning"  onClick={() => commentHidden(data) } >숨김</Button>
                                          : 
                                          <Button color="warning"  onClick={() => commentDisHidden(data) } >숨김해체</Button>
                                          }
                                          <Button color="danger" onClick={() => commentDelete(data) } >삭제 </Button>
                                        </Button.List>
                                        </Grid.Col>
                                    </Grid.Row>

                                </Form.FieldSet>
                                </div>
     
                            )

                          })

            }

              </Form.FieldSet>
            :
            null
             }
              

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
              {
                boardlist.map(function(data){
                return(
                  <tr onClick = {() => {boardshow(data)}}>
                      <td>{data['board_id']}</td>
                      <td>{data['nickname']}</td>
                      <td>{data['board_title']}</td>
                      <td>{ReactHtmlParser(data['board_content'].trim())}</td>
                      <td >{data['board_createdata'].substring(0,19)}</td>
                      <td>{data['board_modifydata'] === null ? "-": data['board_modifydata'].substring(0,19)}</td>
                      <td>{data['board_viewnum'] }</td>
                      <td> {data['board_LikeNum'] }</td>
                      <td>{data['board_hidden'] === 0 ? "-": "숨김"}</td>
                      <td>{data['MANEGER_ID'] === undefined ? "-": data['manager_id']}</td>

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

export default BoardListPage;
