/****************************************************************************************

Item functions (JO2)

****************************************************************************************/

//----------------------------------- BREADCRUMBS -----------------------------------

//Get product labels
function get_product_labels() {
	var label_name = [];
	var label_path = [];
	for (var i = 0; i < numlabels; i++) {
		label_name.push(document.getElementById('namelabel-' + i).innerHTML);
		label_path.push(document.getElementById('urllabel-' + i).innerHTML);
	}
	return [label_name, label_path];
}
//Get product labels

//Show breadcrumb labels
function show_breadcrumb_labels() {
	var product_labels = get_product_labels();
	for (var i = 0; i < numlabels; i++) {
		document.write('<a href="' + product_labels[1][i] + '">' + translate_sentence(removelatspaces(product_labels[0][i]).capitalize()) + ' </a>');
	}
}
//Show breadcrumb labels

//----------------------------------- PRODUCT FUNCTIONS -----------------------------------

//Gallery slider
function set_product_slider() {
	Galleria.run('#galleria');
	Galleria.configure({
		transition: 'flash',
		lightbox: true,
		showCounter: false,
		showInfo: false,
		autoplay: 7000,
		debug: false,
		imageMargin: 10,
		imagePosition: 'center center',
		pauseOnInteraction: true,
	});
}
//Gallery slider

//Show galleria
function show_galleria() {
	get_product_product_image_paths();
	if (product_image_paths !== false) {
		set_product_slider();
		document.write("<div id='galleria' class='item_image'>");
		for (var i = 0; i < product_image_paths.length; i++) {
			document.write("<img src='" + product_image_paths[i] + "'>");
		}
		document.write("</div>");
		document.write('<img class="hide item_thumb" src="' + product_image_paths[0] + '">');	//Image for cart
		
		Galleria.ready(function() {	 //Set ALT and TITLE image attributes
		  this.bind('thumbnail', function(e) {
			e.galleriaData.title = translate_sentence(posttitle);
			e.thumbTarget.alt = e.galleriaData.title + ' ' + blog_title;
		  });
		});
	}
}
//Show galleria

//Show product social counts
function show_product_social_counts() {
	document.write("<table class='social-counts'><td><center><div class='g-plusone' data-size='medium'></div>");
	document.write("<a class='twitter-share-button' data-lang='en' href='https://twitter.com/share'>Tweet</a>");
	document.write("<div class='fb-like' data-action='like' data-layout='button_count' data-share='false' data-show-faces='false'></div></center></td></table>");
}
//Show product social counts

//Get the product brand
function get_product_brand() {
	var filter_list = filter_names[2].slice(1);
	var urllabel = false;
	for (var i = 0; i < numlabels; i++) {
		for (var j = 0; j < filter_list.length; j++) {
			var namelabel = removelatspaces(document.getElementById('namelabel-' + i).innerHTML);
			var namebrand = removelatspaces(filter_list[j]);
			if (namebrand.toLowerCase() == namelabel.toLowerCase() && namebrand !== '' && typeof (namebrand === 'string')) {
				var urllabel = document.getElementById('urllabel-' + i).innerHTML;
				return [translate_sentence(namebrand.capitalize()), urllabel];
			}
		}
	}
	if (urllabel === false) { return false; }
}
//Get the product brand

//Get and show the product brand
function show_product_brand() {
	if (show_prod_collection_text === true) {
		var product_brand = get_product_brand();
		if (product_brand !== false) {
			document.write('<center><a title="' + translate_sentence('See this collection') + '" class="product-brand" href="' + product_brand[1] + '">');
			if (selected_language == 'es' || selected_language == 'fr') {
				document.write('<h3>' + translate_sentence('Collection') + ' ' + translate_sentence(product_brand[0]) + '</h3></a></center>');
			} else { document.write('<h3>' + translate_sentence(product_brand[0]) + ' collection</h3></a></center>'); }
		}
	}
}
//Get and show the product brand

//Get and show the current price, discount price and offer
function show_product_price() {
	currentprice = extract_value(postbody, 'Current price:', '<br');
	discountprice = extract_value(postbody, 'Discount price:', '<br');
	if (parseFloat(discountprice) > 0 && parseFloat(discountprice) < parseFloat(currentprice)) {
		var discpercentage = (100-((100*discountprice)/currentprice)).toFixed(0);
		document.write('<table class="prices"><tr><td rowspan=2 class="text">' + translate_sentence('Price') + ':</td>');
		document.write('<td rowspan=2 class="final-price">' + format_currency(discountprice) + '</td><td class="off">');
		document.write('<div class="item_price hide">' + discountprice + '</div>');	//The price must be in USD for checkout.
		if (selected_language == 'es') {document.write('&#161;');}
		document.write(discpercentage + '% ' + translate_sentence('OFF') + '!</td></tr><tr><td class="off"><s>' + format_currency(currentprice) + '</s></td></tr></table>');
	} else {
		document.write('<div class="prices"><center><table><td class="text">' + translate_sentence('Price') + ':</td>');
		document.write('<td class="final-price">' + format_currency(currentprice) + '<td></table></center></div>');
		document.write('<div class="item_price hide">' + currentprice + '</div>');	//The price must be in USD for checkout.
	}
}
//Get and show the current price, discount price and offer

//Get and show the stock
function show_product_stock() {
	product_stock = false;	//Infinite stock
	if (postbody.match(/Stock:/gi)){
		product_stock = parseFloat(extract_value(postbody, 'Stock:', '<br'));
		if (product_stock > 0 && product_stock < 6) {
			if (product_stock == 1) { var unitst = translate_sentence('unit!'); }
			else {var unitst = translate_sentence('units!'); }
			document.write('<div class="qty_num">');
			if (selected_language == 'es') {document.write('&#161;');}
			document.write(product_stock + ' ' + unitst + ' ' + translate_sentence('Hurry up!') + '</div>');
		} else if (product_stock < 1) {
			document.write('<style>.post-availability {display: none;}</style><div class="sold_out">' + translate_sentence('Sold out') + '</div>');
		}
	}
}
//Get and show the stock

//Show product added button
function show_product_added() {
	document.write('<center><div id="product-added"><div id="disable-button">' + translate_sentence('Product added') + '</div></div></center>');
}
//Show product added button

//Get and show the colors
function show_product_colors() {
	if (postbody.match(cat_name_1 + ':')){
		product_colors = extract_list(postbody, cat_name_1 + ':', '<br');
		if (product_colors !== false) { 
			document.write(translate_sentence(cat_name_1) + ': <select class="item_color">');
			for (var i = 0; i < product_colors.length; i++) {
				icolor = translate_sentence(removelatspaces(product_colors[i]).capitalize());
				document.write('<option value="' + icolor + '">' + icolor + '</option>');
			}
			document.write('</select><br/>');
		}
	} else { document.write('<select class="item_color" style="display: none;"><option value="-">-</option></select>'); }
}
//Get and show the colors

//Get and show the sizes
function show_product_sizes() {
	if (postbody.match(cat_name_2 + ':')){
		product_sizes = extract_list(postbody, cat_name_2 + ':', '<br');
		if (product_sizes !== false) { 
			document.write(translate_sentence(cat_name_2) + ': <select class="item_size">');
			for (var i = 0; i < product_sizes.length; i++) {
				if (cat_name_2 === 'Sizes' || cat_name_2 === 'Size') {
					size = translate_sentence(product_sizes[i].toUpperCase());
				} else {
					size = translate_sentence(product_sizes[i].capitalize());
				}
				document.write('<option value="' + size + '">' + size + '</option>');
			}
			document.write('</select><br/>');
		}
	} else { document.write('<select class="item_size" style="display: none;"><option value="-">-</option></select>'); }
}
//Get and show the sizes

//Get and show the item description
function show_product_description() {
	if (postbody.match(/Description:/gi)){
		product_description = extract_text(postbody, 'Description:', '<!--');
		if (show_if_enabled(product_description) !== false) {
			document.write('<div class="item_description"><center><b>' + translate_sentence('Description') + '</b></center><br/>' + translate_sentence(product_description) + '</div>');
		}
	}	
}
//Get and show the item description

//Show the item info
function show_item_info() {
	document.write('<div class="item-info">');
		if (free_shipping_from > 0){
			document.write('* ' + translate_sentence('If your purchase is over') + ' ' + format_currency(free_shipping_from)+ ', ');
			document.write(translate_sentence('your shipping will be free!'));
		}
		if (certified_shipping == true) {
			document.write('<br/>* ' + translate_sentence('Your packet will be sent with tracking number if you order it on checkout.'));
		}
		document.write('<br/>* ' + translate_sentence('Refund in case of lost or defect. See our') + ' ');
		showpagelink(satisfactionpolicypage, translate_sentence('satisfaction policy.'));
		document.write('<br/>* ' + translate_sentence('Do you have any question?') + ' ');
		showpagelink(contactuspage, translate_sentence('Contact us!'));
	document.write('</div>');
}
//Show the item info

//Show the quantity
function show_qty_box() {
	document.write(translate_sentence('Quantity') + ': <input class="item_Quantity" type="text" value="1"/><br/></div></center>');
}
//Show the quantity

//----------------------------------- FACEBOOK COMMENT BOX -----------------------------------

function facebook_comment_box() {
	if (facebook_product_comments === true) {
		document.write('<center><div class="fb-comments" data-colorscheme="light" data-numposts="5" data-href="' + location.href + '"></div></center>')
	}
}

//----------------------------------- RELATED PRODUCTS -----------------------------------

var relatedTitles = new Array();
var relatedUrls = new Array();
var relatedpSummary = new Array();
var relatedTitlesNum = 0;
var relatedPostsNum = 8; // number of entries to be shown

function readpostlabels(json) {
  var entry, postcontent, cat;
  for (var i = 0; i < json.feed.entry.length; i++) {
    entry = json.feed.entry[i];
    if (i==json.feed.entry.length) { break; }
    relatedTitles[relatedTitlesNum] = entry.title.$t;
    postcontent = "";
    if ("content" in entry) { postcontent = entry.content.$t; }
	else if ("summary" in entry) { postcontent = entry.summary.$t; }
    relatedpSummary[relatedTitlesNum] = postcontent;
    for (var k = 0; k < entry.link.length; k++) {
      if (entry.link[k].rel == 'alternate') {
        relatedUrls[relatedTitlesNum] = entry.link[k].href;
        break;
      }
    }
    relatedTitlesNum++;
  }
}

function show_related_products() {
	var posttitle = document.getElementById('posttitle').innerHTML;
	var tmp = new Array(0);
	var tmp2 = new Array(0);
	var tmp3 = new Array(0);
	for(var i = 0; i < relatedUrls.length; i++) {
		if(!contains(tmp, relatedUrls[i])) {
		  tmp.length += 1; tmp[tmp.length - 1] = relatedUrls[i];
		  tmp2.length += 1; tmp2[tmp2.length - 1] = relatedTitles[i];
		  tmp3.length += 1; tmp3[tmp3.length - 1] = relatedpSummary[i];
		}
	}
	relatedTitles = tmp2; relatedUrls = tmp; relatedpSummary = tmp3;
	for(var i = 0; i < relatedTitles.length; i++){
		var index = Math.floor((relatedTitles.length - 1) * Math.random());
		var tempTitle = relatedTitles[i]; var tempUrls = relatedUrls[i];
		var tempResum = relatedpSummary[i];
		relatedTitles[i] = relatedTitles[index]; relatedUrls[i] = relatedUrls[index];
		relatedpSummary[i] = relatedpSummary[index];
		relatedTitles[index] = tempTitle; relatedUrls[index] = tempUrls;
		relatedpSummary[index] = tempResum;
	}
	var somePosts = 0;
	var r = Math.floor((relatedTitles.length - 1) * Math.random());
	var relsump = r; 
	var output;
	var dirURL = document.URL;

	if (relatedUrls.length > 0) {
		document.write('<div id="related-posts"><div class="post-footer-line post-footer-line-4"><h3>' + translate_sentence('You might also like...') + '</h3>');
		while (somePosts < relatedPostsNum) {
			if (relatedUrls[r] != dirURL && relatedTitles[r] != posttitle) {

				// Get main image
				var str1 = relatedpSummary[r].substring(relatedpSummary[r].indexOf('http'));
				var pos2 = str1.indexOf('/>');
				var mainimage = str1.substring(0, pos2).replace('"','');
						
				document.write('<div class="related-items">');
				document.write('<center><a href="' + relatedUrls[r] + '" class="related-post-title"><h3>' + translate_sentence(relatedTitles[r]) + '</h3></a></center>');
				document.write('<center><div class="related-image"><a href="' + relatedUrls[r] + '" title="' + translate_sentence(relatedTitles[r]) + '"><img alt="' + translate_sentence(relatedTitles[r]) + '" src="' + mainimage + '" /></a></div></center>');
				
				// Get and show the hex colors
				showhexcolors(relatedpSummary[r]);
				
				// Get prices
				currentprice = extract_value(relatedpSummary[r], 'Current price:', '<br');
				discountprice = extract_value(relatedpSummary[r], 'Discount price:', '<br');
				if (parseFloat(discountprice) > 0 && parseFloat(discountprice) < parseFloat(currentprice)) {
					var discpercentage = (100-((100*discountprice)/currentprice)).toFixed(0);
					document.write('<div class="little-prices"><center>' +  format_currency(discountprice) + ' (-' + discpercentage + '%)</center></div>');
				} else {
					document.write('<div class="little-prices"><center>' + format_currency(currentprice) + '</center></div>');
				}	
				document.write('</div>');
				
				somePosts++;
				if (somePosts == relatedPostsNum) { break; }
			}
			if (r < relatedTitles.length - 1) {r++;
			} else {r = 0;}
			if(r==relsump) { break; }
		}
		document.write('</div><div style="clear:both;"></div></div>');
	}
}

function contains(a, e) {
  for(var j = 0; j < a.length; j++) if (a[j]==e) return true;
  return false;
}
//Related products

//----------------------------------- MANAGEMENT FUNCTIONS -----------------------------------

//Get and show the SKU
function show_product_sku() {
	document.write('<p>' + translate_sentence('Management info') + '</p>');
	if (postbody.match(/SKU:/gi)){
		SKU = extract_text(postbody, 'SKU:', '<br');
		if (SKU !== '' && SKU.length > 1) { document.write(translate_sentence('SKU') + ': <span class="item_number">' + SKU + '</span>'); }
	}
}
//Get and show the SKU

//Get and show the stock
function show_product_stock_admin() {
	if (product_stock !== false){
		document.write('<br>' + translate_sentence('Stock') + ': ' + product_stock + ' ');
		if (product_stock == 1) { show_translated_sentence('unit'); }
		else { show_translated_sentence('units'); }
	} else { document.write('<br>' + translate_sentence('Stock') + ': Infinite'); }
}
//Get and show the stock

//Get and show the supplier
function show_product_supplier() {
	if (postbody.match(/Supplier:/gi)){
		supplier = extract_text(postbody, 'Supplier:', '<br');
		if (supplier.length > 0 && typeof (supplier) === 'string'){
			document.write('<br>' + translate_sentence('Supplier') + ': ' + supplier);
			if (postbody.match(/Supplier website:/gi)){
				supplierweb = extract_text(postbody, 'Supplier website:', '<br');
				if (supplierweb.length > 0 && typeof (supplierweb) === 'string'){
					document.write(' (<a target="_blank" href="' + supplierweb + '">' + translate_sentence('See website') + '</a>)');
				}
			}
		}
	}
}
//Get and show the supplier

//Get and show the supplier price
function show_product_supplier_price() {
	if (postbody.match(/Supplier price:/gi)){
		supplier_price = extract_text(postbody, 'Supplier price:', '<br');
		if (!isNaN(supplier_price) && supplier_price !== null && supplier_price !== ''){
			document.write('<br>' + translate_sentence('Supplier price') + ': ' + format_currency(supplier_price));
		}
	}
}
//Get and show the supplier price

//Get and show the profit
function show_product_profit() {
	if (postbody.match(/Supplier price:/gi) && !isNaN(supplier_price)){
		supplier_price = extract_text(postbody, 'Supplier price:', '<br');
		if (parseFloat(discountprice) > 0 && parseFloat(discountprice) < parseFloat(currentprice)) { total = discountprice - supplier_price; }
		else { total = currentprice - supplier_price; }
		document.write('<br>' + translate_sentence('Profit') + ': ' + format_currency(total));
	}
}
//Get and show the profit

//Get and show the product weight
function show_product_weight() {
	if (postbody.match(/Product weight:/gi)){
		weight = extract_text(postbody, 'Product weight:', '<br');
		if (isNaN(weight) || weight === null || weight === ''){ weight = 0; }
		document.write('<br>' + translate_sentence('Product weight') + ': <span class="item_weight">' + weight + '</span>g');
	}
}
//Get and show the product weight

//Get and show the post author
function show_post_author() {
	var postauthor = document.getElementById('postauthor').innerHTML;
	document.write('<br>' + translate_sentence('Posted by') + ': ' + postauthor);
}
//Get and show the post author

//Get and show the item creation date
function show_product_date() {
	var timestamp = document.getElementById('timestamp').innerHTML;
	document.write('<br>' + translate_sentence('Date: ') + timestamp.replace('T', ' ').replace('+', ' GMT+').replace('Z', ''));
}
//Get and show the item creation date

//Get and show the edit product button
function show_edit_button() {
	var posteditUrl = document.getElementById('posteditUrl').innerHTML;
	document.write('<center><a href="' + posteditUrl + '" target="_blank"><div class="edit-button">' + translate_sentence('Edit product') + '</div></a></center>');
}
//Get and show the edit product button