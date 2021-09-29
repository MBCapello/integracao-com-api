import { useState, useRef } from "react";

function Card({ pais }) {
  if (!pais) {
    return (
      <div className="Container__text">
        <span> Country not found!</span>
      </div>
    )
  };
  
  return (
    <>
      <div className="Container__text">
        <span>Name: {pais.name.common}</span>
        <span>Capital: {pais.capital[0]}</span>
        <span>Region: {pais.region}</span>
        <span>Continent: {pais.subregion}</span>
      </div>
      <div className="Flag">
        <img src={pais.flags[0]} alt="flag" width='500' />
      </div>
    </>
  )
}

function App() {

  const [input, setInput] = useState('');
  const [paises, setPaises] = useState('');
  const [carrengando, setCarregando] = useState(false);
  const inputRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    if (!input) {
      setPaises('')
      return
    }

    setCarregando(true);

    fetch(`https://restcountries.com/v3/name/${input}`)
      .then(resposta => resposta.json())
      .then(data => {
        setPaises(data)
        setCarregando(false)
      })

    inputRef.current.value = "";
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="Container">
          <label htmlFor="Input" >Choose a country:</label>
          <input ref={inputRef}
            className='Input'
            id="Input"
            type="text"
            onChange={e => setInput(e.target.value)}
            placeholder="Ex: Italy"
          />
          {carrengando &&
            <>
              <div className="Container__text">
                <span>Carregando...</span>
              </div>
              <div className="Flag_load">
                <img src="https://media.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif?cid=ecf05e4745wdhkxyw6crhrgbdi7odspohp2k72r6dxkcarig&rid=giphy.gif&ct=g" alt="" />
              </div>
            </>
          }
          {paises &&
            <Card pais={paises[0]} />
          }
        </div>
      </form>
    </div >
  );
}
export default App;
