import React from "react";

function ModuleTwo() {
  return (
    <>
      <div className="flex items-center justify-around mt-5 bg-gray-50 text-gray-800 p-8 w-full rounded-lg font-[sans-serif] max-w-screen-2xl mx-auto">
        <div>
          <h1 className="text-xl font-extrabold">Unlock Tokens</h1>
          <p className="mt-1 text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur.
          </p>
        </div>

        <button
          type="button"
          className=" px-16 py-4 rounded-lg text-white text-lg tracking-wider border-none  outline-none bg-blue-600 hover:bg-blue-700"
        >
          Claim Tokens
        </button>
      </div>
    </>
  );
}

export default ModuleTwo;
