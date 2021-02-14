import { Grid, makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import { TimePeriodId, TimePeriodLabel } from '../../lib/date';
import PeriodReport from './PeriodReport/PeriodReport';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
}));

const Report = () => {
  const classes = useStyles();
  const { currentUser } = useCurrentUser();
  const [timePeriodId, setTimePeriodId] = useState(TimePeriodId.MONTH);

  const handleTimePeriodChange = (e, newValue) => {
    setTimePeriodId(newValue);
  };

  const renderReport = () => {
    switch (timePeriodId) {
      case TimePeriodId.DAY:
      case TimePeriodId.WEEK:
      case TimePeriodId.MONTH:
        return <PeriodReport timePeriodId={timePeriodId} />;
      case TimePeriodId.YEAR:
        return null;
      default:
        return null;
    }
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
          <Grid item>{renderReport()}</Grid>
        </>
      )}
    </Grid>
  );
};

export default Report;
