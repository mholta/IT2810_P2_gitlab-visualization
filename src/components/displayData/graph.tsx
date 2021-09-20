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
  datasets?: Array<{
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
  return (
    <ReactFrappeChart
      axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: 1 }}
      //   height={250}
      //   type="bar"
      colors={['#000', '#eee']}
      data={data}
    />
  );
};

export default Graph;
