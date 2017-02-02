/**************************************************************

Static page functions (JO3)

**************************************************************/

//Show checkout automatic content
function show_checkout_content() {
	if (checksameurl(location.href, checkoutpage) == true) {
		// Checkout table
		document.write('<div class="simpleCart_items"></div><div id="cartTotal">');
		document.write('<div id="empty_cart"><a href="javascript:;" class="simpleCart_empty">' + translate_sentence('Empty cart') + '</a></div>');
		document.write('<div class="total_quantity">' + translate_sentence('You have') + ' <strong><span class="simpleCart_quantity"></span></strong> ' + translate_sentence('item(s) in cart') + '</div>');
		if (shipping_method == 2) { document.write('<div class="total_amount">' + translate_sentence('Total weight') + ': <strong><span class="simpleCart_weight"></span>g</strong></div>'); }
		document.write('<div class="total_amount">' + translate_sentence('Subtotal in Cart') + ': <strong><span class="simpleCart_total"></span></strong></div>');
		document.write('<div class="total_amount">' + translate_sentence('Shipping cost'));
		document.write(': <strong><span class="simpleCart_shipping"></span></strong></div><div class="total_amount">' + translate_sentence('Paypal commission'));
		document.write(': <strong><span class="simpleCart_tax"></span></strong></div><div class="total_amount grandtotal">');
		document.write(translate_sentence('Grand total') + ': <strong><span class="simpleCart_grandTotal"></span></strong></div></div>');
		// Checkout table
		
		//Shipping methods
		i_shipping = localStorage.getItem('i_shipping');
		document.write('<center><div id="shipping_types">');
		if (free_shipping_from > 0){
			document.write('<div class="separation"><span>' + translate_sentence('If your purchase is over') + ' ' + format_currency(free_shipping_from) + ', ');
			document.write(translate_sentence('your shipping will be free!') + '</span> (' + translate_sentence(shipping_types[0][0]) + ')</div>');
		}
		document.write(translate_sentence('Shipping methods') + ':  <select onChange="update_shipping(this.selectedIndex)" id="sel_shipping" name="sel_shipping">');
		for(var i=0; i < shipping_types.length; i++){
			//alert('i_shipping ' + i_shipping);
			if (i == i_shipping) {
				document.write('<option value="1" selected>');
			} else {
				document.write('<option value="1">');
			}
			document.write(translate_sentence(shipping_types[i][0]) + ' (' + shipping_types[i][1] + ' ' + translate_sentence('days approx.') +')</option>');
		}
		document.write('</select></div></center>');
		//Shipping methods
		
		// Tracking number
		if (track_price !== false) {
			document.write('<div id="track_wrap"><center><div class="add_track"><div class="item_image">');
			document.write('<img class="item_thumb" src="https://lh5.googleusercontent.com/-0fOox7Snmhs/U11aqpau6LI/AAAAAAAABAk/Db1QGyEEwqU/s100-no/track-number.png" alt="' + translate_sentence('Tracking number') + '" title="' + translate_sentence('Tracking number') + '"></div>');
			document.write('<select class="item_color" style="display: none;"><option value="-">-</option></select>');
			document.write('<select class="item_size" style="display: none;"><option value="-">-</option></select>');
			document.write('<div class="product-summary"><div class="item_name">Tracking number</div><div class="item_description">');
			document.write(translate_sentence('Get the tracking number of your order and stay calm!') + '</div><div class="track_price">');
			document.write(format_currency(parseFloat(track_price)) + '</div></div><a class="item_add button" href="javascript:;">');
			document.write(translate_sentence('Add to cart') + '</a></div></center></div>');
			document.write('<div class="item_price" style="display: none;">' + parseInt(track_price) + '</div>');
		}
		// Tracking number
		
		//Set selected country
		i_country = localStorage.getItem('i_country');
		if (i_country === null || typeof i_country === 'undefined') {
			i_country = localStorage.setItem('i_country', 0);
			i_country = localStorage.getItem('i_country');
		}
		//Set selected country
			
		//Available countries in cart
		if (world_shipping == false) {
			document.write('<center><div id="countries">' + translate_sentence('Select your country') + ':  <select id="selcountries" name="selcountries">');
			country_list.unshift('...');
			for(var i=0; i < country_list.length; i++){
				if (i == i_country) {
					document.write('<option value="' + i + '" selected>');
				} else {
					document.write('<option value="' + i + '">');
				}
				document.write(translate_sentence(country_list[i]) + '</option>');
			}
			document.write('</select></div></center>');
		}
		//Available countries in cart
		
		//Show cart text and place the order button
		document.write('<center>* ' + translate_sentence('You can pay with credit card or PayPal') + '.<br />');
		if (certified_shipping == true) {
			document.write('* ' + translate_sentence('Your packet will be sent with tracking number if you order it') + '.<br />');
		}
		document.write('* ' + translate_sentence('Do you have any question?') + ' ');
		showpagelink(contactuspage, translate_sentence('Contact us!'));
		document.write('<br /></center>');

		if (world_shipping == true) {
			document.write('<a class="simpleCart_checkout button turquoise" href="javascript:;"><span class="checkout_btn">' + translate_sentence('Place the order') + '</span></a>');
		} else {
			var selcountries = 0;
			window.onload = function() {
				document.getElementById("selcountries").onchange=function(){
					selcountries = document.getElementById("selcountries").value;
					i_country = localStorage.setItem('i_country', selcountries);
					i_country = localStorage.getItem('i_country');
					if (selcountries > 0){
						document.getElementById("place_button").style.display = "block";
						document.getElementById("disable-button").style.display = "none";
					} else {
						document.getElementById("place_button").style.display = "none";
						document.getElementById("disable-button").style.display = "block";
					}
				}  
			  document.getElementById("selcountries").onchange();
			}
			document.write('<a style="display: none;" id="place_button" class="simpleCart_checkout button turquoise" href="javascript:;"><span class="checkout_btn">' + translate_sentence('Place the order') + '</span></a>');
			document.write('<div id="disable-button">' + translate_sentence('Select your country') + '</div>');
		}
		//Show cart text and place the order button
	}
}
//Show checkout automatic content

//Update the shipping cost selected
function update_shipping(value) {
	i_shipping = localStorage.setItem('i_shipping', value);
	simpleCart.shipping(function(){ return value; });
	simpleCart.update();
}
//Update the shipping cost selected

//Show contact us automatic content
function show_contact_content() {
	if (checksameurl(location.href, contactuspage) == true && contact_us_auto_content == true) {
		document.write('<div style="line-height: 2em;">' + translate_sentence('The main questions that our customers have are'));
		document.write(':<br/><p>* <b>' + translate_sentence('How long does the delivery take?') + '</b> ' + translate_sentence('You can see this information in') + ' ');
		showpagelink(shipping_handling_page, translate_sentence('Shipping and handling'));
		document.write('.<br/>* <b>' + translate_sentence('What method of payment are there?') + '</b> ');
		document.write(translate_sentence('You can pay with credit card or PayPal. We accept Mastercard, Visa, Discover... The payment is secure and easy') + '.<br/>*');
		if (show_if_enabled(company_address) !== false || show_company_location === true) {
			document.write(' <b>' + translate_sentence('Where are we from?') + '</b> ' + translate_sentence('We are based in') + ' ');
			if (show_if_enabled(company_address) !== false) { document.write(translate_sentence(company_address) + ', '); }
			if (show_company_location === true) { document.write(translate_sentence(company_city) + ' (' + translate_sentence(company_country) + ')'); }
			document.write('.<br/>');
		}
		document.write('</p>' + translate_sentence('For everything else, you can contact us by') + ':<br/><p>* <b>' + translate_sentence('E-mail'));
		document.write(':</b> <a href="mailto:' + company_email + '">' + company_email + '</a>' + '<br/>');
		if (show_if_enabled(phone_number) !== false) { document.write('* <b>' + translate_sentence('Telephone') + ':</b> ' + phone_number + '.<br/>'); }
		document.write('* <b>' + translate_sentence('Through the following contact form') + ':</b> </p>' + '</div>');
		document.write('<style>#ContactForm1 { display: block; }</style>');	//Show the contact form
	}
}
//Show contact us automatic content

//Modify contact form
function modify_contact_form_message() {
	$(function() {
		$('.contact-form-button-submit').click(function() {
			if ($('.contact-form-error-message-with-border').text() == 'A valid email address is required.') {
				$('#contact_form_message').text(translate_sentence('Please, insert a correct email'));
				$('#contact_form_message').css('color', '#960000');
			} else if ($('.contact-form-error-message-with-border').text() == 'Message field cannot be empty.') {
				$('#contact_form_message').text(translate_sentence('Please, write a message'));
				$('#contact_form_message').css('color', '#960000');
			} else if ($('.contact-form-success-message-with-border').text() == 'Sending...') {
				$('#contact_form_message').text(translate_sentence('Your message has been sent. Thanks!'));
				$('#contact_form_message').css('color', '#555');
			} else {
				$('#contact_form_message').text('');
			}
		});
	});
}
//Modifying contact form

//Show footer contact form
function show_footer_contact_form() {
	change_properties('.contact-form-button-submit', 'value', translate_sentence('Send'));
	document.write('<br/><br/>' + translate_sentence('We will reply as soon as possible') + '.');
}
//Modifying contact form

//Show correct order page automatic content
function show_correct_order_page_content() {
	if (checksameurl(location.href, correctorderpage) == true) {
		document.write(translate_sentence('Success submission! Paypal will send you an automated e-mail notification for your reference. Please check your e-mail inbox for purchase order details and banking transaction options.'));
		document.write('<br/><br/>' + translate_sentence('Thank you again for your purchase!'));
		simpleCart.empty();	//Remove items from cart
	}
}
//Show correct order page automatic content

//Show about us automatic content
function show_about_us_page_content() {
	if (checksameurl(location.href, aboutuspage) == true && about_us_auto_content == true) {
		if (show_if_enabled(company_address) !== false || show_company_location === true) {
			document.write(company_name + ' ');
			if (show_if_enabled(VAT_Tax_ID) !== false) { document.write('(' + VAT_Tax_ID + ')'); }
			document.write(' ' + translate_sentence('is a good online commercial company based in') + ' ');
			if (show_if_enabled(company_address) !== false) { document.write(translate_sentence(company_address) + ', '); }
			if (show_company_location === true) { document.write(translate_sentence(company_city) + ' (' + translate_sentence(company_country) + ')'); }
			document.write('. ');
		}
		document.write(translate_sentence('Our company has earned itself a solid reputation for quality, good service, reliability and professionalism in this field') + '. ');
		document.write(translate_sentence('Our operation capabilities cover favorable policy, instant and safe delivery, privacy protection and well-rounded customer support') + '. ');
		document.write(translate_sentence('The mission of') + ' ' + company_name + ' ' + translate_sentence('is to provide you with the best products to the best prices') + '.<br/><br/>');
		document.write(translate_sentence('Our reputation, experience and keen industry insight permit us to negotiate low prices on the net') + '. ');
		document.write(translate_sentence('If you have a suggestion you would like to share with our team, please let us know') + '. ');
		document.write(translate_sentence('Customer feedback shapes our business and allows us to better serve our audience so your ideas are always welcome') + '.<br/><br/>');
		document.write(company_name + ' ' + translate_sentence('respects your right to privacy') + '. ');
		document.write(translate_sentence('Our goal is your complete satisfaction and we are not in the business of sharing your information with others') + '. ');
		document.write(translate_sentence('All personal data is stored on our secure server with several layers of firewall protection') + '.<br/><br/>');
		document.write(translate_sentence('We promise to') + ':<br/> * ' + translate_sentence('Provide 24/7 customer support on weekdays') + '.<br/>');
		document.write(' * ' + translate_sentence('Streamline the buying and paying process') + '.<br/>');
		document.write(' * ' + translate_sentence('Deliver goods to our customers with speed and precision') + '.<br/>');
		document.write(' * ' + translate_sentence('Ensure the excellent quality of our products') + '.<br/> * ' + translate_sentence('Secure payment') + '.<br/><br/>');
		document.write(translate_sentence('We hope our customers get a great experience buying our products') + '.<br/>');
	}
}
//Show about us automatic content

//Show Shipping and handling page automatic content
function show_shipping_handling_page_content() {
	if (checksameurl(location.href, shipping_handling_page) == true && shipping_handling_auto_content == true) {
		document.write('<h6>' + translate_sentence('What shipping methods do you offer?') + '</h6>');
		document.write(translate_sentence('The order will be sent directly to your address') + '. ');
		document.write(translate_sentence('The total shipping time is the order picking + handling time + shipping time') + '. ');
		document.write(translate_sentence('Normally, the processing time is very low') + '. ');
		document.write(translate_sentence('The shipping methods available are') + ':<p>');
		for (var i = 0; i < shipping_types.length; i++) {
			document.write(translate_sentence(shipping_types[i][0]) + ' (' + shipping_types[i][1] + ' ' + translate_sentence('days approx.') + ')<br>');
		}
		document.write('</p><br>* ' + translate_sentence('The shipping time can vary depending on the country') + '. ');
		document.write(translate_sentence('You will choose the shipping method on checkout') + '.');
		document.write('<br/><br/><h6>' + translate_sentence('How do I calculate shipping costs?') + '</h6>');
		if (shipping_method == 1) {
			if (shipping_types.length == 1) {
				document.write(translate_sentence('The shipping cost is') + shipping_types[0][4] + ' ' + translate_sentence('regardless of the products you buy'));
			} else {
				document.write(translate_sentence('The shipping cost will vary depending the shipping method you select') + '. ');
				document.write(translate_sentence('You can see it on checkout') + '.');
			}
		} else {
			document.write(translate_sentence('The shipping cost will vary depending the shipping method you select') + '. ');
			document.write(translate_sentence('The shipping cost will also vary depending on the weight of the products you add to cart') + '.');
		}
		if (track_price !== false) {
			document.write('<br/><br/><h6>' + translate_sentence('How can I track my package?') + '</h6>');
			document.write(translate_sentence('If you choose the tracking number on checkout, you will get your tracking number and you will track') + '.');
		}
		document.write('<br/><br/><h6>' + translate_sentence('Do you ship to my country?') + '</h6>');
		if (world_shipping == true) {
			document.write(translate_sentence('Do not worry! We send to worldwide') + '.');
		} else {
			document.write(translate_sentence('Actually we send to') + ': ');
			if (country_list.length == 1) { document.write(translate_sentence(country_list[0]) + '. '); }
			else {
				for (var i = 0; i < country_list.length; i++) {
					if (i == country_list.length - 1) { document.write(' ' + translate_sentence('and') + ' '); }
					document.write(translate_sentence(country_list[i]));
					if (i != country_list.length - 1) { document.write(', '); }
				}
				document.write('. '+ translate_sentence('If you do not find your county in the list, contact us') + '.');
			}
		}
		document.write('<br/><br/><h6>' + translate_sentence('If custom duties are incurred, who is responsible?') + '</h6>');
		document.write(translate_sentence('It is the responsibility of the customer for any custom duty fees that may be charged upon delivery') + '. ');
		document.write(translate_sentence('The import duty will depend of the custom policies of each country') + '. ');
		document.write('<br/><br/><h6>' + translate_sentence('If the Package held by Customs, who will be responsible for Package clearance?') + '</h6>');
		document.write(translate_sentence('If the items are detained by Customs after the shipment is done, the buyer is responsible for clearance of the detained items') + '. ');
		document.write('<br/><br/><h6>' + translate_sentence('How do I change my shipping address?') + '</h6>');
		document.write(translate_sentence('If your order has been sent, you cannot change your shipping address. If the packet is not sent, contact us quickly') + '. ');
	}
}
//Show Shipping and handling page automatic content

//Show Payment methods automatic content
function show_payment_method_page_content() {
	if (checksameurl(location.href, payment_methods_page) == true && payment_methods_auto_content == true) {
		document.write('<h6>' + translate_sentence('How can I pay?') + '</h6>');
		document.write(translate_sentence('You can pay on checkout when you add your product to shopping cart. We have two methods: Credit card and Paypal') + '. ');
		document.write('<br/><br/><h6>' + translate_sentence('What credit cards do we accept?') + '</h6>');
		document.write(translate_sentence('We accept the credit cards most used') + ': ' + translate_sentence('Mastercard, Visa, American Express, Discover and Aurora'));
		document.write('<br/><br/><h6>' + translate_sentence('What advantages do I have if I pay with paypal?') + '</h6>');
		document.write(translate_sentence('You can get many advantages') + ': ');
		document.write(translate_sentence('Secure system and secure payments, buy and pay with your mobile or tablet, no membership fees or service charges, discount coupons') + '...');
	}
}
//Show Payment methods automatic content

//Show Satisfaction policy automatic content
function show_satisfaction_policy_page_content() {
	if (checksameurl(location.href, satisfactionpolicypage) == true && satisfaction_policy_auto_content == true) {
		document.write(translate_sentence('We will try our best to make sure the products shipped to our customers are in good quality') + '. ');
		document.write(translate_sentence('If there are some problems on the goods, you have right to guarantee your benefits') + '. ');
		document.write(translate_sentence('You do not have to worry about anything!') + '. ');
		document.write('<br/><br/><h6>' + translate_sentence('Return and refund') + '</h6>');
		document.write(translate_sentence('The products with quality problem can be returned and refund') + '. ');
		document.write(translate_sentence('The customer will need to send the products back to us') + '. ');
		document.write(translate_sentence('When we receive the products, we will give the refund') + '. ');
		document.write('<br/><br/><h6>' + translate_sentence('Loss') + '</h6>');
		document.write(translate_sentence('If your packet has been sent but you do not receive the packet, the problem is the carrier') + '. ');
		document.write(translate_sentence('But we want to have satisfied customer') + '. ');
		document.write(translate_sentence('For that, if your packet is lost, we will refund your money or we will send again') + '. ');
		document.write('<br/><br/><h6>' + translate_sentence('Replace') + '</h6>');
		document.write(translate_sentence('Products with quality problem can be returned and replaced') + '. ');
		document.write(translate_sentence('Customer need to send the products back to us') + '. ');
		document.write(translate_sentence('When we receive the products, we will replace new ones and ship back to customer') + '. ');
	}
}
//Show Satisfaction policy automatic content

//Show Legal notice automatic content
function show_legal_notice_page_content() {
	if (checksameurl(location.href, legalnoticepage) == true && legal_notice_auto_content == true) {
		document.write('<div style="text-align: justify;"><h6>' + translate_sentence('1.- INTRODUCTION') + '</h6>');
		document.write(translate_sentence('This document is intended to establish and regulate the terms of use and safeguarding the data of the site') + ' (' + document.domain + '), ');
		document.write(translate_sentence('(from now on called “the Site”) understanding that the site has all the pages and contents owned by') + ' ' + company_name + ' ' + translate_sentence('which is accessed through the domain') + '. ');
		document.write(translate_sentence('The use of this site as well as the services it offers to the user, implies full and unreserved acceptance of each and every one of the conditions contained in this Legal Notice (from here on "General Conditions ")') + ', ');
		document.write(translate_sentence('so the user should be aware of the importance of reading them each time the user visits the Site') + '. ');
		document.write(translate_sentence('Accessing the Site implies knowing and  accepting the following "General Conditions" which') + ' ' + company_name + ' ');
		document.write(translate_sentence('recommends the users to print or download and read  carefully each time the user accesses the Site') + '. ');
		document.write('<br/><br/><h6>' + translate_sentence('2.-GENERAL INFORMATION') + '</h6>');
		document.write(translate_sentence('In compliance with the duty to inform the customer contained in Article 10 of Law 34/2002, of July 11, of the Society Services of the Information  and Electronic Commerce, below we reflect the following') + ': ');
		if (show_if_enabled(company_address) !== false || show_company_location === true) {
			document.write(company_name + ' ');
			if (show_if_enabled(VAT_Tax_ID) !== false) { document.write('(' + VAT_Tax_ID + ')'); }
			document.write(' ' + translate_sentence('is an entity from') + ' ');
			if (show_if_enabled(company_address) !== false) { document.write(translate_sentence(company_address) + ', '); }
			if (show_company_location === true) { document.write(translate_sentence(company_city) + ' (' + translate_sentence(company_country) + ')'); }
			document.write('. ');
		}
		document.write(translate_sentence('The email contact is') + ' ' + company_email + ', ' + translate_sentence('and the telephone') + ': ' + phone_number );
		document.write('<br/><br/><h6>' + translate_sentence('3. - USE OF THE SITE') + '</h6>');
		document.write(translate_sentence('By accepting these Terms the user agrees to use the Website and the services it provides in the way, the manner and form in which it is established') + '. ');
		document.write(translate_sentence('Users may not use this Site and its services for illegal and / or contrary purposes against those  stated in the General Conditions, which may be detrimental to the rights and / or interests of others or in any way damage the Site preventing it or its present and future services to work') + '. ');
		document.write('<br/><br/><h6>' + translate_sentence('4.- SCOPE OF THE SITE. USER RESPONSIBILITY') + '</h6>');
		document.write(translate_sentence('The access to this site is the sole responsibility of the users. That includes any risks arising from the use of the Site') + '. ');
		document.write(company_name + ' ' + translate_sentence('does NOT guarantee') + ':<br>' + translate_sentence('(I) The infallibility, availability, continuity, absence of defects or safety of the Site') + '.<br>');
		document.write(translate_sentence('(II) The content of the Site or the information passing through it are free of viruses or other harmful elements such as errors, omissions or inaccuracies') + '.<br>');
		document.write(translate_sentence('(III) The safety of the user of the Website; The size not be liable for any loss or damage that may arise from interferences, omissions, interruptions, computer viruses, telephone faults or disconnections in the operational functioning of this electronic system , due to causes unrelated to the Site, the delays or blockages in the use of this electronic system caused by deficiencies or overloading in the data processing Centre, telephone lines, in the Internet system or other electronic systems, nor damage that may be caused by third parties through illegalities beyond the control of the Site') + '.<br>');
		document.write(translate_sentence('It also exempts the Site from liability for any loss or damage incurred by you as a result of errors, defects or omissions in the information provided by the Site provided from outside sources') + '. ');
		document.write(translate_sentence('Mere access to the Site does not imply any kind of commercial relationship between the user and the Site') + '. ');
		document.write('<br/><br/><h6>' + translate_sentence('5.- UPDATING AND MODIFICATION OF INFORMATION') + '</h6>');
		document.write(translate_sentence('The information on this site is accurate at the date of the last update. The Site reserves the right to update, modify or delete information on this Site, and may limit or deny access. The Site reserves the right to make, at any time, changes and modifications deemed desirable, and may exercise this right at any time and without notice') + '. ');
		document.write('<br/><br/><h6>' + translate_sentence('6.- CONTENTS') + '</h6>');
		document.write(translate_sentence('The Site does not guarantee, or accepts responsibility for the consequences that may result from errors in the contents appearing on the Site provided by others. The Site is not responsible in any way for the contents, commercial activities, products and services that can be viewed through electronic links (links) if there were any, and if there were, directly or indirectly, through this Site') + '. ');
		document.write(translate_sentence('The presence of links in the the Site Website, unless expressly stated otherwise, is for informational purposes only and in no way a suggestion, invitation or recommendation thereof. These links do not represent any kind of relationship between the Site and companies or owners of the websites that can be accessed through these links. The Site reserves the right to withdraw unilaterally and at any time and without notice the link from its Site') + '. ');
		document.write(translate_sentence('The Site reserves the right to prevent or prohibit access to the Site to any Internet user to enter this site any content contrary to legal or moral standards, reserving the right to pursue legal action it deems necessary to prevent such behaviours') + '. ');
		document.write('<br/><br/><h6>' + translate_sentence('7.- NAVIGATION, ACCESS AND SECURITY') + '</h6>');
		document.write(translate_sentence('The Site Central makes every effort to ensure that browsing takes place under optimum conditions and to avoid any type of damage that may occur during the same. The Site is not liable for damages of any kind that may be caused to users by using other browsers or different versions of the browsers for which the Site is designed') + '. ');
		document.write(translate_sentence('The Site makes no representation or guarantee that access to this Site will be uninterrupted or error free. No responsibility or guarantee that the content or software that can be accessed through this site is free from error or cause damage. The Site, in no event, can be liable for any losses or damages of any kind arising from the access and use of the Site, including but not limited to damage to systems or those caused by a virus') + '. ');
		document.write(translate_sentence('The Site is not responsible for any damage that may be caused to users by improper use of this Site. In particular, is not responsible in any way for breakdowns, interruptions, faults or defects in telecommunications that may occur. The services offered on the Site may only be used correctly if they meet the technical specifications for which it was designed') + '. ');
		document.write('<br/><br/><h6>' + translate_sentence('8.- DATA PROTECTION') + '</h6>');
		document.write(translate_sentence('The processing of personal data and sending electronic communications are regulated by  the rules established in the Organic Law') + '. ');
		document.write(translate_sentence('In accordance with the provisions of the current legislation on data protection, we inform you that your personal data will be incorporated into the Site Personnel Selection file in order to have your professional history for selection and contractual purposes') + '. ');
		document.write(translate_sentence('Also, unless stated otherwise, the Site and any of the Companies that make up the Site, shall have access to your personal information, solely for the purposes described above. The Site guarantees the right to access, rectify, cancel and object to the processing of data which must be notified in writing') + '. ');
		document.write(translate_sentence('If after one year from the inclusion of your personal data you have not heard from us, we will proceed to erase the data from our file') + '. ');
		document.write('<br/><br/><h6>' + translate_sentence('9.- USE OF COOKIES') + '</h6>');
		document.write(translate_sentence('Access to the Website may imply the use of cookies on its pages and those pages linked or referenced through links. Users who do not wish to receive cookies or want to be informed of their use may configure your browser accordingly') + '. ');
		document.write('<br/><br/><h6>' + translate_sentence('10.- INTELLECTUAL PROPERTY AND COPYRIGHT') + '</h6>');
		document.write(translate_sentence('The Site declares that unless otherwise indicated in the Site, text, images, illustrations, designs, icons, photographs, video clips, sound clips and other materials found on the Site and any other intellectual creations and / or inventions or scientific and technical discoveries, whatever their commercial or industrial application (from here on  collectively named "Content") have been created or invented by the Site or transferred, licensed, transmitted or authorized by the owners and / or assignees') + '. ');
		document.write(translate_sentence('The User agrees not to remove or alter any distinctive sign used on the Site, including, but not be limited, brand names, trademarks (graphics, logos, etc), the "copyright" and other data identifying the rights of the Site or third parties on the Website') + '. ');
		document.write(translate_sentence('The Site own all rights over any works, inventions, discoveries, patents, ideas, concepts, updates and improvements related to the Site,  systems, applications and programs or services provided by the Site, which are created , made, developed or implemented first by the Site either alone or with the help of users of the Site, during or as a result of a design, development or other activity performed in accordance with the Contract') + '. ');
		document.write(translate_sentence('You may not use the name, trademarks, symbols, logos or distinctive signs of ownership by the Site without the express written consent of the latter') + '. ');
		document.write(translate_sentence('In the event that any user or third party considers that any of the content on the site is in violation of copyright or other rights of intellectual property protection, please notify us at') + ': ' + company_email + '. ');
		document.write('<br/><br/><h6>' + translate_sentence('11.- JURISDICTION AND LAW') + '</h6>');
		document.write(translate_sentence('The Terms of Use that are in this Agreement are governed by law. Both the Site and the users of the Site agree that any dispute that may arise regarding the interpretation, compliance and / or enforcement of these rules shall be subject to the jurisdiction of the Courts and Tribunals , with expressly waive any other jurisdiction that may correspond') + '. ');
		document.write(translate_sentence('</div>'));	//Justify
	}
}
//Show Legal notice automatic content

//Show the signature static pages
function show_signature_static_page() {
	if (checksameurl(location.href, checkoutpage) == false) {	// We discard the checkout
		if (selected_language == 'en') {
			document.write('<br/>' + company_name + ' ' + translate_sentence('team') + '.<br/><br/>');
		} else {
			document.write('<br/>' + translate_sentence('team') + ' ' + company_name + '.<br/><br/>');
		}
	}
}
//Show the signature static pages
