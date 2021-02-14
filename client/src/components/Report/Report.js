import { gql, useLazyQuery } from '@apollo/client';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ScheduleIcon from '@material-ui/icons/Schedule';
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

const REPORT = gql`
  query PeriodReport($startDate: DateTime!, $endDate: DateTime!) {
    periodReport(startDate: $startDate, endDate: $endDate) {
      totalDuration
      totalPomodoroCount
      daySummaries {
        date
        duration
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
        <Box px={2} py={1}>
          <Typography variant="subtitle2">{label}</Typography>
          <Typography variant="body2" color="primary">
            {payload && payload[0].payload.duration} min
          </Typography>
          <Typography variant="body2">
            {payload && payload[0].payload.pomodoroCount} pomodoro(s)
          </Typography>
        </Box>
      </Paper>
    );
  }

  return null;
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
}));

const Report = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { currentUser } = useCurrentUser();
  const [getSummary, { loading, data }] = useLazyQuery(REPORT, {
    fetchPolicy: 'cache-and-network',
  });
  const [timePeriodId, setTimePeriodId] = useState(TimePeriodId.MONTH);

  const handleTimePeriodChange = (e, newValue) => {
    setTimePeriodId(newValue);
  };

  useEffect(() => {
    const range = getTimePeriodRange(TimePeriodLabel[timePeriodId]);
    getSummary({
      variables: range,
    });
  }, [timePeriodId, getSummary]);

  const chartData = data?.periodReport.daySummaries;

  const renderLineChart = () => (
    <LineChart
      width={900}
      height={300}
      data={chartData}
      margin={{ top: 5, right: 30, bottom: 5, left: 0 }}
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
    return chartData?.length > 0 ? (
      <>
        <Grid item>{renderLineChart()}</Grid>
        <Grid item>
          <Paper elevation={3}>
            <List>
              <ListItem>
                <ListItemText style={{ textAlign: 'center' }}>🤠</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ScheduleIcon />
                </ListItemIcon>
                <ListItemText>
                  Total duration:{' '}
                  <strong>{data?.periodReport.totalDuration} min</strong>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PlayArrowIcon />
                </ListItemIcon>
                <ListItemText>
                  Total pomodoros:{' '}
                  <strong>{data?.periodReport.totalPomodoroCount}</strong>
                </ListItemText>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </>
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
          {loading ? (
            <Grid item>
              <Loading />
            </Grid>
          ) : (
            <Grid item container justify="center" spacing={2}>
              {renderData()}
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default Report;
