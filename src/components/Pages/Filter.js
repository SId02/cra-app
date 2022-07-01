import React, { useState } from "react";
import Data from "../Data/Data"
import Card from "../Layout/Filter-box/Card"
import Buttons from "../Layout/Filter-box/Buttons"
const Filter = () => {
  const [item, setItem] = useState(Data);

  const menuItems = [...new Set(Data.map((Val) => Val.category))];

  const filterItem = (curcat) => {
    const newItem = Data.filter((newVal) => {
      return newVal.category === curcat;
    });
    setItem(newItem);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <h1 className="col-12 text-center my-3 fw-bold"> Filter</h1>
          <Buttons
            filterItem={filterItem}
            setItem={setItem}
            menuItems={menuItems}
          />
          <div className="container">
           <Card item={item} />
          </div>
         
        </div>
      </div>
    </>
  );
};

export default Filter;