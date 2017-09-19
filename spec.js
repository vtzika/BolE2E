// spec.js
var moreThanTwentyEurosBookUrl = 'https://www.bol.com/nl/p/continuous-delivery/1001004007694286/';
var lessThanTwentyEurosBookUrl = 'https://www.bol.com/nl/p/the-phoenix-project/9200000027983023/';
var twentyEurosBookUrl = 'https://www.bol.com/nl/p/data-analyseren-en-programmeren-met-r/9200000077965963/';
var addToBasketMoreThanTwentyEurosBtn = element(by.id("1001004007694286"));
var addToBasketLessThanTwentyEurosBtn = element(by.id("9200000027983023"));
var addToBasketTwentyEurosBtn = element(by.id("9200000077965963"));
var checkoutBtn = element(by.linkText('bestellen'));
var basketUrl = 'https://www.bol.com/nl/order/basket.html';
var totalsTableRows = element.all(by.css('.totals__table tr td'));
var totalPriceRowIndex = 3;
var deliveryFeeRowIndex = 2;


beforeEach(function() {
	browser.waitForAngularEnabled(false);
	browser.manage().window().maximize();
});

afterEach(function() {
	//TODO clean basket
});



describe('When an order costs more than 20 euros', function() {
	it('should not charge for delivery', function() {

		browser.get(moreThanTwentyEurosBookUrl);
		addBookToshoppingList(addToBasketMoreThanTwentyEurosBtn);
		continueToBasket();

		var currentUrl = browser.getCurrentUrl();
    	expect(currentUrl).toEqual(basketUrl);

		var totalPrice = getTotalOrderPrice();
		expect(totalPrice).toBeGreaterThan(40);

		var deliveryFee = getDeliveryFee();
    	expect(deliveryFee).toEqual("Free");
	});
});



describe('When an order costs less than 20 euros', function() {
	it('should charge for delivery', function() {

		browser.get(lessThanTwentyEurosBookUrl);
		addBookToshoppingList(addToBasketLessThanTwentyEurosBtn);
		continueToBasket();

		var currentUrl = browser.getCurrentUrl();
    	expect(currentUrl).toEqual(basketUrl);

		var totalPrice = getTotalOrderPrice();
		expect(totalPrice).toEqual('Gratis');

		var deliveryFee = getDeliveryFee();
    	expect(deliveryFee).toBeGreaterThan(0);
	});
});


describe('When an order costs 20 euros', function() {
	it('should not charge for delivery', function() {

		browser.get(twentyEurosBookUrl);
		addBookToshoppingList(addToBasketTwentyEurosBtn);
		continueToBasket();

		var currentUrl = browser.getCurrentUrl();
    	expect(currentUrl).toEqual(basketUrl);

		var totalPrice = getTotalOrderPrice();
		expect(totalPrice).toEqual('Gratis');

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
	var totalOrderPrice = totalsTableRows.get(totalPriceRowIndex).getText();
	return totalOrderPrice;
}

function getDeliveryFee(){
	var deliveryFee = totalsTableRows.get(deliveryFeeRowIndex).getText();
	return deliveryFee;
}
