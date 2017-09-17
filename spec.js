// spec.js
var book_url = 'https://www.bol.com/nl/p/continuous-delivery/1001004007694286/'
var add_to_basket_btn = element(by.id("1001004007694286"));
var checkout_btn = element(by.linkText('bestellen'));
var basket_url = 'https://www.bol.com/nl/order/basket.html';
var totals_table_rows = element.all(by.class('totals__table tr'));
var totalPriceRowIndex = 2;
var deliveryFeeRowIndex = 1;


beforeEach(function() {
	browser.waitForAngularEnabled(false);
	browser.manage().window().maximize();
});


describe('When an order costs more than 20 euros', function() {
	it('should provide free delivery', function() {

		addBookToshoppingList();
		continueToBasket();

		var currentUrl = browser.getCurrentUrl();
    	expect(currentUrl.toEqual(basket_url));

		var totalPrice = getTheTotalPrice();
		expect(totalPrice).toBeGreaterThan(40);

		var deliveryFee = getDeliveryFee();
    	expect(deliveryFee.toEqual("Free"));
	});
});


function addBookToshoppingList(){
	browser.get(book_url);
	add_to_basket.click().then(function(){
		});
}

function continueToBasket(){
	checkout_btn.click();
}

function getTotalOrderPrice(){
	var totalOrderPrice = totals_table_rows.get(totalPriceRowIndex).element(by.css('td')).getText();
	return totalOrderPrice;
}

function getDeliveryFee(){
	var deliveryFee = totals_table_rows.get(deliveryFeeRowIndex).element(by.css('td')).getText();
	return deliveryFee;
}
