import { useContext } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { FilterContext } from '../../context/filter.context';

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
  const {
    state: { users }
  } = useContext(FilterContext);

  // Hide or show user
  const displayData = { ...data };
  displayData.datasets = data.datasets.filter(
    (d: any) => users[users.map((u) => u.alias).indexOf(d.label)].show
  );

  switch (data.chartType) {
    case 'line': {
      return <Line data={data} options={{ maintainAspectRatio: false }} />;
    }
    case 'bar': {
      return <Bar data={data} options={{ maintainAspectRatio: false }} />;
    }
    default: {
      return <div></div>;
    }
  }
};

export default Graph;
