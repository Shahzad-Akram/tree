import React from "react";
import { ReactComponent as PlusIcon } from "../assets/icon/plus.svg";

const TreeLabel = ({
  onClick,
  name,
  spouse,
  last,
  dob,
  dod,
  id,
  allSpouses,
}) => {
  return (
    <div className="flex items-center">
      <span className="mr-1 capitalize">
        {name} {last} <br /> {dob} <br /> {dod}
      </span>

      {/* <br />
      <p>
        <small>{name}</small>
      </p>
      <br />
      <p>
        <small>{name}</small>
      </p>
      <br />
      <p>
        <small>{name}</small>
      </p>
      <br />
      <p>
        <small>{name}</small>
      </p> */}
      <button
        onClick={onClick}
        type="button"
        className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusIcon />
      </button>

      <span className="ml-2 capitalize">
        {allSpouses.find((v) => v.id === id)?.firstName}
      </span>
    </div>
  );
};

export default TreeLabel;
