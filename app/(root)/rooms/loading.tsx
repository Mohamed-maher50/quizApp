import Loader from "@/components/loader/Loader";
import React from "react";

const loading = () => {
  return (
    <div className="absolute inset-0  flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default loading;
