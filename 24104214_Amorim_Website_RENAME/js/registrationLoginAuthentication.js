/*
name: Luccas Amorim
id: 24104214
file name:






TODO: add the differences when user is signed in vs. when user isn't signed in

TODO: fix css for the login and registration page

TODO: add input validation and  add a "keep me logged in" checkbox for logging in

TODO: Add input validation for firstName, LastName, Email, and Both password
      fields(compare password 1 to password 2 to make sure they are the same) for the registration

 */
const loginPopup = document.querySelector("#loginPopup");
const signUpPopup = document.querySelector('#signUpPopup') ;
const profileLoginSection = document.querySelector('#loginButtonArea') ;


if(sessionStorage.getItem('authentication') !== 'verified') {
  profileLoginSection.innerHTML = `
        <a role='button' class='btn btn-outline-primary mx-1'  href="#"  id="loginBtn">Log in</a>
        <a role='button' class='btn btn-outline-primary mx-1'   href="#" id="signUpBtn">Sign Up</a>
  `
  loginPopup.innerHTML = `

   <div class="container" id="loginContent">
      <span class="loginClose" style="color:lightslategrey">&times;</span>
      <h3 class="text-center" id="loginTitle">Log in</h3> <br>
      <form id="loginForm">
        <label for="loginEmail">Email:</label>
        <input class="form-control" type="text" id="loginEmail" name="username" required> <br>
        <label for="loginPassword">Password:</label>
        <input class="form-control" type="password" id="loginPassword" name="password" required> <br>
        <input class="text-center" type="submit" id='submitLoginBtn' value='Log In' >
      </form>
   </div>
`
  signUpPopup.innerHTML = `
    <div id="signUpContent">
      <span class="signUpClose">&times;</span>
      <h2 id="loginTitle">Sign Up</h2>
      <form id="SignUpForm">
        <label for="firstName">First Name:</label>
        <input type="text" id="userFirstNameSignUp" name="firstName" required> <br>
        
        <label for='lastName'>Last Name:</label>
        <input type="text" id="userLastNameSignUp" name="lastName" required> <br>
        
        <label for="SignUpUsername">Email:</label>
        <input type="text" id="userEmailSignUp" name="username" required> <br>
        
        <label for="SignUpPassword">Password:</label>
        <input type="password" id="userPasswordSignUp" name="password" required> <br>
        
        <label for="re-enter-SignUpPassword">Re-enter Password:</label>
        <input type="password" id="userPasswordReEntrySignUp" name="password" required> <br>
        
        <input type="submit" id='submitSignUpBtn' value='Sign Up' >
      </form>
    </div>
`

  const loginPopupOpenBtn = document.querySelector("#loginBtn");
  const loginPopupCloseBtn = document.querySelector(".loginClose");
  const loginSubmitBtn = document.querySelector('#submitLoginBtn') ;
  const userEmailLogin = document.querySelector('#loginEmail') ;
  const userPasswordLogin = document.querySelector('#loginPassword') ;

  const signUpPopupOpenBtn = document.querySelector('#signUpBtn') ;
  const signUpCloseBtn = document.querySelector(".signUpClose") ;
  const signUpSubmitBtn = document.querySelector('#submitSignUpBtn') ;
  const userFirstNameSignUp = document.querySelector('#userFirstNameSignUp') ;
  const userLastNameSignUp = document.querySelector('#userLastNameSignUp');
  const userEmailSignUp = document.querySelector('#userEmailSignUp');
  const userPasswordSignUp = document.querySelector('#userPasswordSignUp');
  const userPasswordReEntrySignUp = document.querySelector('#userPasswordReEntrySignUp');


  loginPopupOpenBtn.addEventListener("click", () => {
    loginPopup.style.display = "block";
  });
  loginPopupCloseBtn.addEventListener("click", () => {
    loginPopup.style.display = "none";
  });
  loginSubmitBtn.addEventListener("click", (e) => {
    const correctUserEmail =  cookies.getCookieDecrypted('userEmail', 4) ;
    const correctUserPassword = cookies.getCookieDecrypted('userPassword' , 4) ;

    if (userPasswordLogin.value === correctUserPassword && userEmailLogin.value === correctUserEmail ) {
      sessionStorage.setItem('authentication', 'verified')
    }
    else {
      sessionStorage.setItem('authentication', 'unVerified')
    }
    loginPopup.style.display = "none";
  });
  signUpPopupOpenBtn.addEventListener('click', () =>{
    console.log('test')
    signUpPopup.style.display = "block";
  }) ;

  signUpSubmitBtn.addEventListener('click', (e) =>{

    cookies.createEncryptedCookieWithDate('userFirstName', `${userFirstNameSignUp.value}`, 4,
      2024, 11, 1) ;
    cookies.createEncryptedCookieWithDate('userLastName', `${userLastNameSignUp.value}`,
      2024, 11, 1) ;
    cookies.createEncryptedCookieWithDate('userEmail', `${userEmailSignUp.value}`, 4,
      2024, 11, 1) ;
    cookies.createEncryptedCookieWithDate('userPassword', `${userPasswordSignUp.value}` ,4,
      2024, 11, 1) ;
    signUpPopup.style.display = 'none' ;
  })
  signUpCloseBtn.addEventListener("click", () => {
    signUpPopup.style.display = "none";
  });
}
else {
  profileLoginSection.innerHTML = `
        <a class="nav-link" href="../html/myProfile.html">My Profile</a>    
  `
}
if (sessionStorage.getItem('authentication') === 'verified') {
  const capitalizeLetter = (word) => {
    let remaining , firstLetter, firstLetterCap ;
    firstLetter = word.charAt(0) ;
    firstLetterCap = firstLetter.toUpperCase() ;
    remaining = word.slice(1) ;

    return firstLetterCap + remaining ;

  }
  const welcomeMessage = document.querySelector('#welcomeMessageLoggedIn') ;
  welcomeMessage.innerHTML = `Welcome back  ${capitalizeLetter(
    cookies.getCookieDecrypted('userFirstName',4))}!` ;
}




