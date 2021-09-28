import { Line, Bar } from 'react-chartjs-2';

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

/**
 * Displays data as a chart.
 */
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
