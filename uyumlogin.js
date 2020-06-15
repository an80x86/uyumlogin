
// about:debugging#/runtime/this-firefox
console.log('Document ready');
var key = "";

function onError(e) {
    alert("Hata : ", e);
}

function checkStoredSettings(storedSettings) {
    runXHR('http://localhost:56748/PasswordController.ashx?action=getPassword&key=' + storedSettings.authCredentials.key);
}

function doProc(response) {
    response.forEach(target => {
        if (target.Site === window.location.href) {
            switch (target.Site) {
                case "https://giris.turkiye.gov.tr/Giris/gir": {
                    document.body.style.border = "3px solid red";
                    document.getElementById("tridField").value = target.UserName;
                    document.getElementById("egpField").value = target.Passwd;
                }
                    break;
                case "https://ebildirge.sgk.gov.tr/EBildirgeV2": {
                    document.body.style.border = "3px solid red";
                    document.getElementById("kullaniciIlkKontrollerGiris_username").value = target.UserName;
                    document.getElementById("kullaniciIlkKontrollerGiris_isyeri_kod").value = target.Passwd;
                    document.getElementById("kullaniciIlkKontrollerGiris_password").value = target.Passwd2;
                    document.getElementById("kullaniciIlkKontrollerGiris_isyeri_sifre").value = target.Passwd3;
                }
                    break;
                case "https://intvrg.gib.gov.tr/": {
                    document.body.style.border = "3px solid red";
                    document.getElementById("loginSifreli").click();
                    setTimeout(function () {
                        document.getElementById("kullaniciKodu").value = target.UserName;
                        document.getElementById("sifre").value = target.Passwd;
                    }, 2000);
                }
                    break;
                case "https://esube.iskur.gov.tr/Default.aspx": {
                    document.body.style.border = "3px solid red";
                    document.getElementsByClassName("btn btn-large")[2].click();
                    setTimeout(function () {
                        document.getElementById("ctl01_userLoginIsveren_ctlEmployerUserId").value = target.UserName;
                        document.getElementById("ctl01_userLoginIsveren_ctlEmployerFirmaAra").click();
                        setTimeout(function () {
                            document.getElementById("ctl01_userLoginIsveren_ctlEmployerPassword").value = target.Passwd;
                        }, 2000);
                    }, 2000);
                }
                    break;
            }
        }

    });
}

function handleEvent(e) {
    if (e.type === 'loadend' && e.target.readyState === 4 && e.target.status === 200) {
        doProc(JSON.parse(e.target.response));
        return;
    }
    console.log("Event : ", e.type, e.loaded, e);
}

function addListeners(xhr) {
    xhr.addEventListener('loadstart', handleEvent);
    xhr.addEventListener('load', handleEvent);
    xhr.addEventListener('loadend', handleEvent);
    xhr.addEventListener('progress', handleEvent);
    xhr.addEventListener('error', handleEvent);
    xhr.addEventListener('abort', handleEvent);
}

function runXHR(url) {
    const xhr = new XMLHttpRequest();
    addListeners(xhr);
    xhr.open("GET", url);
    xhr.send();
    return xhr;
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);
