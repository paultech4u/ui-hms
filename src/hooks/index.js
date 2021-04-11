import { useMediaQuery } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

/**
 * @return {Boolean} boolean
 */
export function useIsDesktop(props) {
  return useMediaQuery((theme) => theme.breakpoints.up('md'));
}

/**
 * @return {Boolean} boolean
 */
export function useIsMobile(props) {
  return useMediaQuery((theme) => theme.breakpoints.up('sm'));
}

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
