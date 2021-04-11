// fetch('http://localhost:8080/posts', { mode: 'no-cors' });

var config = {
    apiKey: "AIzaSyDyVzefrRcULqfJlHsHN_1fQkdjJT4--hY",
    authDomain: "applied-talon-301019.firebaseapp.com",
    databaseURL: "https://applied-talon-301019-default-rtdb.firebaseio.com",
    projectId: "applied-talon-301019",
    storageBucket: "applied-talon-301019.appspot.com",
    messagingSenderId: "279177507701",
    appId: "1:279177507701:web:a12fde708af34fbc35993c",
    measurementId: "G-3P6RTP9WCK"
};

// Initialize Firebase
firebase.initializeApp(config);
initServer()
// firebase.analytics();

// const dbRefObject = firebase.database().ref().child('object-key');
// dbRefObject.on('value', snap => console.log(snap.val()));

// Инициализация на сервере



function initServer() {
    var url_str = "api_url=api_url=?api_url=https://api.vk.com/api.php&api_id=7790811&api_settings=0&viewer_id=116214318&viewer_type=0&sid=2af2b28454c40d204e2c4a1eaa8b5c4a7b8fe7ff497b032cb5d2256a04c05c58655e3d3331c15d16ac44d&secret=b32bf9fac2&access_token=5f1d50d354e3cbfa81a41de1a8c784eae83d5052e1a9e62ea6ab8fe617128fdd5bd0048f376084a43ed27&user_id=0&group_id=0&is_app_user=1&auth_key=08927e87c9dbb06571b2a58b2406077d&language=0&parent_language=0&is_secure=1&stats_hash=b81f1caf7bb756fc81&ads_app_id=7790811_d8c76efe7b0edebe61&referrer=unknown&lc_name=ebd57f91&platform=web&whitelist_scopes=friends,photos,video,stories,pages,status,notes,wall,docs,groups,stats,market,ads,notifications&group_whitelist_scopes=stories,photos,app_widget,messages,wall,docs,manage&is_widescreen=0&hash=''"

    fetch('http://localhost:3000/token?' + url_str)
        .then(res => res.text())
        .then(text => {
            console.log(text); 
            initFireBase(text);
        })
}


function initFireBase(token) {
    firebase.auth().signInWithCustomToken(token)
        .then(() => {
            console.log('access');
            let dbRef = firebase
            .database()
            .ref()
            .child("116214318/test/object-key");
            let placeholder = document.getElementById(["placeholder"]);
            dbRef.on("value", snap => (placeholder.innerText = snap.val()));
        })
        .catch(function(error) {
            // Handle Errors here.
            console.log('NO access');
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/invalid-custom-token') {
                alert('The token you provided is not valid.');
            } else {
                console.log(error);
                console.error(error);
            }
        });
};

