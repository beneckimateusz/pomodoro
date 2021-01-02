import { CircularProgress, Fade } from '@material-ui/core';

function Loading() {
  return (
    <Fade in={true}>
      <CircularProgress />
    </Fade>
  );
}

export default Loading;
