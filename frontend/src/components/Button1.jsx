import { useEffect } from 'react';
import Footer from './Footer/Footer';
function Button1({emoji, text, textSize, textColor, handle}) {

  return (
    <>
      <div onClick={handle} className={`w-50 flex flex-row text-black mb-1 cursor-pointer`}>
        <span className={`w-9 self-center`}>{emoji}</span>
        <span className={`self-center p-1 pr-3  ${textColor}`}>{text}</span>
      </div>
    </>
  )
}

export default Button1;