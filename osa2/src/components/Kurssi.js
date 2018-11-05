import React from 'react'

class Kurssi extends React.Component {


  render() {
    var arr3 = Object.values(this.props)


          //console.log({kurssi.osat})
          console.log("this.props :",  this.props)

          console.log("this.props :")
          console.log("arr3 :", arr3[0].nimi)

        /*
          arr3.forEach((luku) => {
            console.log(luku)    // tulostuu 1, -1, 3 ja 5 omille riveilleen
          })
        */



    return (
      <div>
        {this.props.nimi} {this.props.tehtavia}
      </div>

    )
  }
}

export default Kurssi

