/*
name: Luccas Amorim
id: 24104214
file name:

TODO: add a deleteCookie Function
 */

class Cookies {
  constructor() {
    this.id = '' ;
    this.value = '' ;
  }
  createCookieWithDate = (id, value, year, month, date) => {
    document.cookie = `${id}=${value}; expires=` + new Date(year, month, date).toUTCString() ;
  } ;
  createTemporaryCookie = (id, value) => {
    document.cookie = `${id}=${value};`;
  }
  createEncryptedCookieWithDate = (id, value, shift, year, month, date) =>{
    this.createCookieWithDate(id,this.encrypt(value, shift),year,month,date) ;
}

  getCookie = (id) => {
    const cookies = document.cookie.split('; ') ;
    for (let i = 0; i < cookies.length; i++) {
      const [cookieIds, cookieValue] = cookies[i].split('=') ;
      if (cookieIds === id) {
        return cookieValue ;
      }
    }
    return null
  }
  getCookieDecrypted = (id, shift) => {
    return this.decrypt(this.getCookie(id),shift) ;
  }
  encrypt(plaintext, shift) {
    let ciphertext = "";
    for (let i = 0; i < plaintext.length; i++) {
      let charCode = plaintext.charCodeAt(i) ;
      if (charCode >= 65 && charCode <= 90) { // uppercase letters
        charCode = ((charCode - 65 + shift) % 26) + 65 ;
      } else if (charCode >= 97 && charCode <= 122) { // lowercase letters
        charCode = ((charCode - 97 + shift) % 26) + 97 ;
      }
      ciphertext += String.fromCharCode(charCode) ;
    }
    return ciphertext ;
  }
  decrypt(ciphertext, shift) {
    let plaintext = "";
    for (let i = 0; i < ciphertext.length; i++) {
      let charCode = ciphertext.charCodeAt(i)  ;
      if (charCode >= 65 && charCode <= 90) { // uppercase letters
        charCode = ((charCode - 65 - shift + 26) % 26) + 65 ;
      } else if (charCode >= 97 && charCode <= 122) { // lowercase letters
        charCode = ((charCode - 97 - shift + 26) % 26) + 97 ;
      }
      plaintext += String.fromCharCode(charCode);
    }
    return plaintext;
  }
}



const cookies = new Cookies();

