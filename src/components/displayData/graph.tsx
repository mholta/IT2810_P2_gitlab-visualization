import React from 'react';
// import ReactFrappeChart from 'react-frappe-charts';
import { Line, Bar } from 'react-chartjs-2';
// import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm';
export type ChartType =
  | 'line'
  | 'bar'
  | 'axis-mixed'
  | 'pie'
  | 'percentage'
  | 'heatmap';

export interface ChartData {
  labels?: Array<string>;
  chartType: ChartType;
  datasets: Array<{
    label?: string;
    data: Array<number>;
    backgroundColor?: string;
    borderColor?: string;
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
  switch (data.chartType) {
    case 'line': {
      return <Line data={data} />;
    }
    case 'bar': {
      return <Bar data={data} />;
    }
    default: {
      return <div></div>;
    }
  }
};

export default Graph;
