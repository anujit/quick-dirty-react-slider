import React from "react";
import "./slide-wrapper.css";

const Slide = React.forwardRef((props, ref) =>
  React.Children.map(props.children, child => (
    <div className="simple-slide" ref={ref}>
      {child}
    </div>
  ))
);

export default function SimpleSlider(props) {
  const [width, setWidth] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [slideCount, setSlideCount] = React.useState(0);

  const slideRef = React.createRef();
  const wrapperRef = React.createRef();
  const slideWindowRef = React.createRef();

  React.useLayoutEffect(() => {
    const rect = slideRef.current.getBoundingClientRect();
    setWidth(rect.width);
    setSlideCount(props.children.length);
    slideWindowRef.current.style.width = rect.width + "px";
  }, [slideRef, offset, slideWindowRef, props]);
  const { leftCallback = () => {}, rightCallback = () => {} } = props;

  const leftClick = e => {
    e.preventDefault();
    let currentRight = wrapperRef.current.style.right || 0;
    currentRight = parseInt(currentRight, 10);
    if (currentRight === 0) return false;
    const newOffset = currentRight - width;
    wrapperRef.current.style.right = newOffset + "px";
    setOffset(newOffset);
    leftCallback();
  };

  const rightClick = e => {
    e.preventDefault();
    let currentRight = wrapperRef.current.style.right || 0;
    currentRight = parseInt(currentRight, 10);

    if (currentRight === (slideCount - 1) * width) return false;

    const newOffset = offset + width;
    wrapperRef.current.style.right = newOffset + "px";
    setOffset(newOffset);
    rightCallback();
  };

  return (
    <div className="main-slider">
      <button onClick={leftClick}>Left</button>
      <div className="slide-window" ref={slideWindowRef}>
        <div className="slide-wrapper" ref={wrapperRef}>
          <Slide ref={slideRef}>{props.children}</Slide>
        </div>
      </div>
      <button onClick={rightClick}>Right</button>
    </div>
  );
}
