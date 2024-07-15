"use client";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import clsx from "clsx";
import { useState } from "react";

function ChatBox() {
  return (
    <div className="fixed rounded-md top-[10px] right-[10px] h-3/5 w-2/12 p-4 bg-gradient-to-r from-blue-600 to-blue-700 z-10 text-white">
      <h2 className="py-2 text-3xl font-bold text-center">Let&apos;s chat!</h2>
      <form>
        <div className="my-2 grid grid-cols-1 lg:grid-cols-4"><label htmlFor="name" className="col-span-1">Name:</label>
        <input type="text" id="name" name="name" className="col-span-3 rounded-md px-2 py-1" /></div>
        <div className="my-2 grid grid-cols-1 lg:grid-cols-4"> <label htmlFor="email" className="col-span-1">Email:</label>
        <input type="email" id="email" name="email" className="col-span-3 rounded-md px-2 py-1" /></div>
        <div className="my-2 grid grid-cols-1 lg:grid-cols-4"><label htmlFor="message" className="col-span-1">Message:</label>
        <textarea id="message" name="message" className="col-span-3 rounded-md px-2 py-1"></textarea></div>
        
       
        
        <button type="submit" className="mt-4 bg-indigo-700 text-indigo-200 w-full hover:bg-indigo-700 hover:text-white ">
          Start Chat
        </button>
      </form>
    </div>
  );
}
const AskHelpButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <>
      {isChatOpen && <ChatBox />}
      <button
        className="fixed bottom-[10px] right-[10px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setIsChatOpen(!isChatOpen);
        }}
      >
        <IoChatboxEllipsesOutline />
      </button>
    </>
  );
};
export default AskHelpButton;
