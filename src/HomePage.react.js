// @flow
// import * as React from "react";
import React, { useState, useEffect } from "react"
import {
  Page,
  Avatar,
  Icon,
  Grid,
  Card,
  Text,
  Table,
  Alert,
  Progress,
  colors,
  Dropdown,
  Button,
  StampCard,
  StatsCard,
  ProgressCard,
  Badge,
} from "tabler-react";

import C3Chart from "react-c3js";

import SiteWrapper from "./SiteWrapper.react";
import { renderButton, checkSignedIn } from './utils';
import UserApiService from './api/UserApi';

function Home() {



  const [isSignedIn, setIsSignedIn] = useState(false);
  const [totalUserCount, totalUserCount변경] = useState(0);
  const [subUserCount, subUserCount변경] = useState(0);

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
        queryReports();
        queryReports1();
        queryReports2();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    window.gapi.load("auth2", init); //(1)
    //==============
    UserApiService.fetchUsersTotalCount()
      .then(res => {
        // console.log(res.data)
        totalUserCount변경(res.data);
      })
      .catch(err => {
        console.log('***** Admin fetchUsersCount error:', err);
      });
    //==============
    UserApiService.fetchUsersSubCount()
      .then(res => {
        // console.log(res.data)
        subUserCount변경(res.data);
      })
      .catch(err => {
        console.log('***** Admin fetchUsersCount error:', err);
      });
    //==============
  }, []);


  // ================================================
  var [gaSession, gaSession변경] = useState(0);
  var [gaSessionago, gaSessionago변경] = useState(0);
  var [gaAvgSessionDuration, gaAvgSessionDuration변경] = useState(0);
  var [gaAvgSessionDurationAgo, gaAvgSessionDurationAgo변경] = useState(0);
  var [chartdata, chartdata변경] = useState([]);
  var [AvgTimeOnPageData, AvgTimeOnPageData변경] = useState([]);
  var [AvgTimeOnPageName, AvgTimeOnPageName변경] = useState();

  var [daulistdate, daulistdate변경] = useState();
  var [daulistvalue, daulistvalue변경] = useState([]);
  var [waulistdate, waulistdate변경] = useState();
  var [waulistvalue, waulistvalue변경] = useState([]);
  var [maulistdate, maulistdate변경] = useState();
  var [maulistvalue, maulistvalue변경] = useState([]);

  var [yesterdaustick, yesterdaustick변경] = useState();
  var [yestermaustick, yestermaustick변경] = useState();

  var [daustick, daustick변경] = useState();
  var [maustick, maustick변경] = useState();

  var [UserPerVisitDate, UserPerVisitDate변경] = useState();
  var [UserPerVisit, UserPerVisit변경] = useState([]);

  var [UserTimeStayDate, UserTimeStayDate변경] = useState();
  var [UserTimeStay, UserTimeStay변경] = useState([]);

  var [Deviationrate, Deviationrate변경] = useState('');

  var [DeviationrateAge, DeviationrateAge변경] = useState('');


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
                startDate: '2daysAgo',
                endDate: 'yesterday'
              }
              ,
              {
                startDate: 'yesterday',
                endDate: 'today'
              }
            ],
            metrics: [
              {
                expression: 'ga:avgSessionDuration'
              }
              ,
              // { 나중에 구할떄 리퀘스트를 따로 날려야 할듯. 
              //  expression: 'ga:1dayUsers' 
              // },
              {
                expression: 'ga:sessions'
              },
              {
                expression: 'ga:avgTimeOnPage'
              }
            ],
            dimensions: [
              {
                name: "ga:week"
              },
              {
                name: "ga:pagePath",
              }
            ],
          }
        ]
      }
    }).then(displayResults, console.error.bind(console));
  }
  let AvgTimeOnPageNameTemp = [];
  function displayResults(response) {
    var formattedJson = JSON.stringify(response.result, null, 2);
    gaSessionago변경(response.result['reports'][0]['data']['totals'][0]['values'][1]);
    gaSession변경(response.result['reports'][0]['data']['totals'][1]['values'][1]);
    gaAvgSessionDurationAgo변경(response.result['reports'][0]['data']['totals'][0]['values'][0]);
    gaAvgSessionDuration변경(response.result['reports'][0]['data']['totals'][1]['values'][0]);

    console.log(formattedJson);
    // console.log(response.result['reports'][0]['data']['rows']);
    let temp = response.result['reports'][0]['data']['rows'];
    let AvgTimeOnPageDataTemp = [];

    for (var i = 0; i < temp.length; i++) {
      if(Number(temp[i]['metrics'][0]['values'][2]) >30){
      AvgTimeOnPageNameTemp.push(temp[i]['dimensions'][1]);
      AvgTimeOnPageDataTemp.push((Number(temp[i]['metrics'][0]['values'][2])).toFixed(2));
    }
    }

    AvgTimeOnPageData변경(AvgTimeOnPageDataTemp);
    AvgTimeOnPageName변경(AvgTimeOnPageNameTemp);

  }
  //==============================================================================
  // query 2 

  function queryReports1() {
    window.gapi.client.request({
      includeEmptyRows: 'true',
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
                startDate: '28daysAgo',
                endDate: 'yesterday'
              }
            ],
            metrics: [

              {
                expression: 'ga:1dayUsers'
              }
            ],
            dimensions: [
              {
                name: "ga:day"
              }
            ],
          }
        ]
      }
    }).then(displayResults1, console.error.bind(console));
    let datlist = [];
    function displayResults1(response) {
      console.log("1일 dau")
      var formattedJson = JSON.stringify(response.result, null, 2);
      // console.log(formattedJson);
      // console.log(response.result['reports'][0]['data']['rows']) // dau 리스트
      // console.log("요일", response.result['reports'][0]['data']['rows'][1]['dimensions'][0]) //날짜
      // console.log("데이터", response.result['reports'][0]['data']['rows'][1]['metrics'][0]['values'][0]) //데이터
      // daulist변경(response.result['reports'][0]['data']['rows'])
      var daulistdatetemp = [];
      var daulistvaluetemp = [];
      for (let i = 0; i < response.result['reports'][0]['data']['rows'].length; i++) {
        if (i < response.result['reports'][0]['data']['rows'].length - 1 && Number(response.result['reports'][0]['data']['rows'][i]['dimensions'][0]) + 1 != Number(response.result['reports'][0]['data']['rows'][i + 1]['dimensions'][0])) {
          // console.log(i)
          // console.log("이부분")
          // console.log(String(Number(response.result['reports'][0]['data']['rows'][i]['dimensions'][0]) + 1))
          daulistdatetemp.push(response.result['reports'][0]['data']['rows'][i]['dimensions'][0])
          daulistvaluetemp.push(response.result['reports'][0]['data']['rows'][i]['metrics'][0]['values'][0])
          daulistdatetemp.push(String(Number(response.result['reports'][0]['data']['rows'][i]['dimensions'][0]) + 1))
          daulistvaluetemp.push("0")
          continue;
        }

        daulistdatetemp.push(response.result['reports'][0]['data']['rows'][i]['dimensions'][0])
        daulistvaluetemp.push(response.result['reports'][0]['data']['rows'][i]['metrics'][0]['values'][0])
      }
      // console.log(daulistdatetemp)
      // console.log(daulistvaluetemp)

      daulistdate변경(daulistdatetemp)
      daulistvalue변경(daulistvaluetemp)

      yesterdaustick변경(daulistvaluetemp[daulistvaluetemp.length - 2])
      daustick변경(daulistvaluetemp[daulistvaluetemp.length - 1])
    }
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
                startDate: '28daysAgo',
                endDate: 'yesterday'
              }
            ],
            metrics: [
              {
                expression: 'ga:7dayUsers'
              }
            ],
            dimensions: [
              {
                name: "ga:day"
              }
            ],
          }
        ]
      }
    }).then(displayResults7, console.error.bind(console));
    function displayResults7(response) {
      var formattedJson = JSON.stringify(response.result, null, 2);
      console.log("7일 wau")
      // console.log(formattedJson);
      var waulistdatetemp = [];
      var waulistvaluetemp = [];
      for (let i = 0; i < response.result['reports'][0]['data']['rows'].length; i++) {
        waulistdatetemp.push(response.result['reports'][0]['data']['rows'][i]['dimensions'][0])
        waulistvaluetemp.push(response.result['reports'][0]['data']['rows'][i]['metrics'][0]['values'][0])
      }
      // console.log(waulistdatetemp)
      // console.log(waulistvaluetemp)

      waulistdate변경(waulistdatetemp)
      waulistvalue변경(waulistvaluetemp)


    }
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
                startDate: '28daysAgo',
                endDate: 'yesterday'
              }
            ],
            metrics: [

              {
                expression: 'ga:28dayUsers'
              }
            ],
            dimensions: [
              {
                name: "ga:day"
              }
            ],
          }
        ]
      }
    }).then(displayResults28, console.error.bind(console));


    function displayResults28(response) {
      console.log("28일 mau")
      var formattedJson = JSON.stringify(response.result, null, 2);
      // console.log(formattedJson);
      var maulistdatetemp = [];
      var maulistvaluetemp = [];
      for (let i = 0; i < response.result['reports'][0]['data']['rows'].length; i++) {
        maulistdatetemp.push(response.result['reports'][0]['data']['rows'][i]['dimensions'][0])
        maulistvaluetemp.push(response.result['reports'][0]['data']['rows'][i]['metrics'][0]['values'][0])
      }
      // console.log(maulistdatetemp)
      // console.log(maulistvaluetemp)

      maulistdate변경(maulistdatetemp)
      maulistvalue변경(maulistvaluetemp)

      yestermaustick변경(maulistvaluetemp[maulistvaluetemp.length - 2])
      maustick변경(maulistvaluetemp[maulistvaluetemp.length - 1])
    }
  }
  // 차트 데이터 

  const cards = [
    {
      title: "Employment Growth",
      data: {
        columns: [
          // each columns data
          ["DAU", ...daulistvalue],
          ["WAU", ...waulistvalue],
          ["MAU", ...maulistvalue],
        ],
        type: "line", // default type of chart
        colors: {
          DAU: colors.orange,
          WAU: colors.blue,
          MAU: colors.green,
        },
        names: {
          // name of each serie
          DAU: "DAU",
          WAU: "WAU",
          MAU: "MAU",
        },
      },
      axis: {
        x: {
          type: "category",
          // name of each category
          categories: maulistdate,
        }
      },
    }
  ]

  //==============================================================================
  // query 3
  function queryReports2() {
    window.gapi.client.request({
      includeEmptyRows: 'true',
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
                startDate: '28daysAgo',
                endDate: 'yesterday'
              }
            ],
            metrics: [
              {
                expression: 'ga:sessions'
              },
              {
                expression: 'ga:users'
              },
              {
                expression: 'ga:avgSessionDuration'
              },
              {
                expression: 'ga:bounceRate'
              }
            ],
            dimensions: [
              {
                name: "ga:day"
              }
            ]
          }
        ]
      }
    }).then(displayResults10, console.error.bind(console));
    let datlist = [];
    function displayResults10(response) {
      console.log("3번쨰 쿼리")
      var formattedJson = JSON.stringify(response.result, null, 2);
      // console.log(formattedJson);

      // console.log(response.result['reports'][0]['data']['rows'][response.result['reports'][0]['data']['rows'].length-2])

      // console.log(response.result['reports'][0]['data']['rows'][response.result['reports'][0]['data']['rows'].length-2]['metrics'][0]['values'][3])
      // console.log(response.result['reports'][0]['data']['rows'][response.result['reports'][0]['data']['rows'].length-1]['metrics'][0]['values'][3])

      DeviationrateAge변경(response.result['reports'][0]['data']['rows'][response.result['reports'][0]['data']['rows'].length - 2]['metrics'][0]['values'][3]);
      Deviationrate변경(response.result['reports'][0]['data']['rows'][response.result['reports'][0]['data']['rows'].length - 1]['metrics'][0]['values'][3]);

      var datetemp = [];
      var UserPerVisittemp = [];
      for (let i = 0; i < response.result['reports'][0]['data']['rows'].length; i++) {
        if (i < response.result['reports'][0]['data']['rows'].length - 1 && Number(response.result['reports'][0]['data']['rows'][i]['dimensions'][0]) + 1 != Number(response.result['reports'][0]['data']['rows'][i + 1]['dimensions'][0])) {

          UserPerVisittemp.push((response.result['reports'][0]['data']['rows'][i]['metrics'][0]['values'][0] / response.result['reports'][0]['data']['rows'][i]['metrics'][0]['values'][1]).toFixed(1))
          datetemp.push(response.result['reports'][0]['data']['rows'][i]['dimensions'][0])
          UserPerVisittemp.push(0)
          datetemp.push(String(Number(response.result['reports'][0]['data']['rows'][i]['dimensions'][0]) + 1))
          continue;
        }
        UserPerVisittemp.push((response.result['reports'][0]['data']['rows'][i]['metrics'][0]['values'][0] / response.result['reports'][0]['data']['rows'][i]['metrics'][0]['values'][1]).toFixed(1)) // .사용자당 방문수  : 총 세션수 / 총 사용자 수 
        datetemp.push(response.result['reports'][0]['data']['rows'][i]['dimensions'][0])
      }
      var UserTimeStayDatetemp = [];
      var UserTimeStaytemp = [];
      for (let i = 0; i < response.result['reports'][0]['data']['rows'].length; i++) {
        if (i < response.result['reports'][0]['data']['rows'].length - 1 && Number(response.result['reports'][0]['data']['rows'][i]['dimensions'][0]) + 1 != Number(response.result['reports'][0]['data']['rows'][i + 1]['dimensions'][0])) {

          // UserPerVisittemp.push(Math.floor(response.result['reports'][0]['data']['rows'][i]['metrics'][0]['values'][0]/response.result['reports'][0]['data']['rows'][i]['metrics'][0]['values'][1])) // .사용자당 방문수  : 총 세션수 / 총 사용자 수 
          // datetemp.push(response.result['reports'][0]['data']['rows'][i]['dimensions'][0])
          UserTimeStaytemp.push((((response.result['reports'][0]['data']['rows'][i]['metrics'][0]['values'][0] * response.result['reports'][0]['data']['rows'][i]['metrics'][0]['values'][2]) / response.result['reports'][0]['data']['rows'][i]['metrics'][0]['values'][0]) / 60).toFixed(2)) //
          UserTimeStayDatetemp.push(response.result['reports'][0]['data']['rows'][i]['dimensions'][0])
          UserTimeStaytemp.push("0") //
          UserTimeStayDatetemp.push(String(Number(response.result['reports'][0]['data']['rows'][i]['dimensions'][0]) + 1))

          continue;
        }
        UserTimeStaytemp.push((((response.result['reports'][0]['data']['rows'][i]['metrics'][0]['values'][0] * response.result['reports'][0]['data']['rows'][i]['metrics'][0]['values'][2]) / response.result['reports'][0]['data']['rows'][i]['metrics'][0]['values'][0]) / 60).toFixed(2)) //
        UserTimeStayDatetemp.push(response.result['reports'][0]['data']['rows'][i]['dimensions'][0])
      }
      // console.log(UserTimeStaytemp)
      // console.log(UserTimeStayDatetemp)

      UserPerVisitDate변경(datetemp)
      UserPerVisit변경(UserPerVisittemp)

      UserTimeStay변경(UserTimeStaytemp)
      UserTimeStayDate변경(UserTimeStayDatetemp)


    }


  }

  // 차트 데이터 

  const cards2 = [
    {
      title: "Employment Growth",
      data: {
        columns: [
          // each columns data
          ["UserPerVisit", ...UserPerVisit],
          ["UserTimeStay", ...UserTimeStay]
        ],
        axes: {
          UserPerVisit: 'y',
          UserTimeStay: 'y2'
        },
        type: "line", // default type of chart
        colors: {
          UserPerVisit: colors.orange,
          UserTimeStay: colors.blue
        },
        names: {
          // name of each serie
          UserPerVisit: "UserPerVisit",
          UserTimeStay: "UserTimeStay"
        },
      },
      axis: {
        x: {
          type: "category",
          // name of each category
          categories: UserPerVisitDate,
        },
        y2: {
          show: true
        }
      },
    }
  ]

  return (
    <SiteWrapper>
      <Page.Content title="Dashboard">
        <Grid.Row cards={true}>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard layout={1} movement={0} total={totalUserCount} label="전체 회원수" />
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard
              layout={1}
              movement={0}
              total={subUserCount}
              label="구독 회원수"
            />
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard layout={1} movement={Math.floor(((gaSession - gaSessionago) / gaSessionago) * 100)} total={gaSession} label="세션수" />
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard
              layout={1}
              movement={Math.floor(((gaAvgSessionDuration - gaAvgSessionDurationAgo) / gaAvgSessionDurationAgo) * 100)}
              total={Math.floor(gaAvgSessionDuration)}
              label="세션시간"
            />
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard
              layout={1}
              movement={Math.floor(((Math.floor((Number(daustick) / Number(maustick) * 100))) - (Math.floor((Number(yesterdaustick) / Number(yestermaustick) * 100)))) / (Math.floor((Number(yesterdaustick) / Number(yestermaustick) * 100))) * 100)}
              total={String(Math.floor((Number(daustick) / Number(maustick) * 100))) + "%"}
              label="Stickiness"
            />
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            {/* <StatsCard layout={1} movement={((Number(Deviationrate) - Number(DeviationrateAge) / Number(DeviationrateAge)) * 100)} total={Math.floor(Number(Deviationrate))} label="이탈률" /> */}
            {Deviationrate ?
              <StatsCard layout={1} movement={Math.floor((((Number(Deviationrate) - Number(DeviationrateAge)) / Number(DeviationrateAge)) * 100))} total={String(Math.floor(Number(Deviationrate))) + "%"} label="이탈률" />
              : <StatsCard layout={1} movement="" total="" label="이탈률" />
            }
          </Grid.Col>
          <Grid.Col sm={12} lg={12}>
            {UserPerVisitDate ?
              <Card title="방문당 체류시간 & 사용자당 방문수">
                <Card.Body>
                  <C3Chart
                    data={cards2[0].data}
                    axis={cards2[0].axis}
                    legend={{
                      show: false, //hide legend
                    }}
                    padding={{
                      bottom: 0,
                      top: 0,
                    }}
                  />
                </Card.Body>
              </Card>
              : null}
          </Grid.Col>
          <Grid.Col sm={12} lg={12}>
            {maulistdate ?
              <Card title="DAU / WAU / MAU">
                <Card.Body>
                  <C3Chart
                    data={cards[0].data}
                    axis={cards[0].axis}
                    legend={{
                      show: false, //hide legend
                    }}
                    padding={{
                      bottom: 0,
                      top: 0,
                    }}
                  />
                </Card.Body>
              </Card>
              : null}
          </Grid.Col>
          <Grid.Row>
            <Grid.Col lg={6}>
              <Card>
                <Card.Header>
                  <Card.Title>NewKeyword</Card.Title>
                </Card.Header>
                <iframe src="http://3.34.182.222:5601/app/visualize#/edit/550097a0-8960-11eb-942c-a59af512d04c?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:'2021-03-02T07:40:45.192Z',to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(),schema:metric,type:count),(enabled:!t,id:'2',params:(field:keyword.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:500),schema:segment,type:terms)),params:(maxFontSize:72,minFontSize:18,orientation:single,scale:linear,showLabel:!t),title:'%EC%9B%8C%EB%93%9C%20%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C',type:tagcloud))" height="500" width="580"></iframe>
              </Card>
            </Grid.Col>

            <Grid.Col lg={6} width={6}>
              <Card>
                <Card.Header>
                  <Card.Title>BoardTop</Card.Title>
                </Card.Header>
                <iframe src="http://3.34.182.222:5601/app/visualize#/edit/f8702360-895b-11eb-942c-a59af512d04c?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:'2021-03-02T07:40:45.192Z',to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(field:board_viewnum),schema:metric,type:sum),(enabled:!t,id:'2',params:(customLabel:'',field:board_title.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:7),schema:segment,type:terms)),params:(addLegend:!t,addTooltip:!t,isDonut:!t,labels:(last_level:!t,show:!f,truncate:100,values:!t),legendPosition:right,type:pie),title:%E3%85%87%E3%85%87%E3%85%87%E3%85%87%E3%85%87,type:pie))" height="500" width="580"></iframe>
              </Card>
            </Grid.Col>
          </Grid.Row>


          <Grid.Col md={12} lg={12}>
            <Card>
              <Card.Header>
                <Card.Title>페이지당 평균 머문시간(week)</Card.Title>
              </Card.Header>
              {AvgTimeOnPageName ?
                <C3Chart
                  style={{ height: "15rem" }}
                  data={{
                    columns: [
                      // each columns data
                      [
                        "Sec",
                        ...AvgTimeOnPageData
                      ]
                    ],
                    type: "bar", // default type of chart
                    groups: [["Sec"]],
                    colors: {
                      Sec: colors["orange"],
                    },
                    // names: {
                    //   // name of each serie
                    //   data1: "Purchases",
                    // },
                  }}
                  axis={{
                    y: {
                      padding: {
                        bottom: 0,
                      },
                      show: false,
                      tick: {
                        outer: true,
                      },
                    },
                    x: {
                      type: "category",
                      // name of each category
                      categories: AvgTimeOnPageName
                    },
                  }}
                  legend={{
                    position: "inset",
                    padding: 0,
                    inset: {
                      anchor: "top-left",
                      x: 20,
                      y: 8,
                      step: 10,
                    },
                  }}
                  tooltip={{
                    format: {
                      title: function (x) {
                        return "";
                      },
                    },
                  }}
                  padding={{
                    bottom: 0,
                    left: -1,
                    right: -1,
                  }}
                  point={{
                    show: false,
                  }}
                />
                : null
              }
              {/* <Table
                cards={true}
                striped={true}
                responsive={true}
                className="table-vcenter"
              >
                <Table.Header>
                  <Table.Row>
                    <Table.ColHeader colSpan={2}>User</Table.ColHeader>
                    <Table.ColHeader>Commit</Table.ColHeader>
                    <Table.ColHeader>Date</Table.ColHeader>
                    <Table.ColHeader />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Col className="w-1">
                      <Avatar imageURL="./demo/faces/male/9.jpg" />
                    </Table.Col>
                    <Table.Col>Ronald Bradley</Table.Col>
                    <Table.Col>Initial commit</Table.Col>
                    <Table.Col className="text-nowrap">May 6, 2018</Table.Col>
                    <Table.Col className="w-1">
                      <Icon link={true} name="trash" />
                    </Table.Col>
                  </Table.Row>
                  <Table.Row>
                    <Table.Col>
                      <Avatar>BM</Avatar>
                    </Table.Col>
                    <Table.Col>Russell Gibson</Table.Col>
                    <Table.Col>Main structure</Table.Col>
                    <Table.Col className="text-nowrap">
                      April 22, 2018
                    </Table.Col>
                    <Table.Col>
                      <Icon link={true} name="trash" />
                    </Table.Col>
                  </Table.Row>
                  <Table.Row>
                    <Table.Col>
                      <Avatar imageURL="./demo/faces/female/1.jpg" />
                    </Table.Col>
                    <Table.Col>Beverly Armstrong</Table.Col>
                    <Table.Col>Left sidebar adjustments</Table.Col>
                    <Table.Col className="text-nowrap">
                      April 15, 2018
                    </Table.Col>
                    <Table.Col>
                      <Icon link={true} name="trash" />
                    </Table.Col>
                  </Table.Row>
                  <Table.Row>
                    <Table.Col>
                      <Avatar imageURL="./demo/faces/male/4.jpg" />
                    </Table.Col>
                    <Table.Col>Bobby Knight</Table.Col>
                    <Table.Col>Topbar dropdown style</Table.Col>
                    <Table.Col className="text-nowrap">April 8, 2018</Table.Col>
                    <Table.Col>
                      <Icon link={true} name="trash" />
                    </Table.Col>
                  </Table.Row>
                  <Table.Row>
                    <Table.Col>
                      <Avatar imageURL="./demo/faces/female/11.jpg" />
                    </Table.Col>
                    <Table.Col>Sharon Wells</Table.Col>
                    <Table.Col>Fixes #625</Table.Col>
                    <Table.Col className="text-nowrap">April 9, 2018</Table.Col>
                    <Table.Col>
                      <Icon link={true} name="trash" />
                    </Table.Col>
                  </Table.Row>
                </Table.Body>
              </Table> */}
            </Card>
          </Grid.Col>

          {/* <Grid.Row>
            <Grid.Col sm={6}>
              <Card>
                <Card.Header>
                  <Card.Title>이런이런</Card.Title>
                </Card.Header>
                <Card.Body>
                  <C3Chart
                    style={{ height: "12rem" }}
                    data={{
                      columns: [
                        // each columns data
                        ["data1", 1, 2, 3, 4, 5, 6]
                      ],
                      type: "bar", // default type of chart
                      colors: {
                        data1: colors["pink"],
                        // data2: colors["pink"],
                      },
                      names: {
                        // name of each serie
                        data1: "pageOntime",
                        // data2: "Minimum",
                      },
                    }}
                    axis={{
                      x: {
                        type: "category",
                        // name of each category
                        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
                      },
                    }
                    }

                    legend={{
                      show: false, //hide legend
                    }}
                    padding={{
                      bottom: 0,
                      top: 0,
                    }}
                  />
                </Card.Body>
              </Card>
            </Grid.Col>
            <Grid.Col sm={6}>
              <Card>
                <Card.Header>
                  <Card.Title>Chart title</Card.Title>
                </Card.Header>
                <Card.Body>
                  <C3Chart
                    style={{ height: "12rem" }}
                    data={{
                      columns: [
                        // each columns data
                        ["data1", 63],
                        ["data2", 44],
                        ["data3", 12],
                        ["data4", 14],
                      ],
                      type: "pie", // default type of chart
                      colors: {
                        data1: colors["blue-darker"],
                        data2: colors["blue"],
                        data3: colors["blue-light"],
                        data4: colors["blue-lighter"],
                      },
                      names: {
                        // name of each serie
                        data1: "A",
                        data2: "B",
                        data3: "C",
                        data4: "D",
                      },
                    }}
                    legend={{
                      show: false, //hide legend
                    }}
                    padding={{
                      bottom: 0,
                      top: 0,
                    }}
                  />
                </Card.Body>
              </Card>
            </Grid.Col>
            <Grid.Col sm={6}>
              <ProgressCard
                header="New feedback"
                content="62"
                progressColor="red"
                progressWidth={28}
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <ProgressCard
                header="Today profit"
                content="$652"
                progressColor="green"
                progressWidth={84}
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <ProgressCard
                header="Users online"
                content="76"
                progressColor="yellow"
                progressWidth={34}
              />
            </Grid.Col>
          </Grid.Row> */}
          {/* </Grid.Col> */}
          {/* <Grid.Col sm={6} lg={3}>
            <StampCard
              color="blue"
              icon="dollar-sign"
              header={
                <a href="#">
                  132 <small>Sales</small>
                </a>
              }
              footer={"12 waiting payments"}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={3}>
            <StampCard
              color="green"
              icon="shopping-cart"
              header={
                <a href="#">
                  78 <small>Orders</small>
                </a>
              }
              footer={"32 shipped"}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={3}>
            <StampCard
              color="red"
              icon="users"
              header={
                <a href="#">
                  1,352 <small>Members</small>
                </a>
              }
              footer={"163 registered today"}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={3}>
            <StampCard
              color="yellow"
              icon="message-square"
              header={
                <a href="#">
                  132 <small>Comments</small>
                </a>
              }
              footer={"16 waiting"}
            />
          </Grid.Col> */}
        </Grid.Row>
        {/* <Grid.Row cards deck>
          <Grid.Col width={12}>
            <Card>
              <Table
                responsive
                highlightRowOnHover
                hasOutline
                verticalAlign="center"
                cards
                className="text-nowrap"
              >
                <Table.Header>
                  <Table.Row>
                    <Table.ColHeader alignContent="center" className="w-1">
                      <i className="icon-people" />
                    </Table.ColHeader>
                    <Table.ColHeader>User</Table.ColHeader>
                    <Table.ColHeader>Usage</Table.ColHeader>
                    <Table.ColHeader alignContent="center">
                      Payment
                    </Table.ColHeader>
                    <Table.ColHeader>Activity</Table.ColHeader>
                    <Table.ColHeader alignContent="center">
                      Satisfaction
                    </Table.ColHeader>
                    <Table.ColHeader alignContent="center">
                      <i className="icon-settings" />
                    </Table.ColHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Col alignContent="center">
                      <Avatar
                        imageURL="demo/faces/female/26.jpg"
                        className="d-block"
                        status="green"
                      />
                    </Table.Col>
                    <Table.Col>
                      <div>Elizabeth Martin</div>
                      <Text size="sm" muted>
                        Registered: Mar 19, 2018
                      </Text>
                    </Table.Col>
                    <Table.Col>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>42%</strong>
                        </div>
                        <div className="float-right">
                          <Text.Small muted>
                            Jun 11, 2015 - Jul 10, 2015
                          </Text.Small>
                        </div>
                      </div>
                      <Progress size="xs">
                        <Progress.Bar color="yellow" width={42} />
                      </Progress>
                    </Table.Col>
                    <Table.Col alignContent="center">
                      <Icon payment name="visa" />
                    </Table.Col>
                    <Table.Col>
                      <Text size="sm" muted>
                        Last login
                      </Text>
                      <div>4 minutes ago</div>
                    </Table.Col>
                    <Table.Col alignContent="center">42%</Table.Col>
                    <Table.Col alignContent="center">
                      <Dropdown
                        trigger={
                          <Dropdown.Trigger
                            icon="more-vertical"
                            toggle={false}
                          />
                        }
                        position="right"
                        items={
                          <React.Fragment>
                            <Dropdown.Item icon="tag">Action </Dropdown.Item>
                            <Dropdown.Item icon="edit-2">
                              Another action{" "}
                            </Dropdown.Item>
                            <Dropdown.Item icon="message-square">
                              Something else here
                            </Dropdown.Item>
                            <Dropdown.ItemDivider />
                            <Dropdown.Item icon="link">
                              {" "}
                              Separated link
                            </Dropdown.Item>
                          </React.Fragment>
                        }
                      />
                    </Table.Col>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card>
          </Grid.Col>
        </Grid.Row> */}
        {/* <Grid.Row>
          <Grid.Col sm={6} lg={4}>
            <Card title="Browser Stats">
              <Table className="card-table">
                <Table.Row>
                  <Table.Col>
                    <Icon prefix="fa" name="chrome" className="text-muted" />
                  </Table.Col>
                  <Table.Col>Google Chrome</Table.Col>
                  <Table.Col className="text-right">
                    <Text RootComponent="span" muted>
                      23%
                    </Text>
                  </Table.Col>
                </Table.Row>
              </Table>
            </Card>
          </Grid.Col>
          <Grid.Col sm={6} lg={4}>
            <Card title="Projects">
              <Table cards>
                <Table.Row>
                  <Table.Col>Admin Template</Table.Col>
                  <Table.Col alignContent="right">
                    <Badge color="default">65%</Badge>
                  </Table.Col>
                </Table.Row>
              </Table>
            </Card>
          </Grid.Col>
          <Grid.Col md={6} lg={4}>
            <Card title="Members">
              <Card.Body>
                <ul className="list-unstyled list-separated">
                  <li className="list-separated-item">
                    <Grid.Row className="align-items-center">
                      <Grid.Col auto>
                        <Avatar
                          size="md"
                          className="d-block"
                          imageURL="demo/faces/female/12.jpg"
                        />
                      </Grid.Col>
                      <Grid.Col>
                        <div>
                          <a className="text-inherit" href="#">
                            Amanda Hunt
                          </a>
                        </div>
                        <Text.Small muted className="d-block item-except h-1x">
                          amanda_hunt@example.com
                        </Text.Small>
                      </Grid.Col>
                      <Grid.Col auto>
                        <Dropdown
                          trigger={
                            <Dropdown.Trigger
                              icon="more-vertical"
                              toggle={false}
                            />
                          }
                          position="right"
                          items={
                            <React.Fragment>
                              <Dropdown.Item icon="tag">Action </Dropdown.Item>
                              <Dropdown.Item icon="edit-2">
                                {" "}
                                Another action{" "}
                              </Dropdown.Item>
                              <Dropdown.Item icon="message-square">
                                {" "}
                                Something else here
                              </Dropdown.Item>
                              <Dropdown.ItemDivider />
                              <Dropdown.Item icon="link">
                                {" "}
                                Separated link
                              </Dropdown.Item>
                            </React.Fragment>
                          }
                        />
                      </Grid.Col>
                    </Grid.Row>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Grid.Col>
          <Grid.Col md={6} lg={12}>
            <Grid.Row>
              <Grid.Col sm={6} lg={3}>
                <StatsCard
                  layout={2}
                  movement={5}
                  total="423"
                  label="Users online"
                  chart={
                    <C3Chart
                      style={{ height: "100%" }}
                      padding={{
                        bottom: -10,
                        left: -1,
                        right: -1,
                      }}
                      data={{
                        names: {
                          data1: "Users online",
                        },
                        columns: [["data1", 30, 40, 10, 40, 12, 22, 40]],
                        type: "area",
                      }}
                      legend={{
                        show: false,
                      }}
                      transition={{
                        duration: 0,
                      }}
                      point={{
                        show: false,
                      }}
                      tooltip={{
                        format: {
                          title: function (x) {
                            return "";
                          },
                        },
                      }}
                      axis={{
                        y: {
                          padding: {
                            bottom: 0,
                          },
                          show: false,
                          tick: {
                            outer: false,
                          },
                        },
                        x: {
                          padding: {
                            left: 0,
                            right: 0,
                          },
                          show: false,
                        },
                      }}
                      color={{
                        pattern: ["#467fcf"],
                      }}
                    />
                  }
                />
              </Grid.Col>
              <Grid.Col sm={6} lg={3}>
                <StatsCard
                  layout={2}
                  movement={-3}
                  total="423"
                  label="Users online"
                  chart={
                    <C3Chart
                      style={{ height: "100%" }}
                      padding={{
                        bottom: -10,
                        left: -1,
                        right: -1,
                      }}
                      data={{
                        names: {
                          data1: "Users online",
                        },
                        columns: [["data1", 30, 40, 10, 40, 12, 22, 40]],
                        type: "area",
                      }}
                      legend={{
                        show: false,
                      }}
                      transition={{
                        duration: 0,
                      }}
                      point={{
                        show: false,
                      }}
                      tooltip={{
                        format: {
                          title: function (x) {
                            return "";
                          },
                        },
                      }}
                      axis={{
                        y: {
                          padding: {
                            bottom: 0,
                          },
                          show: false,
                          tick: {
                            outer: false,
                          },
                        },
                        x: {
                          padding: {
                            left: 0,
                            right: 0,
                          },
                          show: false,
                        },
                      }}
                      color={{
                        pattern: ["#e74c3c"],
                      }}
                    />
                  }
                />
              </Grid.Col>
              <Grid.Col sm={6} lg={3}>
                <StatsCard
                  layout={2}
                  movement={-3}
                  total="423"
                  label="Users online"
                  chart={
                    <C3Chart
                      style={{ height: "100%" }}
                      padding={{
                        bottom: -10,
                        left: -1,
                        right: -1,
                      }}
                      data={{
                        names: {
                          data1: "Users online",
                        },
                        columns: [["data1", 30, 40, 10, 40, 12, 22, 40]],
                        type: "area",
                      }}
                      legend={{
                        show: false,
                      }}
                      transition={{
                        duration: 0,
                      }}
                      point={{
                        show: false,
                      }}
                      tooltip={{
                        format: {
                          title: function (x) {
                            return "";
                          },
                        },
                      }}
                      axis={{
                        y: {
                          padding: {
                            bottom: 0,
                          },
                          show: false,
                          tick: {
                            outer: false,
                          },
                        },
                        x: {
                          padding: {
                            left: 0,
                            right: 0,
                          },
                          show: false,
                        },
                      }}
                      color={{
                        pattern: ["#5eba00"],
                      }}
                    />
                  }
                />
              </Grid.Col>
              <Grid.Col sm={6} lg={3}>
                <StatsCard
                  layout={2}
                  movement={9}
                  total="423"
                  label="Users online"
                  chart={
                    <C3Chart
                      style={{ height: "100%" }}
                      padding={{
                        bottom: -10,
                        left: -1,
                        right: -1,
                      }}
                      data={{
                        names: {
                          data1: "Users online",
                        },
                        columns: [["data1", 30, 40, 10, 40, 12, 22, 40]],
                        type: "area",
                      }}
                      legend={{
                        show: false,
                      }}
                      transition={{
                        duration: 0,
                      }}
                      point={{
                        show: false,
                      }}
                      tooltip={{
                        format: {
                          title: function (x) {
                            return "";
                          },
                        },
                      }}
                      axis={{
                        y: {
                          padding: {
                            bottom: 0,
                          },
                          show: false,
                          tick: {
                            outer: false,
                          },
                        },
                        x: {
                          padding: {
                            left: 0,
                            right: 0,
                          },
                          show: false,
                        },
                      }}
                      color={{
                        pattern: ["#f1c40f"],
                      }}
                    />
                  }
                />
              </Grid.Col>
            </Grid.Row>
          </Grid.Col>
          <Grid.Col width={12}>
            <Card title="Invoices">
              <Table
                responsive
                className="card-table table-vcenter text-nowrap"
                headerItems={[
                  { content: "No.", className: "w-1" },
                  { content: "Invoice Subject" },
                  { content: "Client" },
                  { content: "VAT No." },
                  { content: "Created" },
                  { content: "Status" },
                  { content: "Price" },
                  { content: null },
                  { content: null },
                ]}
                bodyItems={[
                  {
                    key: "1",
                    item: [
                      {
                        content: (
                          <Text RootComponent="span" muted>
                            001401
                          </Text>
                        ),
                      },
                      {
                        content: (
                          <a href="invoice.html" className="text-inherit">
                            Design Works
                          </a>
                        ),
                      },
                      { content: "Carlson Limited" },
                      { content: "87956621" },
                      { content: "15 Dec 2017" },
                      {
                        content: (
                          <React.Fragment>
                            <span className="status-icon bg-success" /> Paid
                          </React.Fragment>
                        ),
                      },
                      { content: "$887" },
                      {
                        alignContent: "right",
                        content: (
                          <React.Fragment>
                            <Button size="sm" color="secondary">
                              Manage
                            </Button>
                            <div className="dropdown">
                              <Button
                                color="secondary"
                                size="sm"
                                isDropdownToggle
                              >
                                Actions
                              </Button>
                            </div>
                          </React.Fragment>
                        ),
                      },
                      { content: <Icon link name="edit" /> },
                    ],
                  },
                ]}
              />
            </Card>
          </Grid.Col>
        </Grid.Row> */}
      </Page.Content>
    </SiteWrapper>
  );
}

export default Home;
