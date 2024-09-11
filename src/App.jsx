import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllow , setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password , setPassword] = useState("")

  const passwordGenerator = useCallback(()=> {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    

    if(numberAllow) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*?><+=-_"

    for (let index = 1; index <= length; index++) {
      const random = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(random)
    }
    setPassword(pass)


  } , [length, numberAllow, charAllowed, setPassword])

  //useRef 
  const passwordInput = useRef(null)

  useEffect(() => {passwordGenerator()},[length,charAllowed,numberAllow,passwordGenerator])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordInput.current?.select()
    passwordInput.current?.setSelectionRange(0,9); 
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <>
    <div className='fixed w-full h-screen bg-black'>
      <div className='w-full  max-w-md max-auto shadow-md rounded-lg px-4 py-3 my-20 mx-auto text-orange-500 bg-gray-600'>
        <h1 className='text-3xl text-center p-2 my-3 text-white' >Password Generator</h1>  
        <div className='flex shadow rounded-lg overflow-hidden mb-3'>
          <input 
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordInput}
          />
          <button
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPasswordToClipboard}
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2 mb-1'>
          <div className='flex items-centergap-x-1'>
            <input
            type='range'
            min='8'
            max='50'
            value={length} 
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)} 
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultValue={numberAllow}
            id = "numberInput"
            onChange={()=>{
              setNumberAllowed((prev) => (!prev));
            }}
            />
            <label htmlFor='numberInput'>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultValue={charAllowed}
            id = "charInput"
            onChange={()=>{
              setCharAllowed((prev) => !prev);
            }}
            />
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
    </div> 
    </div>    
    </>
  )
}

export default App
