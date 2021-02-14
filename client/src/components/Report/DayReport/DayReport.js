import { gql, useQuery } from '@apollo/client';
import { Box, Grid, Paper, Typography, useTheme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getTimeOnlyString } from '../../../lib/date';
import Loading from '../../Loading/Loading';
import Summary from '../../Summary/Summary';

const DAY_REPORT = gql`
  query DayReport($date: DateTime!) {
    dayReport(date: $date) {
      totalDuration
      totalPomodoroCount
      pomodoros {
        endDate
        duration
      }
    }
  }
`;

const ShortDateAxisTick = ({ x, y, payload }) => {
  return (
    <text x={x} y={y} dy={16} fill="#666" textAnchor="middle">
      {getTimeOnlyString(payload.value)}
    </text>
  );
};

const SingleDayTooltip = (props) => {
  if (props.active) {
    const { payload, label: time, date } = props;
    return (
      <Paper elevation={2}>
        <Box px={2} py={1}>
          <Typography variant="subtitle2">{date}</Typography>
          <Typography variant="body2">
            Ended at {getTimeOnlyString(time)}
          </Typography>
          <Typography variant="body2" color="primary">
            {payload && payload[0].payload.duration} min
          </Typography>
        </Box>
      </Paper>
    );
  }

  return null;
};

const DayReport = ({ date }) => {
  const theme = useTheme();

  const { loading, error, data } = useQuery(DAY_REPORT, {
    fetchPolicy: 'cache-and-network',
    variables: { date },
  });

  const chartData = data?.dayReport.pomodoros;

  const renderChart = () => (
    <LineChart
      width={900}
      height={300}
      data={chartData}
      margin={{ top: 5, right: 10, bottom: 5, left: 10 }}
    >
      <Line
        type="monotone"
        dataKey="duration"
        stroke={theme.palette.primary.main}
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="8 8" />
      <XAxis dataKey="endDate" tick={<ShortDateAxisTick />} />
      <YAxis />
      <Tooltip content={<SingleDayTooltip date={date} />} />
    </LineChart>
  );

  const renderData = () => {
    if (loading) {
      return (
        <Grid item>
          <Loading />
        </Grid>
      );
    } else if (error) {
      return <Alert severity="error">Could not fetch data</Alert>;
    }

    return chartData?.length > 0 ? (
      <Grid item container direction="column" alignItems="center" spacing={4}>
        <Grid item>{renderChart()}</Grid>
        <Grid item>
          <Summary
            totalDuration={data?.dayReport.totalDuration}
            totalPomodoroCount={data?.dayReport.totalPomodoroCount}
          />
        </Grid>
      </Grid>
    ) : (
      <Typography variant="subtitle1">No data available</Typography>
    );
  };

  return renderData();
};

DayReport.propTypes = {
  date: PropTypes.string.isRequired,
};

export default DayReport;
