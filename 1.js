

v3 -----------------------------------------------------------------------------

<script>
(function() {
    // Функція для створення кукі
    function setCookie(name, value, minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Функція для отримання значення кукі
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Отримуємо поточне значення кукі 'page_label'
    var pageLabelCookie = getCookie('page_label');

    // Якщо кукі існує, продовжуємо його час дії на 30 хвилин
    if (pageLabelCookie) {
        setCookie('page_label', pageLabelCookie, 30);
    } else {
        // Якщо кукі не існує або минув термін дії, створюємо новий
        setCookie('page_label', {{PageLabel}}, 30);
    }
})();
</script>



//Local storage

<script>
(function() {
    function setLocalStorage(name, value, minutes) {
        var expirationTime = new Date().getTime() + (minutes * 60 * 1000);
        var item = {
            value: value,
            expiration: expirationTime
        };
        localStorage.setItem(name, JSON.stringify(item));
    }

    function getLocalStorage(name) {
        var item = localStorage.getItem(name);
        if (!item) {
            return null;
        }

        item = JSON.parse(item);
        if (new Date().getTime() > item.expiration) {
            localStorage.removeItem(name);
            return null;
        }

        return item.value;
    }

    var pageLabelStorage = getLocalStorage('page_label');

    if (pageLabelStorage) {
        setLocalStorage('page_label', pageLabelStorage, 30);
    } else {
        setLocalStorage('page_label', {{PageLabel}}, 30);
    }
})();
</script>

