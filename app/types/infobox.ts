export type InfoBoxType = {
  heading: string;
  backgroundColor: string;
  textColor: string;
  children: React.ReactNode;
  buttonInfo: {
    link: string;
    text: string;
    backgroundColor: string;
  };
};
