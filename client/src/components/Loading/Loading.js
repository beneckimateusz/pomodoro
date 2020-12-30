import { CircularProgress, Fade } from '@material-ui/core';

function Loading() {
  return (
    <Fade in={true} style={{ transitionDelay: '500ms' }}>
      <CircularProgress />
    </Fade>
  );
}

export default Loading;
