export function Square(props) {
    if (props.highlight) {
      return (
        <button
            className="square highlight"
            onClick={() => props.onClick()}
        >
          <strong>{props.value}</strong>
        </button>
      );
    } else {
      return (
        <button
            className="square"
            onClick={() => props.onClick()}
        >
          {props.value}
        </button>
      );
    }
  }