import React from "react";
import Cards from "../components/Home/Cards";

const CompletedTasks = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Completed Tasks</h2>
      <Cards home="completed" />
    </div>
  );
};

export default CompletedTasks;
