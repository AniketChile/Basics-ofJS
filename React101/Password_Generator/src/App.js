import './App.css'
import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  

  const copypasstoKeyboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101)
      window.navigator.clipboard.writeText(password)
  },[password])

  const passWordGenerator =  useCallback(() => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if (numberAllowed) str += "0123456789";
      if (characterAllowed) str += "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
      }
      setPassword(pass)
    },
    [length, numberAllowed, characterAllowed, setPassword]
  );
    
  useEffect(()=>{
    passWordGenerator()
  },[length,numberAllowed,characterAllowed,passWordGenerator])
  

  return (
    <>
      <h1 style={{ textAlign: "center", color: "white" }}>
        Password Generator
      </h1>
      <div style={{textAlign:'center',color:'white'}}>
        <div>
          <input type="text" value={password}  readOnly ref={passwordRef}/>
          <button onClick={copypasstoKeyboard}>Copy</button>
        </div>
        <div>
          <div>
            <input
              type="range"
              min={1}
              max={100}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
              {/* <div>
                <input type='text' value={length}/>
              </div> */}
          <div>

            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              onChange={() => {
                setCharactersAllowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
