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
        // Витягуємо значення змінної з dataLayer
        var pageLabel = window.dataLayer.find(function(item) {
            return item.page_label !== undefined;
        })?.page_label;

        if (pageLabel) {
            // Створюємо або оновлюємо кукі на 30 хвилин
            setCookie('page_label', pageLabel, 30);
        }
    }
})();
