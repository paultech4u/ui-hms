import { useMediaQuery } from '@material-ui/core';
import { useLocation } from "react-router-dom";

/**
 *
 * @return {Boolean} boolean
 */
export function useIsDesktop(props) {
  return useMediaQuery((theme) => theme.breakpoints.up('md'));
}


export function useQuery(){
  return new URLSearchParams(useLocation().search)
}