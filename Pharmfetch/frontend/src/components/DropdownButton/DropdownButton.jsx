import React from 'react'
import { SlArrowDown, SlArrowUp } from "react-icons/sl"
import "./DropdownButton.css"

const DropdownButton = ({children, open, toggle}) => {
  return (
    <div 
        onClick={toggle} // toggle when dropdown clicked
        className={`dropdown-btn ${open ?
            "button-open" : null }`}
    >
        {children}
        <span className="toggle-icon">
            {open ? <SlArrowUp /> :
            <SlArrowDown />}
        </span>
    </div>
  );
}

export default DropdownButton