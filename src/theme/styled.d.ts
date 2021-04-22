// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    gutterSpace: number;
    borderRadius: string;

    colors: {
      main: string;
      secondary: string;
    };
  }
}
