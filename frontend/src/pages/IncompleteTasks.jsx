import React from "react";
import Cards from "../components/Home/Cards";

const IncompleteTasks = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Incomplete Tasks</h2>
      <Cards home="incomplete" />
    </div>
  );
};

export default IncompleteTasks;
