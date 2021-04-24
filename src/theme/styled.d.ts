// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    gutterSpace: number;
    borderRadius: string;

    colors: { [key: string]: string };

    breakpoints: {
      [name in "xs" | "sm"]: string;
    };
  }
}
