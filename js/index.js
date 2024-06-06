var email = document.getElementById('email');
var password = document.getElementById('password');
var loginContainer = document.getElementById('login_container');
var homeContainer = document.getElementById('home_container');
var userEmail = document.getElementById('user_email');
var note = document.getElementById('notes');

function loginUser(){
    if(!email.value || !password.value) return alert(`Please Enter Email Or Password`);
    localStorage.setItem('email', email.value);

    checkUserIsLogin();
}

function checkUserIsLogin(){
    var email = localStorage.getItem('email');
    if(email){
        var firstLetter = email.charAt(0).toUpperCase();
        loginContainer.style.display = 'none';
        homeContainer.style.display = 'block';
        userEmail.textContent = `${firstLetter}`;
        // userEmail.textContent = `Welcome ${email}`

        displayUserNotes();
        }else{
            loginContainer.style.display = 'block';
            homeContainer.style.display = 'none';
    }
}
checkUserIsLogin();

function logoutUser(){
    localStorage.removeItem('email');
    checkUserIsLogin();
}

function submitNotes(){
    var email = localStorage.getItem('email');

    var obj = {
        email: email,
        note: note.value
    };

    saveValueToLocalStorage(obj);
    note.value = '';
}

function saveValueToLocalStorage(obj){
    var notes = localStorage.getItem('notes');

    if(notes){
        notes = JSON.parse(notes);
        notes.push(obj);
        localStorage.setItem('notes', JSON.stringify(notes));
    }else{
        notes = [obj];
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    displayUserNotes();
}

function displayUserNotes(){
    var notes = localStorage.getItem('notes');
    var email = localStorage.getItem('email');
    var list = document.getElementById('list');
    if(notes){
        list.innerHTML = '';
        notes = JSON.parse(notes);
        notes.forEach(function (data, index){
            if(data.email === email){
            var liElement = `<li class="list_items">
            ${data.note}
            <p>${data.email}</p>
            </li>`;
            list.innerHTML += liElement;
            };
        });
    };
};

displayUserNotes();