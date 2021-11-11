type ButtonProps = {
  onClick?: () => void;
  className?: string;
  text: string;
};

export function Button(props: ButtonProps): JSX.Element {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.text}
    </button>
  );
}
