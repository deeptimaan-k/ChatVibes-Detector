
// import React from "react";
import React, { useState, useEffect } from 'react';
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  // dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
// const [lovePercentageData, setLovePercentageData] = useState({});


function Dashboard() {
  const [lovePercentageData, setLovePercentageData] = useState({});
  const [usernames, setUsernames] = useState([]);
  const [userdates, setUserdates] = useState([]);
  useEffect(() => {
    const fetchLovePercentageData = async () => {
        try {
            const response = await fetch('/love_percentage');
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setLovePercentageData(data);
            } else {
                console.error('Failed to fetch love percentage data');
            }
        } catch (error) {
            console.error('Error fetching love percentage data:', error);
        }
    };

    fetchLovePercentageData();
}, []);


useEffect(() => {
  const fetchUserdates = async () => {
    try {
      const response = await fetch("/dates");
      if (response.ok) {
        const data = await response.json();
        setUserdates(data);
        console.log(data);
      } else {
        console.error("Error fetching user dates");
      }
    } catch (error) {
      console.error("Error fetching user dates:", error);
    }
  };

  fetchUserdates();
}, []);




useEffect(() => {
  const fetchUsernames = async () => {
    try {
      const response = await fetch("/get_users");
      if (response.ok) {
        const data = await response.json();
        setUsernames(data);
        // console.log(data);
      } else {
        console.error("Error fetching usernames");
      }
    } catch (error) {
      console.error("Error fetching usernames:", error);
    }
  };

  fetchUsernames();
}, []);



  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02 text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Users</p>
                      <CardTitle tag="p">{usernames[0]}</CardTitle>
                      <CardTitle tag="p">{usernames[1]}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Chating...
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-calendar-60 text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Dates</p>
                      <CardTitle style={{ fontSize: '20px' }} tag="p">{userdates[0]}</CardTitle>
                      <CardTitle style={{ fontSize: '20px' }} tag="p">{userdates[1]}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Chats Duration
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-send text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Message by Krishna</p>
                      <CardTitle tag="p">23</CardTitle>
                      <CardTitle tag="p">230</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> Message sent out of 230
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-send text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Message by Sherya</p>
                      <CardTitle tag="p">70</CardTitle>
                      <CardTitle tag="p">230</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Message sent out of 230
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Users Behavior</CardTitle>
                <p className="card-category">24 Hours performance</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboard24HoursPerformanceChart.data}
                  options={dashboard24HoursPerformanceChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="4">
          <Card>
            <CardHeader>
                <CardTitle tag="h5">Love Percentage</CardTitle>
                <p className="card-category">percentage</p>
            </CardHeader>
            <CardBody style={{ height: "266px" }}>
                <Pie
                    data={{
                        labels: Object.keys(lovePercentageData),
                        datasets: [{
                            data: Object.values(lovePercentageData),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                            ],
                            borderWidth: 1,
                        }]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                />
            </CardBody>
            <CardFooter>
                {/* <div className="legend">
                    <i className="fa fa-circle text-primary" /> Opened{' '}
                    <i className="fa fa-circle text-warning" /> Read{' '}
                    <i className="fa fa-circle text-danger" /> Deleted{' '}
                    <i className="fa fa-circle text-gray" /> Unopened
                </div> */}
                <hr />
                <div className="stats">
                    <i className="fa fa-home" />Love Percentage form both Users
                </div>
            </CardFooter>
        </Card>
            
          </Col>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                <p className="card-category">Line Chart with Points</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboardNASDAQChart.data}
                  options={dashboardNASDAQChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                  <i className="fa fa-circle text-warning" /> BMW 5 Series
                </div>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
