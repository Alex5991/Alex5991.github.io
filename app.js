window.name = "fXD"
// nyjno dobavit v godot headers
// <script src="https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js"></script>
// smotri v npm vk bridge
var user_name = '';
var user_id = ''
var avatar = '';

var access_token = ''; // Получаем при инициализации

// Реклама
window.addEventListener('load', function() {
    
});
 
init_vk();


/*        Методы для работы VK API                 */


// Получение параметров из get запроса
function get_local_req(key) {
    var p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
}	


// Параметры через & передаются 
// Параметр=поле&Другой_параметр=поле
function JSONP_req(METHOD_NAME, PARAMETERS, ACCESS_TOKEN, V, callbackFunc) {
    var script = document.createElement('SCRIPT');
    script.src = `https://api.vk.com/method/${METHOD_NAME}?${PARAMETERS}&access_token=${ACCESS_TOKEN}&v=${V}&callback=${callbackFunc}`
    // script.src = "https://api.vk.com/method/users.get?user_ids=116214318&fields=bdate&access_token=" + p + "&v=5.130&callback=callbackFunc";
    document.getElementsByTagName("head")[0].appendChild(script);
}

// Запуск рекламы
function go_ads() {
    var user_id = null;   // user's id
    var app_id = 7768736;  // your app's id
 
    admanInit({
      user_id: user_id,
      app_id: 7768736,
      type: 'preloader'         // 'preloader' or 'rewarded' (default - 'preloader')
      // params: {preview: 1}   // to verify the correct operation of advertising
    }, onAdsReady, onNoAds);
 
    function onAdsReady(adman) {
      adman.onStarted(function () {});
      adman.onCompleted(function() {console.log('completed'); setTimeout(go_ads, 1000)});          
      adman.onSkipped(function() {});          
      adman.onClicked(function() {});
      adman.start('preroll');
    };
    
    // Рекламы нет
    function onNoAds() {
        console.log('no_ads')
        setTimeout(go_ads, 1000)
    };

    // Завершен показ блока рекламы
    function onCompleted() {
        console.log('completed x2')
        setTimeout(go_ads, 1000)
    }
}

/*        Методы для работы VK API  END               */


function init_vk() {
    VK.init(function() {
        // API initialization succeeded
        console.log('vk init');
        // var p = window.location.search;
        access_token = get_local_req('access_token')
 
        JSONP_req("users.get", "fields=photo_50,first_name,last_name", access_token,"5.130", "callbackUserGet")
        JSONP_req("wall.post", "message=SMALL", access_token, "5.130", "callbackPublish")
        JSONP_req("account.getAppPermissions", "", access_token, "5.130", "callbackPublish")
        
     }, function() {
        // API initialization failed
        // Can reload page here
   }, '5.130');
}



function publish(lvl, score) {
    console.log(lvl, score)
    console.log(access_token)
    JSONP_req("wall.post", "message=SMALL",access_token,"5.130","callbackPublish")
}



function callbackPublish(result) {
    console.log(result)
}

function callbackUserGet(result) {
    user_name = result.response[0].first_name + ' ' + result.response[0].last_name;
    user_id = result.response[0].id
    avatar = result.response[0].photo_50;
    
    console.log(user_id);
    console.log(avatar); // https://vk.com/images/camera_50.png
}


/* <script src="https://vk.com/js/api/xd_connection.js?2"  type="text/javascript"></script>
<script type="text/javascript" src="//ad.mail.ru/static/admanhtml/rbadman-html5.min.js" charset="utf-8"></script>
<script type="text/javascript" src="//vk.com/js/api/adman_init.js" charset="utf-8"></script>
<script src="app.js"></script> */




// vkBridge.send("VKWebAppInit", {});

// // прослушивает все выполненные события
// vkBridge.subscribe(e => console.log(e));

// vkBridge.send('VKWebAppGetAds')
//     .then((promoBannerProps) => {console.log(promoBannerProps)})


// vkBridge.send('VKWebAppGetEmail')
//     then(data => {
//     // Handling received data
//         console.log(data.email);
//     })
//     .catch(error => {
//     // Handling an error
//         console.log(error);
// });
// console.log('end')