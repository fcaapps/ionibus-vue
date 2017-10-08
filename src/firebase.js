import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: "AIzaSyCNAHsRp8yS2FDUWlkZIAWmyRt3WHzGy88",
  authDomain: "ionibus-ac0ed.firebaseapp.com",
  databaseURL: "https://ionibus-ac0ed.firebaseio.com",
  projectId: "ionibus-ac0ed",
  storageBucket: "ionibus-ac0ed.appspot.com",
  messagingSenderId: "579691884183"
})

export const db = app.database();
export const Eventos = db.ref('Eventos');
export const Congregacao = db.ref('Congregacao');
export const Responsaveis = db.ref('Responsaveis');
export const Capitaes = db.ref('Capitaes');
