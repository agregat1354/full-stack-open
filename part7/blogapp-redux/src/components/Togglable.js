import { useState, useImperativeHandle, forwardRef } from "react";
import Button from "@mui/material/Button";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <Button
        variant="contained"
        onClick={toggleVisibility}
        style={hideWhenVisible}
      >
        {props.buttonLabel}
      </Button>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          style={{ marginTop: 5 }}
          variant="outlined"
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
