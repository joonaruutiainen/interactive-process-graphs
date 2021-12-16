interface IPalette {
  /**
   * Palette's main color.
   */
  main: string;

  /**
   * Color for the text rendered over main color.
   */
  text: string;
}

interface DefaultTheme {
  /**
   * Border radius in CSS pixels.
   */
  borderRadius: number;

  /**
   * Default font family for the texts.
   */
  fontFamily: string;

  /**
   * Palettes for the theme.
   */
  palette: {

    /**
     * Common colors used throughout the process graph.
     */
    common: {
      
      /**
       * Black color.
       */
      black: string;

      /**
       * White color.
       */
      white: string;
    };

    /**
     * Primary color for the process graph.
     */
    primary: IPalette;

    /**
     * Secondary color for the process graph.
     */
    secondary: IPalette;

    /**
     * Main background color for the process graph.
     */
    background: IPalette;
  };
}

export default DefaultTheme;
