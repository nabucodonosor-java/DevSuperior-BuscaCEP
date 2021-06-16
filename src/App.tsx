import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

const BASE_URL = 'https://viacep.com.br/ws';

type Address = {
  logradouro: string;
  localidade: string;
}


const App = () => {

  const [searchValue, setSearchValue] = useState('');
  const [addressData, setAddressData] = useState<Address>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAddressData(undefined);

    axios(`${BASE_URL}/${searchValue}/json`)
    .then(response => setAddressData(response.data))
    .catch(() => console.error('ERRO!'))
  }

  return (
    <div className="container-wrapper">
     <div className="container">
       <h1 className="title">Busca CEP</h1>
       <form className="search-form" onSubmit={handleSubmit}>
         <input
          type="text" 
          className="search-input"
          placeholder="CEP somente números"
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
          />
          <label>Cidade: {addressData?.localidade}</label>
         <button className="search-btn">Buscar</button>
         {addressData && (
           <>
           <div className="search-result-item">
             <strong className="search-result-title">Logradouro</strong> <br/>
             <span className="search-result-subtitle">{addressData?.logradouro}</span>
           </div>
           <div className="search-result-item">
           <strong className="search-result-title">Localidade</strong> <br/>
           <span className="search-result-subtitle">{addressData?.localidade}</span>
           </div> 
          </>
         )}
       </form>
     </div>
    </div>
  );
}

export default App;
