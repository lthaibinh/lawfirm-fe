import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    customInput: React.CSSProperties;
    mainContent: React.CSSProperties;
    menuCaption: React.CSSProperties;
    subMenuCaption: React.CSSProperties;
    commonAvatar: React.CSSProperties;
    smallAvatar: React.CSSProperties;
    mediumAvatar: React.CSSProperties;
    largeAvatar: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    customInput?: React.CSSProperties;
    mainContent?: React.CSSProperties;
    menuCaption?: React.CSSProperties;
    subMenuCaption?: React.CSSProperties;
    commonAvatar?: React.CSSProperties;
    smallAvatar?: React.CSSProperties;
    mediumAvatar?: React.CSSProperties;
    largeAvatar?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    customInput: true;
    mainContent: true;
    menuCaption: true;
    subMenuCaption: true;
    commonAvatar: true;
    smallAvatar: true;
    mediumAvatar: true;
    largeAvatar: true;
  }
}
