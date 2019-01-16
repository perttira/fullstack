import React from 'react'
import Otsikko from './Otsikko';

class Kurssi extends React.Component {


  render() {

    return (
      
      <div>
        <Kurssit kurssinNimi = {this.props.kurssinNimi} nimi={this.props.nimi} tehtavia = {this.props.tehtavia} tehtavatYhteensa = {this.props.tehtavatYhteensa} />
      </div>

    )
  }
}

const Kurssit = ({ kurssinNimi, nimi, tehtavia, tehtavatYhteensa }) => (
  
  <div>
    <span>{nimi}</span>
    <span class="tehtavat">{tehtavia}</span>
  </div>
)

export default Kurssi

