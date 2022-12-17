import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function SnackBar({ status, description, title, open }) {
  return (
    <div
      className={`${
        open ? "flex" : "hidden"
      } fixed top-1 right-1 flex-col justify-start
     items-start w-56 p-2 rounded-md shadow-lg ${
       status == "error" ? "bg-red-100" : "bg-green-100"
     } delay-200`}
    >
      <div
        className={`font-semibold text-md ${
          status == "error" ? "text-red-600" : "text-green-600"
        }`}
      >
        {title}
      </div>
      <div
        className={` text-sm ${
          status == "error" ? "text-red-500" : "text-green-500"
        }`}
      >
        {description}
      </div>
    </div>
  );
}

export default SnackBar;
