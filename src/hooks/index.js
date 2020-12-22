import { useMediaQuery } from '@material-ui/core';

/**
 *
 * @return {Boolean} bool
 */
export function useIsDesktop(props) {
  return useMediaQuery((theme) => theme.breakpoints.up('md'));
}
