import React from 'react'

const Henkilot = ({ name, id, number, onClick }) => {
  console.log("Henkilot id", id)

  return (
    <div>
      <li>{name} {number} <button onClick={onClick}>Poista henkilö</button></li> 
    </div>
  )
}

export default Henkilot