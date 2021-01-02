import loadable from "@loadable/component";
import { Box } from "@material-ui/core";

export function Loading(props) {
  return <Box>Loading...</Box>;
}

export function lazyload(LoadFn, options) {
  return loadable(LoadFn, { fallback: <Loading />, ...options });
}
