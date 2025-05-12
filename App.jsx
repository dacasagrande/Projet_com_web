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
      console.log(notes)
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
  const [nom, setNom] = useState("Entrez nom")

  async function click() {
    let reponse = await fetch(`http://localhost/pronote/index.php?url=${nom}&mode=${mode}`)
    let donnees = await reponse.json();

    setNotes(donnees)
  }

  return (
    <div>
      <input type="text" value={nom} onChange={e => setNom(e.target.value)}></input>
      <button onClick={click}> Voir les notes </button>
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
      <button onClick={changerMode}> {mode} </button>
    </div>
  )
}

function AjouterNote() {
  const [noteAjoute, setNoteAjoute] = useState("X")
  const [eleve, setEleve] = useState("X")
  async function ajouterNote() {
    {
      const soumission = async (e) => {
        e.preventDefault();
      };
      try {
        const data = { 'note': noteAjoute, 'eleve': eleve }
        const reponse = await fetch('http://localhost/pronote/index.php', {
          mode: 'no-cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        result = await reponse.text()
        console.log('Réponse du serveur :', result);
      } catch (erreur) {
        console.error('Erreur lors de l\'envoi des données :', erreur);
      }
    }
  }
  return (
    <div>
      <input type="number" value={noteAjoute} onChange={e => setNoteAjoute(e.target.value)}></input>
      <input type="text" value={eleve} onChange={e => setEleve(e.target.value)}></input>
      <button onClick={ajouterNote}> Ajouter</button>
    </div>
  )
}



function App() {

  const [notes, setNotes] = useState([{}])
  const [mode, setMode] = useState("élève")

  return (
    <>
      <Header></Header>
      <div className='content'>
        <Mode setMode={setMode} mode={mode} setNotes={setNotes} />
        <RechercheNom setNotes={setNotes} mode={mode} />
        <AffichageNote notes={notes} mode={mode} />
        {(mode == "prof") && (notes[0]["valeur"] != undefined) ? <AjouterNote /> : <></>}
      </div>
    </>
  )
}

export default App
