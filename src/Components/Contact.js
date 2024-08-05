import React from 'react'

const Contact = () => {
  return (
    <div className="m-4 ">
      <h1 className="text-2xl font-bold">Contact Us Page</h1>
      <input
        type="text"
        placeholder="name"
        className="p-2 rounded bg-pink-100 mt-4 "
      />
      <input
        type="text"
        placeholder="message"
        className="p-2 rounded bg-pink-100 mt-4 ml-2 "
      />
      <button className='ml-2 bg-slate-200 p-2 rounded'>Submit</button>
    </div>
  );
}

export default Contact