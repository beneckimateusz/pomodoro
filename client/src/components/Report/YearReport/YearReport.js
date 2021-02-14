import { gql, useQuery } from '@apollo/client';
import { Box, Grid, Paper, Typography, useTheme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { Pie, PieChart, Tooltip } from 'recharts';
import { Month } from '../../../lib/date';
import Loading from '../../Loading/Loading';
import Summary from '../../Summary/Summary';

const YEAR_REPORT = gql`
  query YearReport($year: Int!) {
    yearReport(year: $year) {
      totalDuration
      totalPomodoroCount
      avgTotalDuration
      avgTotalPomodoroCount
      monthSummaries {
        month
        duration
        avgDuration
        pomodoroCount
      }
    }
  }
`;

const SingleMonthTooltip = (props) => {
  if (props.active) {
    const { payload, year } = props;
    return (
      <Paper elevation={2}>
        {payload && (
          <Box px={2} py={1}>
            <Typography variant="subtitle2">
              {Month[payload[0].name]} {year}
            </Typography>
            <Typography variant="body2" color="primary">
              {payload[0].value}{' '}
              {payload[0].dataKey === 'duration' ? 'min' : 'pomodoro(s)'}
            </Typography>
            {payload[0].dataKey === 'duration' && (
              <Typography variant="body2">
                Average pomodoro: {payload[0].payload.avgDuration.toFixed(2)}{' '}
                min
              </Typography>
            )}
          </Box>
        )}
      </Paper>
    );
  }

  return null;
};

const YearReport = ({ year }) => {
  const theme = useTheme();
  const { loading, error, data } = useQuery(YEAR_REPORT, {
    fetchPolicy: 'cache-and-network',
    variables: { year },
  });

  const chartData = data?.yearReport.monthSummaries;

  const renderChart = () => (
    <PieChart width={400} height={350}>
      <Pie
        data={chartData}
        dataKey="pomodoroCount"
        nameKey="month"
        fill={theme.palette.secondary.main}
        outerRadius={80}
      />
      <Pie
        data={chartData}
        dataKey="duration"
        nameKey="month"
        label
        fill={theme.palette.primary.main}
        innerRadius={90}
        outerRadius={120}
      />
      <Tooltip content={<SingleMonthTooltip year={year} />} />
    </PieChart>
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
            totalDuration={data?.yearReport.totalDuration}
            totalPomodoroCount={data?.yearReport.totalPomodoroCount}
            avgDuration={data?.yearReport.avgTotalDuration}
            avgPomodoroCount={data?.yearReport.avgTotalPomodoroCount}
            avgUnit="month"
          />
        </Grid>
      </Grid>
    ) : (
      <Typography variant="subtitle1">No data available</Typography>
    );
  };

  return renderData();
};

YearReport.propTypes = {
  year: PropTypes.number.isRequired,
};

export default YearReport;
