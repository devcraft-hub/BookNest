import React from "react";

function Loader() {

  return (

    <div className="w-full h-[60vh] flex items-center justify-center bg-zinc-950">

      <div className="flex gap-3">

        <span className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"></span>

        <span className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></span>

        <span className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></span>

      </div>

    </div>
  );
}

export default Loader;