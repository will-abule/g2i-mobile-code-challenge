export interface ButtonInterface {
  textColor: string;
  backgroundColor?: string;
  borderColor: string;
  width?: string;
}

export interface ButtonPropsInterface {
  text: string;
  width?: string;
  default?: ButtonInterface;
  active?: ButtonInterface;
  onPress: Function;
}
