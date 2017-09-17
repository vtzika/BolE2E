// spec.js
var moreThan20eurosBookUrl = 'https://www.bol.com/nl/p/continuous-delivery/1001004007694286/';
var lessThan20eurosBookUrl = 'https://www.bol.com/nl/p/the-phoenix-project/9200000027983023/';
var addToBasketMoreThan20eurosBtn = element(by.id("1001004007694286"));
var addToBasketLessThan20eurosBtn = element(by.id("9200000027983023"));
var checkoutBtn = element(by.linkText('bestellen'));
var basketUrl = 'https://www.bol.com/nl/order/basket.html';
var totalsTableRows = element.all(by.css('.totals__table tr'));
var totalPriceRowIndex = 2;
var deliveryFeeRowIndex = 1;


beforeEach(function() {
	browser.waitForAngularEnabled(false);
	browser.manage().window().maximize();
});


describe('When an order costs less than 20 euros', function() {
	it('should have a delivery fee', function() {

		browser.get(moreThan20eurosBookUrl);
		addBookToshoppingList(addToBasketMoreThan20eurosBtn);
		continueToBasket();

		var currentUrl = browser.getCurrentUrl();
    	expect(currentUrl).toEqual(basketUrl);

		var totalPrice = getTotalOrderPrice();
		expect(totalPrice).toBeGreaterThan(40);

		var deliveryFee = getDeliveryFee();
    	expect(deliveryFee).toEqual("Free");
	});
});



describe('When an order costs more than 20 euros', function() {
	it('should provide free delivery', function() {

		browser.get(moreThan20eurosBookUrl);
		addBookToshoppingList(addToBasketLessThan20eurosBtn);
		continueToBasket();

		var currentUrl = browser.getCurrentUrl();
    	expect(currentUrl).toEqual(basketUrl);

		var totalPrice = getTotalOrderPrice();
		expect(totalPrice).toBeGreaterThan(40);

		var deliveryFee = getDeliveryFee();
    	expect(deliveryFee).toBeGreaterThan(0);
	});
});

function addBookToshoppingList(addToBasketBtn){
	addToBasketBtn.click().then(function(){
		});
}

function continueToBasket(){
	checkoutBtn.click();
}

function getTotalOrderPrice(){
	var totalOrderPrice = totalsTableRows.get(totalPriceRowIndex).element(by.css('td')).getText();
	return totalOrderPrice;
}

function getDeliveryFee(){
	var deliveryFee = totalsTableRows.get(deliveryFeeRowIndex).element(by.css('td')).getText();
	return deliveryFee;
}
