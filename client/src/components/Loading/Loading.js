import { Fade, LinearProgress } from '@material-ui/core';

function Loading() {
  return (
    <Fade in={true} style={{ transitionDelay: '500ms' }}>
      <LinearProgress />
    </Fade>
  );
}

export default Loading;
