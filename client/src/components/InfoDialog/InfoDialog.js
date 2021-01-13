import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';

function InfoDialog({ opened, onClose }) {
  return (
    <Dialog open={opened} onClose={onClose}>
      <DialogTitle>What's this site about?</DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="body1">
              Have you ever wondered how long human's brain is able to remain
              focused? Maybe you find yourself constantly procrastinating and
              are willing to find out what's the right method of time mangament
              that could possibly help to avoid it.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Either way, it won't hurt to try the{' '}
              <Link
                href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
                target="_blank"
                rel="noopener"
              >
                pomodoro technique
              </Link>
              .
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              The whole idea is based on dividing your time into three
              intervals: <strong>pomodoro</strong>, <strong>short break</strong>{' '}
              and <strong>long break</strong>.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              You can start right away with those simple steps:
            </Typography>
            <ol>
              <li>Pick a task to work on.</li>
              <li>Start the pomodoro timer.</li>
              <li>Work on your task.</li>
              <li>
                When the time ends, award yourself with a{' '}
                <strong>short break</strong>.
              </li>
              <li>
                After 4 <strong>pomodoro</strong>/<strong>short break</strong>{' '}
                intervals, go for a <strong>long break</strong>.
              </li>
            </ol>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              Developed with ☕ by{' '}
              <Link href="https://mbenecki.com" target="_blank" rel="noopener">
                Mateusz Benecki
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

InfoDialog.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InfoDialog;
