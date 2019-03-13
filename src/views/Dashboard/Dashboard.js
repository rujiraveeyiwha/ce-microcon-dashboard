import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Badge,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Progress,
  Row
} from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.getDataFromFirebase();
    // this.myInterval = setInterval(
    //   () => this.getDataFromFirebase(),
    //   1000 * 60 * 1
    // );

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.load = true;

    this.state = {
      dropdownOpen: false,
      radioSelected: 1,
      mainChart: {
        datasets: [
          {
            label: "Node A",
            backgroundColor: hexToRgba("#118AB2", 10),
            borderColor: "#118AB2",
            pointHoverBackgroundColor: "#fff",
            borderWidth: 2,
            data: [10, 20, 30],
            spanGaps: true
          },
          {
            label: "Node B",
            backgroundColor: hexToRgba("#07C0BB", 10),
            borderColor: "#07C0BB",
            pointHoverBackgroundColor: "#fff",
            borderWidth: 2,
            data: [10, 20, 30],
            spanGaps: true,
          },
          {
            label: "Node C",
            backgroundColor: hexToRgba("#EF476F", 10),
            borderColor: "#EF476F",
            pointHoverBackgroundColor: "#fff",
            borderWidth: 2,
            data: [40, 40, 40, 40, 40],
            spanGaps: true
          }
        ]
      },
      mainChartA: {
        datasets: [
          {
            label: "Node A",
            backgroundColor: hexToRgba("#118AB2", 10),
            borderColor: "#118AB2",
            pointHoverBackgroundColor: "#fff",
            borderWidth: 2,
            data: [10, 20, 30]
          }
        ]
      },
      mainChartB: {
        datasets: [
          {
            label: "Node B",
            backgroundColor: hexToRgba("#07C0BB", 10),
            borderColor: "#07C0BB",
            pointHoverBackgroundColor: "#fff",
            borderWidth: 2,
            data: [10, 20, 30]
          }
        ]
      },
      mainChartC: {
        datasets: [
          {
            label: "Node C",
            backgroundColor: hexToRgba("#EF476F", 10),
            borderColor: "#EF476F",
            pointHoverBackgroundColor: "#fff",
            borderWidth: 2,
            data: [10, 11, 12, 13, 14, 15, 16, 17]
          }
        ]
      }
    };


    this.mainChartOpts = {
      responsive: true,
      tooltips: {
        enabled: false,
        custom: CustomTooltips,
        intersect: true,
        mode: "single", //single or index
        position: "nearest",
        callbacks: {
          labelColor: function(tooltipItem, chart) {
            return {
              backgroundColor:
                chart.data.datasets[tooltipItem.datasetIndex].borderColor
            };
          }
        }
      },
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false
            },
            ticks: {
              autoSkip: true,
              source: "labels"
            },
            type: "time",
            time: {
              unit: "hour",
              displayFormats: {
                hour: "hA D/MMM"
              },
              
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: 10,
              max: 40
            }
          }
        ]
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    };
  }

  getDataFromFirebase() {
    console.log("[GET DATA FROM FIREBASE]");
    return axios
      .get(
        "https://cors-anywhere.herokuapp.com/" +
          "us-central1-ce-microcon-logger.cloudfunctions.net/api/v1/graphdata"
      )
      .then(response => {
        this.load = false;
        const data = JSON.stringify(response.data, null, 4);
        console.log("[RESPONSE] " + data);

        const resData = response.data.map(x =>
          x.filter(
            y =>
              new Date() - new Date(y.timestampISO) <= 1000 * 60 * 60 * 24 * 7
          )
        );
        // const tData = resData.map(x => x.map(y => y.value));
        const tLabel = resData.map(x =>
          x.map(y => this.roundHour(new Date(y.timestampISO)))
        );
        const tXY = resData.map(x =>
          x.map(y => {
            return {
              y: y.value,
              x: this.roundHour(new Date(y.timestampISO))
            };
          })
        );

        const newChartData = {
          ...this.state.mainChart,
          labels: tLabel[1],
          datasets: [
            {
              ...this.state.mainChart.datasets[0],
              data: tXY[0]
            },
            {
              ...this.state.mainChart.datasets[1],
              data: tXY[1]
            },
            {
              ...this.state.mainChart.datasets[2],
              data: tXY[2]
            }
          ]
        };
        // console.log(this.state.mainChart.datasets[1]);

        const newChartDataA = {
          ...this.state.mainChartA,
          labels: tLabel[0],
          datasets: [
            {
              ...this.state.mainChart.datasets[0],
              data: tXY[0]
            }
          ]
        };

        const newChartDataB = {
          ...this.state.mainChartB,
          labels: tLabel[1],
          datasets: [
            {
              ...this.state.mainChart.datasets[1],
              data: tXY[1]
            }
          ]
        };

        const newChartDataC = {
          ...this.state.mainChartC,
          labels: tLabel[2],
          datasets: [
            {
              ...this.state.mainChart.datasets[2],
              data: tXY[2]
            }
          ]
        };

        this.setState({
          mainChart: newChartData,
          mainChartA: newChartDataA,
          mainChartB: newChartDataB,
          mainChartC: newChartDataC
        });
        // console.log(this.state.mainChart);
      })
      .catch(error => console.log("Error: " + error));
  }

  roundHour(date) {
    date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  componentDidMount() {
    let intervalId = setInterval(
      () => this.getDataFromFirebase(),
      1000 * 60 * 60
    ); //polling every hour
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return this.load === true ? (
      this.loading()
    ) : (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Overview</CardTitle>
                    <div className="small text-muted">19 - 25 March 2019</div>
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    <ButtonToolbar
                      className="float-right"
                      aria-label="Toolbar with button groups">
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(1)}
                          active={this.state.radioSelected === 1}>
                          19 Mar
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(2)}
                          active={this.state.radioSelected === 2}>
                          20 Mar
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(3)}
                          active={this.state.radioSelected === 3}>
                          21 Mar
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(4)}
                          active={this.state.radioSelected === 4}>
                          22 Mar
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(5)}
                          active={this.state.radioSelected === 5}>
                          23 Mar
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(6)}
                          active={this.state.radioSelected === 6}>
                          24 Mar
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(7)}
                          active={this.state.radioSelected === 7}>
                          25 Mar
                        </Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
                <div
                  className="chart-wrapper"
                  style={{ height: 300 + "px", marginTop: 40 + "px" }}>
                  <Line
                    data={this.state.mainChart}
                    options={this.mainChartOpts}
                    height={300}
                    redraw
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* 2nd Graph */}
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Graph by Node</CardTitle>
                    <div className="small text-muted">19 - 25 March 2019</div>
                  </Col>
                </Row>
                <Row>
                  <Col
                    sm="4"
                    className="chart-wrapper"
                    style={{ height: 300 + "px", marginTop: 40 + "px" }}>
                    <Line
                      data={this.state.mainChartA}
                      options={this.mainChartOpts}
                      height={300}
                    />
                  </Col>
                  <Col
                    sm="4"
                    className="chart-wrapper"
                    style={{ height: 300 + "px", marginTop: 40 + "px" }}>
                    <Line
                      data={this.state.mainChartB}
                      options={this.mainChartOpts}
                      height={300}
                    />
                  </Col>
                  <Col
                    sm="4"
                    className="chart-wrapper"
                    style={{ height: 300 + "px", marginTop: 40 + "px" }}>
                    <Line
                      data={this.state.mainChartC}
                      options={this.mainChartOpts}
                      height={300}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* 3rd Grpah */}
        <Row>
          <Col>
            <Card>
              <CardHeader>Highest {" & "} Lowest Temperature</CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="6" xl="6">
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">19 March</span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress
                          className="progress-xs"
                          color="info"
                          value="34"
                        />
                        <Progress
                          className="progress-xs"
                          color="danger"
                          value="78"
                        />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">20 March</span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress
                          className="progress-xs"
                          color="info"
                          value="56"
                        />
                        <Progress
                          className="progress-xs"
                          color="danger"
                          value="94"
                        />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">21 March</span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress
                          className="progress-xs"
                          color="info"
                          value="12"
                        />
                        <Progress
                          className="progress-xs"
                          color="danger"
                          value="67"
                        />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">22 March</span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress
                          className="progress-xs"
                          color="info"
                          value="43"
                        />
                        <Progress
                          className="progress-xs"
                          color="danger"
                          value="91"
                        />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">23 March</span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress
                          className="progress-xs"
                          color="info"
                          value="22"
                        />
                        <Progress
                          className="progress-xs"
                          color="danger"
                          value="73"
                        />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">24 March</span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress
                          className="progress-xs"
                          color="info"
                          value="53"
                        />
                        <Progress
                          className="progress-xs"
                          color="danger"
                          value="82"
                        />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">25 March</span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress
                          className="progress-xs"
                          color="info"
                          value="9"
                        />
                        <Progress
                          className="progress-xs"
                          color="danger"
                          value="69"
                        />
                      </div>
                    </div>
                    <div className="legend text-center">
                      <small>
                        <sup className="px-1">
                          <Badge pill color="info">
                            &nbsp;
                          </Badge>
                        </sup>
                        Lowest Temperature &nbsp;
                        <sup className="px-1">
                          <Badge pill color="danger">
                            &nbsp;
                          </Badge>
                        </sup>
                        Highest Temperature
                      </small>
                    </div>
                  </Col>
                </Row>
                <br />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
