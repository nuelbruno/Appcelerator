
var webservie_Myland = function() {

	var webservice_url = 'http://demoserver.tacme.net:3030/';
	// ##################### CALLING SERVICE NEWS FETCH ################################################# //
	var url = '';
	var soapAction = '';
	var name = '';
	var category = '';
	var params = [];
	var values = [];
	var keyName = '';

	url =  webservice_url+'AlameenMobile/NewsService.svc';
	//Ti.App.MetroStationURL
	soapAction = 'http://tempuri.org/INewsService/GetLatestNews';
	name = 'GetLatestNews';
	params = ['LangID', 'ItemCount'];
	//values = [coord.latitude, coord.longitude, '50'];
	
	values = [Ti.App.languageid, 15];
	keyName_newsf = 'GetLatestNewsResponse';
	hasZoneNo = true;
	
    var HttpManager = require(L('HttpManager'));
    var httpManager = new HttpManager();

	var request = httpManager.getXHRForWCF(url, soapAction);

	var message = httpManagergetWCFMessge(name, params, values);

	request.onload = function() {
		try {  
                       
			var xml = Ti.XML.parseString(this.responseText);
			var ameen_news = xml.documentElement.getElementsByTagName(keyName_newsf);

			//Titanium.API.log('ResponseText: ' + ameen_news.item(0).text);

			var ameen_newstext = ameen_news.item(0).text;
			//alert((metroStationList.item(0).text));

			var arr_ameennews = JSON.parse(ameen_newstext);   //alert(arr_ameennews);
			//alert(arrMetrostations);

			for (var i = 0; i < arr_ameennews.length; i++) {
				
				var curentItem = arr_ameennews[i];
				
				var imagesText = curentItem.Images; //alert(imagesText);
				
				
				var sections = [];
	
				for(var i=0;i<curentItem.length; i++)
				{
					 sections.push({
				       template:'template',
				       title: {text:curentItem.Headline},
				       properties : {
				            itemId: curentItem.UniqueName,
				            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
				        }
				    });
				}
			}	
				
				
				
				return sections;
				
			

		} catch(e) {
			Ti.API.log('EXC : ' + e);
		}
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);
		//Ti.App.hideLoading();
		if (request.status != 200) {

			Ti.API.log("The service is currently unavailable. Please Try Again Later");
			return;
		}
	};
	request.send(message);
	
	

}();
module.exports = webservie_Myland;