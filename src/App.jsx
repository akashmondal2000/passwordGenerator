import { useState, useCallback, useEffect,useRef} from "react";
import "./App.css";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+{}.,";

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass =pass + str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed,setPassword]);

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select() // for highlight the copyed text
    window.navigator.clipboard.writeText(password) // copy pext from pasword input
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <div className="mainContainer">
      <h1 className="text-center mb-8">Password Generator</h1>
      <div className="passwordGeneratorContainer">
        <div className="containerBox">
          <input
            type="text"
            className="inputFild"
            value={password}
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button className="copyBtn"
          onClick={copyPasswordToClipBoard}
          >copy</button>
        </div>
        <div className="actionBtnWrapper">
          <div className="actinBtnDiv">
            <input
              className="lengthInput"
              type="range"
              min={6}
              max={20}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length {length}</label>
          </div>
          <div className="CheckBoxWrapper">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() =>
                setNumberAllowed((previousValue) => !previousValue)
              }
            />
            <label> Numbers</label>
          </div>
          <div className="CheckBoxWrapper">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed((previousValue) => !previousValue)}
            />
            <label> Charecter</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
