/*
name: Luccas Amorim
id: 24104214
file name:
IDEA: add an admin login that can view submitted messages from contact.html



if user is logged in use cookies to try to fill the information
if user isn't logged in don't pull the cookies


*/


const firstNameInput = document.querySelector('#contactFirstName') ;
const lastNameInput = document.querySelector('#contactLastName') ;
const emailInput = document.querySelector('#contactEmail') ;
const messageInput = document.querySelector('#contactMessage') ;
const submitButton = document.querySelector('#submitContact') ;
const textBoxClear = document.querySelector('#clearMessage') ;


textBoxClear.addEventListener('click', (e) => {
  messageInput.value = '' ;
}) ;

submitButton.addEventListener('click', (e) => {
  localStorage.setItem('firstName', firstNameInput.value) ;
  localStorage.setItem('lastName', lastNameInput.value) ;
  localStorage.setItem('email', emailInput.value) ;
  localStorage.setItem('emailMessage', messageInput.value) ;


}) ;






