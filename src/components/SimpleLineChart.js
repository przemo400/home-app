import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import Typography from '@material-ui/core/Typography';

const data = [
  { name: 'Pon', Temp: 22, Hum: 50 },
  { name: 'Wt', Temp: 21, Hum: 60 },
  { name: 'Śr', Temp: 23, Hum: 70 },
  { name: 'Czw', Temp: 22, Hum: 60 },
  { name: 'Pt', Temp: 24, Hum: 80 },
  { name: 'Sob', Temp: 21, Hum: 45 },
  { name: 'Nd', Temp: 23, Hum: 50 },
];

const SimpleLineChart = () => {
  //function SimpleLineChart() {
  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <div>
      <ResponsiveContainer width="99%" height={320}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Temp" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Hum" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SimpleLineChart;
