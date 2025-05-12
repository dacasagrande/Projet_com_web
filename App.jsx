import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function AffichageNote({notes,mode}){

  let listNotes=[];

  if (mode=="élève") {
    for (let i=0; i<notes.length; i++){
      console.log(notes[i]["valeur"])
      listNotes.push(`Matière : ${notes[i]["matiere"]} | Enseignée par ${notes[i]["nomProf"]} | Note :${notes[i]["valeur"]}`)
    }
  }
  else {
    for (let i=0; i<notes.length; i++){
      console.log(notes[i]["valeur"])
      listNotes.push(`Note : ${notes[i]["valeur"]} | Classe : ${notes[i]["nom"]} | Elève :${notes[i]["nomEleve"]} |  Groupe :${notes[i]["numGroupe"]}`)
    }
  }
  
  
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      {listNotes.map((element)=>{return <p>{element}</p>})}
    </div>
  )
}


function RechercheNom({setNotes,mode}){
  const [id, setId] = useState("Entrez identifiant")
  const [mdp, setMdp] = useState("Mot de passe")

  async function click(){
    let reponse = await fetch(`http://localhost/pronote/index.php?url=${id}&mode=${mode}&mdp=${mdp}`)
    let donnees = await reponse.json(); 

    setNotes(donnees)
  }

  return (
    <div>
      <input type="text" value={id} onChange={e=>setId(e.target.value)}></input>
      <input type="text" value={mdp} onChange={e=>setMdp(e.target.value)}></input>
      <button onClick={click}> Voir les notes </button>
    </div>
  )
}



function Mode({setMode,mode}){


  function changerMode(){

    if (mode=="élève") {
      setMode("prof")
    }
    else {
      setMode("élève")
    }
  }

  return (
    <div>
      <button onClick={changerMode}> {mode} </button>
    </div>
  )
}

function AjouterNote()
{
  const [noteAjoute, setNoteAjoute] = useState("0")
  const [eleve, setEleve] = useState("X")
  async function ajouterNote(){
  {
      const data = {'note': noteAjoute, 'eleve':eleve};
      console.log(data);
      try {
        const reponse = await fetch('http://localhost/pronote/ajoutNote.php', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });
        const result = await reponse.text();
        console.log(result);
        } catch (erreur) {
        console.error('Erreur lors de l\'envoi des données :', erreur);
        }
        };
    }

  return (
    <div>
      <input type="number" value={noteAjoute} onChange={e=>setNoteAjoute(e.target.value)}></input>
      <input type="text" value={eleve} onChange={e=>setEleve(e.target.value)}></input>
      <button onClick={ajouterNote}> Ajouter</button>
    </div>
  )
}



function App() {

  const [notes, setNotes] = useState([{valeur:null, nomProf:null,matiere:null}])
  const [mode,setMode] = useState("élève")

  return (
    <>
      <Mode setMode={setMode} mode={mode} />
      <RechercheNom setNotes={setNotes} mode={mode}/>
      <AffichageNote notes={notes} mode={mode}/>
      <AjouterNote/>
    </>
  )
}

export default App
