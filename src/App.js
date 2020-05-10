import React from "react";
import "./styles.css";
import SimpleSlider from "./SimpleSlider";

const dataArray = [1, 2, 3];

export default function App() {
  return (
    <div className="App">
      <SimpleSlider>
        {dataArray.map(data => {
          return (
            <div key={data} className="user-class">
              {data}
            </div>
          );
        })}
      </SimpleSlider>
    </div>
  );
}
