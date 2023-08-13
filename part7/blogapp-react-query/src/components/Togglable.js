import { useState, useImperativeHandle, forwardRef } from "react";
import Button from "react-bootstrap/Button";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "", margin: 5 };
  const showWhenVisible = { display: visible ? "" : "none", margin: 5 };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <Button
        variant="primary"
        onClick={toggleVisibility}
        style={hideWhenVisible}
      >
        {props.buttonLabel}
      </Button>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          style={{ marginTop: 5 }}
          variant="secondary"
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = "togglable";

export default Togglable;
