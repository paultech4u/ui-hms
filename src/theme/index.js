import { createMuiTheme, withStyles } from "@material-ui/core";

const secondary = "";
const darkBlack = "";
const background = "";
const backgroundPaper = "";
// const warningLight = "";
// const warningMain = "";
// const warningDark = "";

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

// spacing
const spacing = 2;

const theme = createMuiTheme({
  palette: {
    primary: { main: "#8256DE", light: "#8c14fc", dark: "#663399" },
    secondary: { main: "#0000" },
    common: {
      black: "#000000",
      darkBlack,
    },
    background: { default: background, paper: backgroundPaper },
  },
  breakpoints: {
    values: {
      xl,
      lg,
      md,
      sm,
      xs,
    },
  },
  typography: {},
  spacing: spacing,
});

export const GlobalCss = withStyles({
  "@global": {
    "html, body, #root": {
      height: "100%",
    },
  },
})(() => null);

export default theme;
