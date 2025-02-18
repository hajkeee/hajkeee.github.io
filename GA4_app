| **Event Name** | **Trigger Point** | **Parameters** | **iOS (Swift) Example** | **Android (Kotlin) Example** |
|--------------|----------------|--------------|----------------------|-----------------------|
| **View Item List** (`view_item_list`) | Перегляд списку товарів (категорія, пошук) | `item_list_name`, `item_list_id`, `items: [product_id, name, category]` | ```swift
FirebaseAnalytics.logEvent(AnalyticsEventViewItemList, parameters: [ "item_list_name": "Summer Collection", "item_list_id": "123", "items": [["item_id": "P001", "item_name": "T-Shirt", "item_category": "Clothing"]] ])
``` | ```kotlin
val items = listOf(bundleOf("item_id" to "P001", "item_name" to "T-Shirt", "item_category" to "Clothing"))
val params = bundleOf("item_list_name" to "Summer Collection", "item_list_id" to "123", "items" to items)
firebaseAnalytics.logEvent(FirebaseAnalytics.Event.VIEW_ITEM_LIST, params)
``` |
| **Select Item** (`select_item`) | Вибір товару зі списку | `item_list_name`, `items: [product_id, name, category]` | ```swift
FirebaseAnalytics.logEvent(AnalyticsEventSelectItem, parameters: [ "item_list_name": "Summer Collection", "items": [["item_id": "P001", "item_name": "T-Shirt", "item_category": "Clothing"]] ])
``` | ```kotlin
val params = bundleOf("item_list_name" to "Summer Collection", "items" to listOf(bundleOf("item_id" to "P001", "item_name" to "T-Shirt")))
firebaseAnalytics.logEvent(FirebaseAnalytics.Event.SELECT_ITEM, params)
``` |
| **View Item** (`view_item`) | Перегляд сторінки товару | `item_id`, `item_name`, `price`, `currency`, `item_category` | ```swift
FirebaseAnalytics.logEvent(AnalyticsEventViewItem, parameters: [ "item_id": "P001", "item_name": "T-Shirt", "price": 19.99, "currency": "USD", "item_category": "Clothing" ])
``` | ```kotlin
val params = bundleOf("item_id" to "P001", "item_name" to "T-Shirt", "price" to 19.99, "currency" to "USD", "item_category" to "Clothing")
firebaseAnalytics.logEvent(FirebaseAnalytics.Event.VIEW_ITEM, params)
``` |
| **Add to Cart** (`add_to_cart`) | Додавання товару в кошик | `item_id`, `item_name`, `price`, `quantity`, `currency` | ```swift
FirebaseAnalytics.logEvent(AnalyticsEventAddToCart, parameters: [ "item_id": "P001", "item_name": "T-Shirt", "price": 19.99, "quantity": 1, "currency": "USD" ])
``` | ```kotlin
val params = bundleOf("item_id" to "P001", "item_name" to "T-Shirt", "price" to 19.99, "quantity" to 1, "currency" to "USD")
firebaseAnalytics.logEvent(FirebaseAnalytics.Event.ADD_TO_CART, params)
``` |
| **Begin Checkout** (`begin_checkout`) | Початок оформлення замовлення | `cart_value`, `num_items`, `currency` | ```swift
FirebaseAnalytics.logEvent(AnalyticsEventBeginCheckout, parameters: [ "cart_value": 59.97, "num_items": 3, "currency": "USD" ])
``` | ```kotlin
val params = bundleOf("cart_value" to 59.97, "num_items" to 3, "currency" to "USD")
firebaseAnalytics.logEvent(FirebaseAnalytics.Event.BEGIN_CHECKOUT, params)
``` |
| **Add Payment Info** (`add_payment_info`) | Введення платіжних даних | `payment_method` | ```swift
FirebaseAnalytics.logEvent(AnalyticsEventAddPaymentInfo, parameters: [ "payment_method": "Credit Card" ])
``` | ```kotlin
val params = bundleOf("payment_method" to "Credit Card")
firebaseAnalytics.logEvent(FirebaseAnalytics.Event.ADD_PAYMENT_INFO, params)
``` |
| **Add Shipping Info** (`add_shipping_info`) | Введення інформації про доставку | `shipping_method` | ```swift
FirebaseAnalytics.logEvent("add_shipping_info", parameters: [ "shipping_method": "Standard Shipping" ])
``` | ```kotlin
val params = bundleOf("shipping_method" to "Standard Shipping")
firebaseAnalytics.logEvent("add_shipping_info", params)
``` |
| **Purchase** (`purchase`) | Завершення покупки | `order_id`, `order_value`, `num_items`, `currency`, `payment_method`, `shipping_method` | ```swift
FirebaseAnalytics.logEvent(AnalyticsEventPurchase, parameters: [ "transaction_id": "T12345", "value": 59.97, "num_items": 3, "currency": "USD", "payment_method": "Credit Card", "shipping_method": "Standard Shipping" ])
``` | ```kotlin
val params = bundleOf("transaction_id" to "T12345", "value" to 59.97, "num_items" to 3, "currency" to "USD", "payment_method" to "Credit Card", "shipping_method" to "Standard Shipping")
firebaseAnalytics.logEvent(FirebaseAnalytics.Event.PURCHASE, params)
``` |
