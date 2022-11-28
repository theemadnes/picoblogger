document.addEventListener('DOMContentLoaded', (event) => {
    //the event occurred
    console.log(event);
    console.log(auth);
//console.log(auth.currentUser.accessToken);
console.log(JSON.parse(JSON.stringify(window.auth)));
console.log('yo');
console.log(tkn);
let tkn = JSON.parse(JSON.stringify(window.auth)).currentUser.stsTokenManager.accessToken;

if (tkn === null) {
    console.log("not logged in");
    document.getElementById('loginLink').textContent = "sign in";
} else {
    console.log("logged in");
    document.getElementById('loginLink').textContent = "sign out";
};
  });
