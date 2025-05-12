import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Header() {
  return <header className='header'><h1>PlacinNote</h1></header>
}
function AffichageNote({ notes, mode }) {

  let listNotes = [];

  if (mode == "élève") {
    for (let i = 0; i < notes.length; i++) {
      console.log(notes[i]["valeur"])
      listNotes.push(`Matière : ${(notes[i]["matiere"] != undefined ? notes[i]["matiere"] : "")} | Enseignée par ${(notes[i]["nomProf"] != undefined ? notes[i]["nomProf"] : "")} | Note :${(notes[i]["valeur"] != undefined ? notes[i]["valeur"] : "")}`)
    }
  }
  else {
    for (let i = 0; i < notes.length; i++) {
      console.log(notes[i]["valeur"])
      listNotes.push(`Note : ${(notes[i]["valeur"] != undefined ? notes[i]["valeur"] : "")} | Classe : ${(notes[i]["nom"] != undefined ? notes[i]["nom"] : "")} | Elève :${(notes[i]["nomEleve"] != undefined ? notes[i]["nomEleve"] : "")} |  Groupe :${(notes[i]["numGroupe"] != undefined ? notes[i]["numGroupe"] : "")}`)
    }
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {listNotes.map((element) => { return <p>{element}</p> })}
    </div>
  )
}


function RechercheNom({ setNotes, mode }) {
  const [id, setId] = useState("Entrez identifiant")
  const [mdp, setMdp] = useState("Mot de passe")

  async function click() {
    let reponse = await fetch(`http://localhost/pronote/index.php?url=${id}&mode=${mode}&mdp=${mdp}`)
    let donnees = await reponse.json();
    if (donnees[0] == undefined) {
      alert("Identifiant incorrect !");
    }

    setNotes(donnees)
  }

  return (
    <div className='rechercherNom'>
      <input type="text" value={id} onChange={e => setId(e.target.value)}></input>
      <input type="text" value={mdp} onChange={e => setMdp(e.target.value)}></input>
      <button className={mode} onClick={click}> Voir les notes </button>
    </div>
  )
}



function Mode({ setMode, mode, setNotes }) {


  function changerMode() {
    setNotes([{}]);
    if (mode == "élève") {
      setMode("prof")
    }
    else {
      setMode("élève")
    }
  }

  return (
    <div>
      <button className={mode} onClick={changerMode}> {mode} </button>
    </div>
  )
}

function AjouterNote({ mode }) {
  const [noteAjoute, setNoteAjoute] = useState("0")
  const [eleve, setEleve] = useState("X")
  async function ajouterNote() {
    {
      const data = { 'note': noteAjoute, 'eleve': eleve };
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
    <div className='formulaire'>
      <label>Valeur Note :</label>
      <label>ID Eleve</label>
      <label> Envoi :</label>
      <input type="number" value={noteAjoute} onChange={e => setNoteAjoute(e.target.value)}></input>
      <input type="text" value={eleve} onChange={e => setEleve(e.target.value)}></input>
      <button className={mode} onClick={ajouterNote}> Ajouter</button>
    </div>
  )
}



function App() {

  const [notes, setNotes] = useState([{}])
  const [mode, setMode] = useState("élève")
  console.log(notes[0]);
  return (
    <>
      <Header></Header>
      <div className='content'>
        <Mode setMode={setMode} mode={mode} setNotes={setNotes} />
        <RechercheNom setNotes={setNotes} mode={mode} />
        <AffichageNote notes={notes} mode={mode} />
        {(mode == "prof") ? <AjouterNote mode={mode} /> : <></>}
      </div>
    </>
  )
}

export default App