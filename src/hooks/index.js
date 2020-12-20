import { useMediaQuery } from "@material-ui/core";

function useIsDesktop(props) {
  return useMediaQuery((theme) => theme.breakpoints.up("md"));
}
