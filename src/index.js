import React, { useState } from 'react'; //libreria react
import { useEffect } from 'react';
import ReactDOM from 'react-dom/client'; //libreria react


function Hello(props) {

    const [count , setcount]=useState(0)
    const [pokemon, setpokemon]=useState(null)
    const [risposta, setrisposta]=useState('')
    const [punteggio, setpunteggio]=useState(0)
    const [vite,setvite]=useState(10)
    const [skip, setskip]=useState(3)
    const [serie, setserie]=useState(0)

    useEffect(() => {
      fetchData();
    }, []);

    const increment=()=>{
      setcount(count+1);
    }

    const punto=()=>{
      setpunteggio(punteggio+1)
    }
    
    const errore=()=>{
      setvite(vite-1)
    }

    const skipok=()=>{
      if(skip > 0){
      setskip(skip-1)
      fetchData()
      }
    }

    const Serie=(val)=>{
      if(val==1){
        setserie(serie+1)
      }else{
        setserie(0)
      }
    }

    const ricaricaPagina = () => {
      window.location.reload();
    }

    const fetchData = async () => {
      const numeroCasuale = Math.floor(Math.random() * 1008) + 1;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-form/${numeroCasuale}/`
      )
      const jsonData = await response.json();
      setpokemon(jsonData)
    }

    const controlla = () =>{
      if(risposta === pokemon.name){
        punto()
        fetchData()
        setrisposta('')
        Serie(1)
        if(serie >= 3){
          setskip(skip+1)
        }
        console.log('giusto')
      }else{
        errore()
        if(vite <= 1){
          increment()
        }
        Serie(0)
        console.log('riprova')
      }
    }

    switch(count){
      case 0:
        return(
          <>
          <p id= "titolo">who's that pokemon?</p>
          <button id="start_button" onClick={increment}>start</button>
          </>
        )

      case 1:
          return (
          <>
          <div class='exclude'>
          <p class='spazio'>serie : {serie} </p>
          <p class='spazio'>vite : {vite} </p>
          <p class='spazio'>skip : {skip} </p>
          <p class='spazio'>punteggio : {punteggio} </p>
          </div>
          <img id='img_pokemon' src={pokemon && pokemon.sprites.front_default}></img>
          <p>id pokemon : {pokemon && pokemon.id} </p>
          <p id='nome'>nome pokemon : {pokemon && pokemon.name}</p>
          <div class='exclude'>
          <input id='input-risposta' type='text'  value={risposta} onChange={(e) => setrisposta(e.target.value)}/>
          <button class='button' onClick={controlla}>invia</button>
          <button class='button' onClick={skipok}>skip</button>
          </div>
          </>
          )
      
        case 2:
          return(
          <>
          <p class='testo-end'>game over</p>
          <p class='testo-end'>hai totalizato : {punteggio} pt</p>
          <button id='start_button' onClick={ricaricaPagina}>rigioca</button>
          </>  
          )
    }

  }
  
  //stampare ris funzione
  const container = document.getElementById("root");
  const root = ReactDOM.createRoot(container);
  root.render(<Hello />);