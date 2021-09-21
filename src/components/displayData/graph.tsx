import React from 'react';
import ReactFrappeChart from 'react-frappe-charts';
type ChartType =
  | 'line'
  | 'bar'
  | 'axis-mixed'
  | 'pie'
  | 'percentage'
  | 'heatmap';
export interface ChartData {
  labels?: Array<string>;
  datasets: Array<{
    name?: string;
    chartType?: ChartType;
    values: Array<number>;
  }>;
  dataPoints?: {
    [x: string]: number;
  };
  start?: Date;
  end?: Date;
}
interface GraphProps {
  data: ChartData;
}

const Graph = ({ data }: GraphProps) => {
  const number = data.datasets.length;
  const colors = [];
  for (let i = 0; i < number; i++) {
    colors.push('#' + Math.random().toString(16).substr(-6));
  }
  return (
    <ReactFrappeChart
      axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: 1 }}
      //   height={250}
      //   type="bar"
      colors={colors}
      data={data}
    />
  );
};

export default Graph;
