import * as React from "react";
import "./ButtonGroup.css";

type ObjectOrString = {} | string;

interface Props {
  items?: Array<ObjectOrString>;
  active?: ObjectOrString;
  className?: string;
  onClick?(item: ObjectOrString): void;
}

interface ButtonProps {
  item: ObjectOrString;
  active?: ObjectOrString;
  onClick?(item: ObjectOrString): void;
}
export const Button = (props: ButtonProps) => {
  const active = props.active ? props.active : false;
  const className = `Button ${active ? "Button-active" : ""}`;
  const onClick = () => props.onClick ? props.onClick(props.item) : {};
  return (
    // <button className={className} onClick={onClick}>
    <div className={"Button-root"} onClick={onClick}>
      <h5 className={className}>{props.item}</h5>
    </div>
    // </button>
  );
};
class ButtonGroup extends React.Component<Props> {
  static defaultProps = {
    items: [],
    className: "",
    onClick: (item: ObjectOrString) => {}
  };

  render() {
    return (
      <div className={`ButtonGroup ${this.props.className}`}>
        {(this.props.items as string[]).map(item => (
          <Button
            key={item}
            onClick={this.props.onClick as (item: ObjectOrString) => void}
            item={item}
            active={item === this.props.active}
          />
        ))}
      </div>
    );
  }
}

export default ButtonGroup;
