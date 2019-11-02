/*  react-testing-library:n manuaali kehoittaa kutsumaan jokaisen testin jälkeen metodia cleanup.
    Hoidimme asian lisäämällä testitiedostoon afterEach-määreen, joka kutsuu metodia:
    import '@testing-library/jest-dom/extend-expect'
    afterEach(cleanup)
    Parempi vaihtoehto on kuitenkin konfiguroida cleanup tapahtumaan automaattisesti.
    Tehdään konfiguraatiota varten tiedosto src/setupTests.js sekä alla olevat importit.
    HUOM mikäli testejä suoritettaessa ei löydetä tiedostossa src/setupTests.js tehtyjä konfiguraatioita,
    auttaa seuraavan asetuksen lisääminen tiedostoon package.json:

    "jest": {
      ...
      "setupFiles": [
        "<rootDir>/src/setupTests.js"
      ],
      ...
    }

*/

import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}



Object.defineProperty(window, 'localStorage', { value: localStorageMock })