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
import { getTimePeriodRange } from '../../../lib/date';
import Loading from '../../Loading/Loading';
import Summary from '../../Summary/Summary';

const PERIOD_REPORT = gql`
  query PeriodReport($startDate: DateTime!, $endDate: DateTime!) {
    periodReport(startDate: $startDate, endDate: $endDate) {
      totalDuration
      totalPomodoroCount
      avgTotalDuration
      avgTotalPomodoroCount
      daySummaries {
        date
        duration
        avgDuration
        pomodoroCount
      }
    }
  }
`;

const ShortDateAxisTick = ({ x, y, payload }) => {
  return (
    <text x={x} y={y} dy={16} fill="#666" textAnchor="middle">
      {payload.value.substring(5, 10)}
    </text>
  );
};

const SingleDayTooltip = (props) => {
  if (props.active) {
    const { payload, label } = props;
    return (
      <Paper elevation={2}>
        {payload && (
          <Box px={2} py={1}>
            <Typography variant="subtitle2">{label}</Typography>
            <Typography variant="body2" color="primary">
              {payload[0].payload.duration} min
            </Typography>
            <Typography variant="body2">
              {payload[0].payload.pomodoroCount} pomodoro(s)
            </Typography>
            <Typography variant="body2">
              Average: {payload[0].payload.avgDuration.toFixed(2)} min
            </Typography>
          </Box>
        )}
      </Paper>
    );
  }

  return null;
};

const PeriodReport = ({ timePeriodId }) => {
  const dateRange = getTimePeriodRange(timePeriodId);
  const theme = useTheme();

  const { loading, error, data } = useQuery(PERIOD_REPORT, {
    fetchPolicy: 'cache-and-network',
    variables: dateRange,
  });

  const chartData = data?.periodReport.daySummaries;

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
      <XAxis dataKey="date" tick={<ShortDateAxisTick />} />
      <YAxis />
      <Tooltip content={<SingleDayTooltip />} />
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
      <Grid item container justify="center" alignItems="center" spacing={4}>
        <Grid item>{renderChart()}</Grid>
        <Grid item>
          <Summary
            totalDuration={data?.periodReport.totalDuration}
            totalPomodoroCount={data?.periodReport.totalPomodoroCount}
            avgDuration={data?.periodReport.avgTotalDuration}
            avgPomodoroCount={data?.periodReport.avgTotalPomodoroCount}
            avgUnit="day"
          />
        </Grid>
      </Grid>
    ) : (
      <Typography variant="subtitle1">No data available</Typography>
    );
  };

  return renderData();
};

PeriodReport.propTypes = {
  timePeriodId: PropTypes.number.isRequired,
};

export default PeriodReport;
