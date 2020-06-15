function onError(e) {
    alert("Hata : ", e);
}

function checkStoredSettings(storedSettings) {
    if (storedSettings.authCredentials.key) {
        var deger = storedSettings.authCredentials.key;
        document.getElementById("key").value = deger;
    }
}

document.getElementById('buttonsave').onclick = function () {
    var deger = document.getElementById("key").value;
    if (deger === "") {
        alert("Lutfen bos gecmeyiniz!");
        return;
    }
    var authCredentials = {
        key: deger
    }
    browser.storage.local.set({ authCredentials });
    alert("Kayıt edildi..");
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);
