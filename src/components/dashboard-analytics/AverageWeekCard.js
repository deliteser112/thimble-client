import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import BaseOptionChart from '../dashboard-component/BaseOptionChart';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: '👨‍👦‍👦 swiss-office',
    data: [49, 62, 69, 91, 64, 45, 45]
  },
  {
    name: '🦧 Brief',
    data: [46, 34, 93, 56, 77, 88, 99]
  },
  {
    name: '💼 Office',
    data: [76, 94, 96, 76, 47, 68, 87]
  }
];

export default function AppAreaInstalled() {
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ]
    }
  });

  return (
    <Card>
      <CardHeader title="Average distribution per day of the week" />
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart
          type="area"
          series={CHART_DATA}
          options={chartOptions}
          height={300}
        />
      </Box>
    </Card>
  );
}
