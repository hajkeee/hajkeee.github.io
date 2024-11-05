function() {
    var ecommerce = {{DLV - Google Analytics - ecommerce}};
    var ecommerceItems = ecommerce ? ecommerce.items : null;

    var nodesList = document.querySelectorAll("esky-offer-block > div > div.middle > div > a > div > div > span");
    var nodeName = document.querySelector("esky-hotel-expandable-section > div > div > div");
    var names = nodesList && nodesList.length ? Array.from(nodesList).map(function(item) {
        return item.innerText.trim();
    }) : null;
    var name = nodeName ? nodeName.innerText.trim() : {{DLV - hotel name - add_to_cart}};
    var flightFrom_select = {{DLV - airport from}} || 'error';
    var flightTo_select = {{DLV - airport destination}} || 'error';
    var flightName_select = {{cJS - flight name}} || "error";
    var variant_airlines = {{cJS - variant airlines}} || "error";

  
    var products = []; 


    if (ecommerce && ecommerceItems) {
        products = ecommerceItems.map(function(item, i) {

            if (item.item_brand !== "Flight") {
                return {
                    id: item.item_category3,
                    name: names && names.length > 0 ? names[i] : name || {{DLV - hotel name - add_to_cart}}, 
                    price: item.price,
                    category: item.item_brand || '',
                    list: '',
                    position: item.index || 0,
                    variant: item.item_variant || ''
                };
            }

            if (item.item_brand === "Flight") {
                return {
                    id: flightFrom_select.toUpperCase() + '|' + flightTo_select.toUpperCase() || {{DLV - Flights.Departure.AirportCode}} + '|' + {{DLV - Flights.Arrival.AirportCode}},
                    name: {{DLV - Flights.Departure.CityName}} +'|'+ {{DLV - Flights.Arrival.CityName}}, 
                    price: item.price, 
                    category: 'Flight', 
                    list: '',
                    position: item.index || 0,
                    variant: {{DLV - Flights.OfferDetails.AirlineNames}} || "error" 
                };
            }

            return null;
        }).filter(Boolean); 
    }


    var hasFlight = products.some(function(product) {
        return product && product.category === "Flight";
    });


    if (!hasFlight) {
        


        if (flightFrom_select && flightTo_select && flightName_select) {
            products.push({
                id: flightFrom_select.toUpperCase() + '|' + flightTo_select.toUpperCase(),
                name: flightName_select,
                price: 0, 
                category: 'Flight', 
                list: '',
                position: products.length, 
                variant: variant_airlines
            });
        }
    }

    return products;
}
/////////////////////////////////









































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

