import React from "react";
import Select, { components } from "react-select" ;


const colourStyles = {
  option: (styles : any, { isFocused } : any) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#00A3BE" : "",
      color: isFocused ? "#F9FAFC" : "#191D2F",
      display: "flex",
      paddingLeft: 0,

      "& .left": {
        display: "flex",
        justifyContent: "center",
        width: 60,
        marginTop: 3
      },
      "& .right": {
        width: "100%"
      },

      "& .right > .title": {
        display: "block",
        margin: "5px 0"
      }
    };
  }
};

const Option = (props: any) => {
  return (
    <components.Option {...props}>
      <div className="left">{props.isSelected ? "✔" : ""}</div>
      <div className="right">
        <strong className="title">{props.data.label}</strong>
        <div>{props.data.description}</div>
      </div>
    </components.Option>
  );
};

export default (props : any) => (
  <div style={{
    backgroundColor:"#191D2F",
    margin:"10px",
    borderRadius:"50%",
    width: "30%"
    }}>
    <Select
      defaultValue={props.options[0]}
      label="Single select"
      options={props.options}
      styles={colourStyles}
      components={{
        Option
      }}
      onChange={props.handleChange}
    />
  </div>
);
