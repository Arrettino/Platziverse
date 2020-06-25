import CanvasJSReact from "./canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;

function OptiosnMetric(data) {
  const Options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Stock Price of BMW - March 2018",
    },
    axisX: {
      valueFormatString: "HH:mm:ss",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      title: "Closing Price (in EUR)",
      includeZero: false,
      valueFormatString: "€##0.00",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
        labelFormatter: function (e) {
          return "€" + CanvasJS.formatNumber(e.value, "##0.00");
        },
      },
    },
    data: [
      {
        type: "area",
        xValueFormatString: "HH:mm:ss",
        yValueFormatString: "€##0.00",
        dataPoints: data,
      },
    ],
  };
  return Options;
}

export default OptiosnMetric;
