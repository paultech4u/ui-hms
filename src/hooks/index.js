import { useMediaQuery } from "@material-ui/core";

export function useIsDesktop(props) {
  return useMediaQuery((theme) => theme.breakpoints.up("md"));
}
