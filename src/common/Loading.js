import loadable from '@loadable/component';
import { Box } from '@material-ui/core';

export function Loading(props) {
  return (
    <Box display='flex' alignItems='center' justifyContent='center' height={1}>
      Loading...
    </Box>
  );
}

export function lazyload(LoadFn, options) {
  return loadable(LoadFn, { fallback: <Loading />, ...options });
}
