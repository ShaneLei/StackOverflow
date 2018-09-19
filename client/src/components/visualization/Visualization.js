import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from "recharts";

import { PieChart, Pie, Sector } from "recharts";

// const data = [
//   { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
//   { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
//   { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
//   { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
//   { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
//   { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
//   { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
// ];

// const data_pie = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 }
// ];

class Visualization extends Component {
  constructor() {
    super();

    this.state = {
      count_askClick: 0,
      count_newestClick: 0,
      count_votesClick: 0,
      count_scroll: 0,
      count_mouseMove: 0,
      activeIndex: 0,
      activeIndex_pie: 0
    };
  }

  componentDidMount() {
    const { user } = this.props.auth;
    const email = {
      email: user.email
    };

    // Get scroll count number from api
    axios
      .post("/api/visualization/getScroll", email)
      .then(res => {
        const interactions = res.data.interaction;
        var count = 0;
        for (var i = 0; i < interactions.length; i++) {
          if (interactions[i]["interactionType"] === "scroll") {
            count++;
          }
        }
        console.log(count);
        this.setState({ count_scroll: count });
      })
      .catch(err => console.log(err));

    // Get mouseMove count number from api
    axios
      .post("/api/visualization/getMouseMove", email)
      .then(res => {
        const interactions = res.data.interaction;
        var count = 0;
        for (var i = 0; i < interactions.length; i++) {
          if (interactions[i]["interactionType"] === "mouseMove") {
            count++;
          }
        }
        console.log(count);
        this.setState({ count_mouseMove: count });
      })
      .catch(err => console.log(err));

    // Get askClick count number from api
    axios
      .post("/api/visualization/getAskClick", email)
      .then(res => {
        const interactions = res.data.interaction;
        var count = 0;
        for (var i = 0; i < interactions.length; i++) {
          if (interactions[i]["interactionType"] === "askClick") {
            count++;
          }
        }
        console.log(count);
        this.setState({ count_askClick: count });
      })
      .catch(err => console.log(err));

    // Get newestClick count number from api
    axios
      .post("/api/visualization/getNewestClick", email)
      .then(res => {
        const interactions = res.data.interaction;
        var count = 0;
        for (var i = 0; i < interactions.length; i++) {
          if (interactions[i]["interactionType"] === "newestClick") {
            count++;
          }
        }
        console.log(count);
        this.setState({ count_newestClick: count });
      })
      .catch(err => console.log(err));

    // Get votesClick count number from api
    axios
      .post("/api/visualization/getVotesClick", email)
      .then(res => {
        const interactions = res.data.interaction;
        var count = 0;
        for (var i = 0; i < interactions.length; i++) {
          if (interactions[i]["interactionType"] === "votesClick") {
            count++;
          }
        }
        console.log(count);
        this.setState({ count_votesClick: count });
      })
      .catch(err => console.log(err));
  }

  handleClick(data, index) {
    this.setState({
      activeIndex: index
    });
  }

  onPieEnter(data, index) {
    this.setState({
      activeIndex_pie: index
    });
  }

  render() {
    const data = [
      { interaction: "scroll", count: this.state.count_scroll },
      { interaction: "mouseMove", count: this.state.count_mouseMove }
    ];

    const data_pie = [
      { interaction: "askClick", value: this.state.count_askClick },
      { interaction: "newestClick", value: this.state.count_newestClick },
      { interaction: "votesClick", value: this.state.count_votesClick }
    ];

    const { activeIndex } = this.state;
    const activeItem = data[activeIndex];

    const renderActiveShape = props => {
      const RADIAN = Math.PI / 180;
      const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value
      } = props;
      const sin = Math.sin(-RADIAN * midAngle);
      const cos = Math.cos(-RADIAN * midAngle);
      const sx = cx + (outerRadius + 10) * cos;
      const sy = cy + (outerRadius + 10) * sin;
      const mx = cx + (outerRadius + 30) * cos;
      const my = cy + (outerRadius + 30) * sin;
      const ex = mx + (cos >= 0 ? 1 : -1) * 22;
      const ey = my;
      const textAnchor = cos >= 0 ? "start" : "end";

      return (
        <g>
          <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
            {payload.interaction}
          </text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
          <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
          />
          <path
            d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
            stroke={fill}
            fill="none"
          />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            textAnchor={textAnchor}
            fill="#333"
          >{`Times: ${value}`}</text>
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            dy={18}
            textAnchor={textAnchor}
            fill="#999"
          >
            {`(Rate ${(percent * 100).toFixed(2)}%)`}
          </text>
        </g>
      );
    };
    return (
      <div className="container center">
        <BarChart
          width={600}
          height={400}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="interaction" />
          <YAxis dataKey="count" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill="#8884d8"
            barSize={100}
            onClick={this.handleClick.bind(this)}
          >
            {data.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
        <br />
        <p className="content mleft">{`The number of "${
          activeItem.interaction
        }" interaction: ${activeItem.count}`}</p>
        <hr />

        <PieChart width={800} height={400}>
          <Pie
            activeIndex={this.state.activeIndex_pie}
            activeShape={renderActiveShape}
            data={data_pie}
            cx={300}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="orange"
            onMouseEnter={this.onPieEnter.bind(this)}
          />
        </PieChart>
      </div>
    );
  }
}

Visualization.PropTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Visualization);
