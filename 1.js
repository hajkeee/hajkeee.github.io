<script>
(function() {
    // Функція для створення кукі
    function setCookie(name, value, minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Перевірка наявності змінної dataLayer
    if (window.dataLayer) {
        var pageLabel;

        // Перебираємо всі об'єкти в dataLayer, щоб знайти потрібне значення
        for (var i = 0; i < window.dataLayer.length; i++) {
            if (window.dataLayer[i].page_label !== undefined) {
                pageLabel = window.dataLayer[i].page_label;
                break;
            }
        }

        if (pageLabel) {
            // Створюємо або оновлюємо кукі на 30 хвилин
            setCookie('page_label', pageLabel, 30);
        }
    }
})();
</script>




<script>
(function() {
    // Функція для створення кукі
    function setCookie(name, value, minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Припускаємо, що змінна pageLabel вже визначена в GTM
    setCookie('page_label', {{PageLabel}}, 30);

})();
</script>
