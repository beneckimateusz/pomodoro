import { gql, useLazyQuery } from '@apollo/client';
import {
  Grid,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import useCurrentUser from '../../hooks/useCurrentUser';
import {
  getTimePeriodRange,
  TimePeriodId,
  TimePeriodLabel,
} from '../../lib/date';
import Loading from '../Loading/Loading';

const SUMMARY = gql`
  query PeriodSummary($startDate: DateTime!, $endDate: DateTime!) {
    periodSummary(startDate: $startDate, endDate: $endDate) {
      date
      totalDuration
      pomodoros {
        id
        endDate
        duration
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

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
}));

const Summary = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { currentUser } = useCurrentUser();
  const [getSummary, { loading, data }] = useLazyQuery(SUMMARY);
  const [timePeriodId, setTimePeriodId] = useState(TimePeriodId.DAY);

  const handleTimePeriodChange = (e, newValue) => {
    setTimePeriodId(newValue);
  };

  useEffect(() => {
    const range = getTimePeriodRange(TimePeriodLabel[timePeriodId]);
    getSummary({
      variables: range,
    });
  }, [timePeriodId, getSummary]);

  const chartData = data?.periodSummary;

  const renderLineChart = () => {
    return chartData?.length > 0 ? (
      <LineChart
        width={900}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 30, bottom: 5, left: 0 }}
      >
        <Line
          type="monotone"
          dataKey="totalDuration"
          stroke={theme.palette.primary.main}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="8 8" />
        <XAxis dataKey="date" tick={<ShortDateAxisTick />} />
        <YAxis />
        <Tooltip formatter={(value, name) => [`${value} min`, 'Total']} />
      </LineChart>
    ) : (
      <Typography variant="subtitle1">No data available</Typography>
    );
  };

  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      alignItems="center"
      spacing={3}
    >
      {!currentUser ? (
        <Grid item>
          <Alert severity="info">
            This feature is available for logged-in users only
          </Alert>
        </Grid>
      ) : (
        <>
          <Grid item>
            <Paper>
              <Tabs
                value={timePeriodId}
                onChange={handleTimePeriodChange}
                centered
                indicatorColor="primary"
              >
                {Object.values(TimePeriodId).map((tp) => (
                  <Tab key={tp} label={TimePeriodLabel[tp]} />
                ))}
              </Tabs>
            </Paper>
          </Grid>
          <Grid item>{loading ? <Loading /> : renderLineChart()}</Grid>
        </>
      )}
    </Grid>
  );
};

export default Summary;
