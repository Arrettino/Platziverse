import React, { Component } from "react";
import moment from "moment";
import OptionsMetric from "./OptionsMetric";
import CanvasJSReact from "./canvasjs.react";
import io from "socket.io-client";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class Metric extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      options: undefined,
      pepe: true,
    };
  }

  async componentDidMount() {
    await this.fetchData();
    this.setOptions();
    this.socket = io('/')
    console.log(this.state.options)
    this.socket.on('agent/message', async payload => {
      
      let newData = {
        x:new Date(moment(payload.timestamp).format('YYYY-MM-D h:mm:ss')),
        y: payload.metrics[2].value,
      }
      this.state.data.splice(-1)
      this.setState({data:[newData, ...this.state.data]})
      console.log(this.state.data)
      await this.setOptions()
      console.log(this.state.options)
    })
    
  }

  fetchData = async () => {
    try {
      const jose = await fetch(
        "http://localhost:8080/metrics/3/callbackMetric"
      );
      const data = await jose.json();
      this.dataPoints(data);
    } catch (e) {
      console.log(e);
    }
  };

  dataPoints = (data) => {
    const dataPoints = [];
    const labels = [];
    data.forEach((element) => {
      labels.push(moment(element.createdAt).format("YYYY-MM-D h:mm:ss"));
      dataPoints.push(element.value);
    });

    for (let elements in dataPoints) {
      this.state.data.push({
        x: new Date(labels[elements]),
        y: parseFloat(dataPoints[elements]),
      });
    }
  };

  setOptions = () => {
    this.setState({ options: OptionsMetric(this.state.data) });
  };
  render() {
    return (
      <div className="ChartWithCrosshair">
        <h1>React Area Chart With Crosshair</h1>
        <CanvasJSChart
          options={this.state.options}
          onRef={(ref) => (this.ChartWithCrosshair = ref)}
        />
      </div>
    );
  }
}

export default Metric;
