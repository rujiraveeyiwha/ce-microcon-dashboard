import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import axios from "axios";
import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  CardText
} from "reactstrap";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.getDataFromFirebase();
    // this.myInterval = setInterval(
    //   () => this.getDataFromFirebase(),
    //   1000 * 60 * 1
    // );

    this.load = true;

    this.state = {
      radioSelected: 0,
      mainChart: {
        datasets: [
          {
            label: "Node A",
            backgroundColor: hexToRgba("#D1495B", 20),
            borderColor: "#D1495B",
            pointHoverBackgroundColor: "#fff",
            borderWidth: 2,
            data: [20, 20, 30],
            spanGaps: true
          },
          {
            label: "Node B",
            backgroundColor: hexToRgba("#EDAE49", 20),
            borderColor: "#EDAE49",
            pointHoverBackgroundColor: "#fff",
            borderWidth: 2,
            data: [20, 20, 30],
            spanGaps: true
          },
          {
            label: "Node C",
            backgroundColor: hexToRgba("#2111A0", 20),
            borderColor: "#2111A0",
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
            backgroundColor: hexToRgba("#D1495B", 20),
            borderColor: "#D1495B",
            pointHoverBackgroundColor: "#fff",
            borderWidth: 2,
            data: [20, 20, 30]
          }
        ]
      },
      mainChartB: {
        datasets: [
          {
            label: "Node B",
            backgroundColor: hexToRgba("#EDAE49", 20),
            borderColor: "#EDAE49",
            pointHoverBackgroundColor: "#fff",
            borderWidth: 2,
            data: [20, 20, 30]
          }
        ]
      },
      mainChartC: {
        datasets: [
          {
            label: "Node C",
            backgroundColor: hexToRgba("#054A91", 20),
            borderColor: "#054A91",
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
        // position: "nearest",
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
              drawOnChartArea: false,
              color: "#8B9096"
            },
            ticks: {
              autoSkip: true,
              source: "labels",
              fontColor: "#8B9096"
            },
            type: "time",
            time: {
              unit: "hour",
              displayFormats: {
                hour: "hA D/MMM"
              }
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: 10,
              max: 40,
              fontColor: "white",
              color: "#6A7178"
            },
            gridLines: {
              color: "#6A7178"
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
        this.setState({
          response: response.data
        });

        this.load = false;
        const data = JSON.stringify(response.data, null, 4);
        console.log("[RESPONSE] " + data);

        var today = new Date();
        var midNight = new Date();
        midNight.setHours(0);
        midNight.setMinutes(0);
        midNight.setSeconds(0);
        midNight.setMilliseconds(0);

        var stopDate = new Date();
        stopDate = new Date(midNight - 1000 * 60 * 60 * 24 * 7);
        this.graphSetup(today, stopDate);
      })
      .catch(error => console.log("Error: " + error));
  }

  roundHour(date) {
    date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  }

  onRadioBtnClick(radioSelected) {
    console.log(radioSelected);
    var shift = radioSelected;
    this.setState(
      {
        radioSelected: radioSelected
      },
      () => {
        var today = new Date();

        var midNight = new Date();
        midNight.setHours(0);
        midNight.setMinutes(0);
        midNight.setSeconds(0);
        midNight.setMilliseconds(0);

        if (radioSelected === 0) {
          var today = new Date();
          var midNight = new Date();
          midNight.setHours(0);
          midNight.setMinutes(0);
          midNight.setSeconds(0);
          midNight.setMilliseconds(0);

          var stopDate = new Date();
          stopDate = new Date(midNight - 1000 * 60 * 60 * 24 * 7);
          this.graphSetup(today, stopDate);
        } else {
          var stopDate = new Date(midNight - 1000 * 60 * 60 * 24 * shift);
          var midNightStop = new Date(stopDate.getTime() + 1000 * 24 * 60 * 60);
          this.graphSetup(midNightStop, stopDate);
        }
      }
    );
  }

  graphSetup(today, stopDate) {
    console.log("Start: " + today);
    console.log("Stop: " + stopDate);
    console.log("------------------------------------------");

    const resData = this.state.response.map(x =>
      x.filter(
        y =>
          new Date(y.timestampISO) <= today &&
          new Date(y.timestampISO) > stopDate
      )
    );

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

    this.setState({
      currentA: tXY[0][tXY[0].length - 1].y,
      currentB: tXY[1][tXY[1].length - 1].y,
      currentC: tXY[2][tXY[2].length - 1].y
    });

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
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center text-white">
      Loading...
    </div>
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
            <Card className="dark-card2">
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">
                      <h4>Overview</h4>
                    </CardTitle>
                    <div className="small text-muted">
                      7 Days Temperature Records
                    </div>
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    <ButtonToolbar
                      className="float-right"
                      aria-label="Toolbar with button groups">
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(0)}
                          active={this.state.radioSelected === 0}>
                          All
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(1)}
                          active={this.state.radioSelected === 1}>
                          Day 1
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(2)}
                          active={this.state.radioSelected === 2}>
                          Day 2
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(3)}
                          active={this.state.radioSelected === 3}>
                          Day 3
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(4)}
                          active={this.state.radioSelected === 4}>
                          Day 4
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(5)}
                          active={this.state.radioSelected === 5}>
                          Day 5
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(6)}
                          active={this.state.radioSelected === 6}>
                          Day 6
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(7)}
                          active={this.state.radioSelected === 7}>
                          Day 7
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
            <Card className="dark-card2">
              <CardBody className="mb-4">
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">
                      <h4>Graph by Node</h4>
                    </CardTitle>
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
                      redraw
                    />
                    <div className="text-center">Node A</div>
                  </Col>
                  <Col
                    sm="4"
                    className="chart-wrapper"
                    style={{ height: 300 + "px", marginTop: 40 + "px" }}>
                    <Line
                      data={this.state.mainChartB}
                      options={this.mainChartOpts}
                      height={300}
                      redraw
                    />
                    <div className="text-center">Node B</div>
                  </Col>
                  <Col
                    sm="4"
                    className="chart-wrapper"
                    style={{ height: 300 + "px", marginTop: 40 + "px" }}>
                    <Line
                      data={this.state.mainChartC}
                      options={this.mainChartOpts}
                      height={300}
                      redraw
                    />
                    <div className="text-center">Node C</div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* 3rd graph */}
        <Row>
          <Col sm="4">
            <Card body className="text-center dark-card2">
              <CardTitle className="text-center card-title">
                <h4>
                  Node A <i className="fa fa-microchip node-a" />
                </h4>
                <hr className="node-a" />
              </CardTitle>
              <CardText>{this.state.currentA} &#8451;</CardText>
            </Card>
          </Col>
          <Col sm="4">
            <Card body className="text-center dark-card2">
              <CardTitle className="text-center card-title">
                <h4>
                  Node B <i className="fa fa-microchip node-b" />
                </h4>
                <hr className="node-b" />
              </CardTitle>
              <CardText>{this.state.currentB} &#8451;</CardText>
            </Card>
          </Col>
          <Col sm="4">
            <Card body className="text-center dark-card2">
              <CardTitle className="text-center card-title">
                <h4>
                  Node C <i className="fa fa-microchip node-c" />
                </h4>
                <hr className="node-c" />
              </CardTitle>
              <CardText>{this.state.currentC} &#8451;</CardText>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
