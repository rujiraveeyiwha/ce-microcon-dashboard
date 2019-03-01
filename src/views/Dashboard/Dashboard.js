import React, { Component, lazy } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Badge,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Progress,
  Row
} from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

const Widget03 = lazy(() => import("../../views/Widgets/Widget03"));

const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
const brandWarning = getStyle("--warning");
const brandDanger = getStyle("--danger");

// Card Chart 1
const cardChartData1 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandPrimary,
      borderColor: "rgba(255,255,255,.55)",
      data: [65, 59, 84, 84, 51, 55, 40]
    }
  ]
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent"
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent"
        }
      }
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5
        }
      }
    ]
  },
  elements: {
    line: {
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
};

// Card Chart 2
const cardChartData2 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandInfo,
      borderColor: "rgba(255,255,255,.55)",
      data: [1, 18, 9, 17, 34, 22, 11]
    }
  ]
};

// Card Chart 3
const cardChartData3 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,255,255,.2)",
      borderColor: "rgba(255,255,255,.55)",
      data: [78, 81, 80, 45, 34, 12, 40]
    }
  ]
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        display: false
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
};

// Card Chart 4
const cardChartData4 = {
  labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,255,255,.3)",
      borderColor: "transparent",
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98]
    }
  ]
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  }
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: "facebook" },
  { data: [1, 13, 9, 17, 34, 41, 38], label: "twitter" },
  { data: [78, 81, 80, 45, 34, 12, 40], label: "linkedin" },
  { data: [35, 23, 56, 22, 97, 23, 64], label: "google" }
];

const makeSocialBoxData = dataSetNo => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        backgroundColor: "rgba(255,255,255,.1)",
        borderColor: "rgba(255,255,255,.55)",
        pointHoverBackgroundColor: "#fff",
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label
      }
    ]
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        display: false
      }
    ],
    yAxes: [
      {
        display: false
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

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: "New Clients"
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: "Recurring Clients"
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: "Pageviews"
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: "Organic"
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: "CTR"
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: "Bounce Rate"
  }
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    datasets: [
      {
        backgroundColor: "transparent",
        borderColor: variant ? variant : "#c2cfd6",
        data: dataset.data,
        label: dataset.label
      }
    ]
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  },
  legend: {
    display: false
  }
};

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: [
    "19 Mar",
    "20 Mar",
    "21 Mar",
    "22 Mar",
    "23 Mar",
    "24 Mar",
    "25 Mar"
  ],
  datasets: [
    {
      label: "Node A",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      data: data1
    },
    {
      label: "Node B",
      backgroundColor: "transparent",
      borderColor: brandSuccess,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      data: data2
    },
    {
      label: "Node C",
      backgroundColor: "transparent",
      borderColor: brandDanger,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 1,
      data: data3
    }
  ]
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: "index",
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
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
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

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2
    };
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

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">OVERVIEW</CardTitle>
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
                          Day
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(2)}
                          active={this.state.radioSelected === 2}>
                          Month
                        </Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
                <div
                  className="chart-wrapper"
                  style={{ height: 300 + "px", marginTop: 40 + "px" }}>
                  <Line data={mainChart} options={mainChartOpts} height={300} />
                </div>
              </CardBody>
              <CardFooter>
                <Row className="text-center">
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Node A</div>
                    <strong>29.703 Users (40%)</strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="success"
                      value="40"
                    />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="text-muted">Node B</div>
                    <strong>24.093 Users (20%)</strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="info"
                      value="20"
                    />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Node C</div>
                    <strong>22.123 Users (80%)</strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="danger"
                      value="80"
                    />
                  </Col>
                </Row>
              </CardFooter>
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
                  <Col sm="7" className="d-none d-sm-inline-block">
                    <ButtonToolbar
                      className="float-right"
                      aria-label="Toolbar with button groups">
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(1)}
                          active={this.state.radioSelected === 1}>
                          Day
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(2)}
                          active={this.state.radioSelected === 2}>
                          Month
                        </Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
                <Row>
                  <Col
                    sm="4"
                    className="chart-wrapper"
                    style={{ height: 300 + "px", marginTop: 40 + "px" }}>
                    <Line
                      data={mainChart}
                      options={mainChartOpts}
                      height={300}
                    />
                  </Col>
                  <Col
                    sm="4"
                    className="chart-wrapper"
                    style={{ height: 300 + "px", marginTop: 40 + "px" }}>
                    <Line
                      data={mainChart}
                      options={mainChartOpts}
                      height={300}
                    />
                  </Col>
                  <Col
                    sm="4"
                    className="chart-wrapper"
                    style={{ height: 300 + "px", marginTop: 40 + "px" }}>
                    <Line
                      data={mainChart}
                      options={mainChartOpts}
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
