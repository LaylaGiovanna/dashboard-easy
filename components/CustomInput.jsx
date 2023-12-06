import React, { useState } from "react";
import Link from 'next/link';


export default function Input(props) {
  const [inputValue, setInputValue] = useState(props.data);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (props.onChange) {
      props.onChange(newValue);
    }

  };


  return (
    <>
      <div className="flex flex-col">
        <div className="w-72"
        >
          {props.forgotPassoword && (
            <Link href="/reset-password">
              <p className="text-warmGray-400 text-xs flex items-end justify-end cursor-pointer">
                Esqueceu senha?
              </p>
            </Link>
          )}

          <div className="relative h-10 w-full min-w-[200px]">
            <input
              className="peer h-full w-full border-b border-blue-gray-200 text-black bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              value={inputValue}
              onChange={handleInputChange}
              onFocus={props.onFocus}
              required
              type={props.type}
            />
            <label className="after:content[' '] text-black pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              {props.text}
            </label>
          </div>
        </div>
      </div>
    </>
  );
}