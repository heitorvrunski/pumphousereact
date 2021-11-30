import React from "react";
import './Button.scss'

export default function Button(props) {
  
  const   handleClick = (event) =>{
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.nativeEvent.offsetX   - radius}px`;
    circle.style.top = `${event.nativeEvent.offsetY    - radius}px`;
    circle.classList.add("ripple");
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);
    if(props.onClick){
      props.onClick();
    }
  }

  return (
    <button
        onClick={handleClick}
        className={props.className + " buttonNice"}
        style={props.style??{}}
        disabled={props.disable??""}
        type={props.type??'button'}
        >
          {props.children}
      </button>
  );
}
