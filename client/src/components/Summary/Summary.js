import { gql, useLazyQuery } from '@apollo/client';
import { Grid, Paper, Tab, Tabs } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import {
  getTimePeriodRange,
  TimePeriodId,
  TimePeriodLabel,
} from '../../lib/date';

const SUMMARY = gql`
  query PeriodSummary($startDate: DateTime!, $endDate: DateTime!) {
    periodSummary(startDate: $startDate, endDate: $endDate) {
      pomodoros {
        id
        endDate
        duration
      }
    }
  }
`;

const Summary = () => {
  const { currentUser } = useCurrentUser();
  const [getSummary, { loading, data: summary }] = useLazyQuery(SUMMARY);
  const [timePeriodId, setTimePeriodId] = useState(TimePeriodId.DAY);

  const handleTimePeriodChange = (e, newValue) => {
    setTimePeriodId(newValue);
  };

  useEffect(() => {
    const range = getTimePeriodRange(TimePeriodLabel[timePeriodId]);
    getSummary({
      variables: { startDate: range.startDate, endDate: range.endDate },
    });
  }, [timePeriodId, getSummary]);

  return (
    <Grid container direction="column">
      <Grid container item justify="center">
        <Grid item>
          {!currentUser ? (
            <Alert severity="info">
              This feature is available for logged-in users only
            </Alert>
          ) : (
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
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Summary;
