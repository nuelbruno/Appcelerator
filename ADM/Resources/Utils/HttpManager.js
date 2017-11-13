function HttpManager() {

	

	function hasConnection() {
		if (Ti.Network.online == false) {
			Ti.App.ShowAlert('Network Error', 'No Internet Connection');
			return false;
		}
		return true;
	}

	function callserviceSOAP(name, paramKeys, paramValues, url, soapAction, callback) {

		if (hasConnection() == false) {
			return;
		}

		var message = '<?xml version="1.0" encoding="utf-8"?>';
		message = message + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns="http://tempuri.org/">';
		message = message + '<soap:Header/>';
		message = message + '<soap:Body><' + name + " xmlns='http://ecabcall.org/'>";

		Ti.API.log('total keys' + paramKeys.length);
		Ti.API.log('total values' + paramValues.length);

		for (var i = 0; i < paramKeys.length; i++) {
			var key = paramKeys[i];
			var val = paramValues[i];
			message = message + '<' + key + '>' + val + '</' + key + '>';

			Ti.API.log(key + ":" + val);
		}
		message = message + '</' + name + '></soap:Body></soap:Envelope>';

		Ti.API.log(message);

		var request = Titanium.Network.createHTTPClient();
		request.onload = function() {
			Titanium.API.error('Success : ResponseText: ' + this.responseText);
			callback(this.responseText);
			Ti.App.hideLoading();
		};
		request.onerror = function(e) {
			Titanium.API.error('Status: ' + this.status);
			Titanium.API.error('ResponseText: ' + this.responseText);
			Titanium.API.error('connectionType: ' + this.connectionType);
			Titanium.API.error('location: ' + this.location);

			Ti.App.hideLoading();

			if (request.status != 200) {
				Ti.App.ShowAlert('Error', "The service is currently unavailable. Please Try Again Later");
				return;
			}
		};
		request.open("POST", url);
		request.setRequestHeader("enctype", "multipart/form-data");
		request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		request.setRequestHeader('SOAPAction', soapAction);
		request.send(message);

	}

	function getWCFMessge(name, paramKeys, paramValues) {

		var message = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns="http://tempuri.org/">';
		message = message + '<soap:Header/>';
		message = message + '<soap:Body><' + name + ">";

		for (var i = 0; i < paramKeys.length; i++) {
			var key = paramKeys[i];
			var val = paramValues[i];
			message = message + '<' + key + '>' + val + '</' + key + '>';
		}
		message = message + '</' + name + '></soap:Body></soap:Envelope>';

		return message;
	}

	function getXHRForWCF(url, soapAction) {

		var request = Titanium.Network.createHTTPClient();

		request.open("POST", url);
		request.setRequestHeader("enctype", "multipart/form-data");
		request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		request.setRequestHeader('SOAPAction', soapAction);

		return request;
	}
	
	
	
	this.webserviceMyland = function(callBackFunction)
	{
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
			
			values = [1, 15];
			keyName_newsf = 'GetLatestNewsResponse';
			hasZoneNo = true;
			
		
		
			var request = getXHRForWCF(url, soapAction);
		
			var message = getWCFMessge(name, params, values);
		
			request.onload = function() {
				try {  
		              
		            var sections = [];           
					var xml = Ti.XML.parseString(this.responseText);
					var ameen_news = xml.documentElement.getElementsByTagName(keyName_newsf);
		
					//Titanium.API.log('ResponseText: ' + ameen_news.item(0).text);
		
					var ameen_newstext = ameen_news.item(0).text;
					//alert((metroStationList.item(0).text));
		
					var arr_ameennews = JSON.parse(ameen_newstext);   //alert(arr_ameennews);
					//alert(arrMetrostations);
		
					
						
						
					    callBackFunction(arr_ameennews);	
						
						//return sections;
						
					
		
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
	}
	
	
	this.webserviceMyzone= function(callBackFunction)
	{
		var webservice_url = 'http://demoserver.tacme.net:3030/';
			// ##################### CALLING SERVICE NEWS FETCH ################################################# //
			var url = '';
			var soapAction = '';
			var name = '';
			var category = '';
			var params = [];
			var values = [];
			var keyName = '';
			
			url = webservice_url + 'AlameenMobile/WeblinksService.svc';
			//Ti.App.MetroStationURL
			soapAction = 'http://tempuri.org/IWebLinksService/GetWebLinksByCategoryUniqueName';
			name = 'GetWebLinksByCategoryUniqueName';
			params = ['LangID', 'CatUniqueName', 'ItemCount'];
			//values = [coord.latitude, coord.longitude, '50'];
			
			values = [1, 'general', 15];
			keyName_cat = 'GetWebLinksByCategoryUniqueNameResponse';
			hasZoneNo = true;
			
			var request = getXHRForWCF(url, soapAction);
			
			var message = getWCFMessge(name, params, values);
		
			request.onload = function() {
				try {  
		              
		            var sections = [];           
					var xml = Ti.XML.parseString(this.responseText);
					var ameen_news = xml.documentElement.getElementsByTagName(keyName_cat);
		
					//Titanium.API.log('ResponseText: ' + ameen_news.item(0).text);
		
					var ameen_newstext = ameen_news.item(0).text;
					//alert((metroStationList.item(0).text));
		
					var arr_ameennews = JSON.parse(ameen_newstext);   //alert(arr_ameennews);
					//alert(arrMetrostations);
		
					
						
						
					callBackFunction(arr_ameennews);	
						
						//return sections;
						
					
		
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
	}
	
	this.webserviceMyplot= function(callBackFunction)
	{
		var webservice_url = 'http://demoserver.tacme.net:3030/';
			// ##################### CALLING SERVICE NEWS FETCH ################################################# //
			var url = '';
			var soapAction = '';
			var name = '';
			var category = '';
			var params = [];
			var values = [];
			var keyName = '';
			
			url = webservice_url + 'AlameenMobile/WeblinksService.svc';
			//Ti.App.MetroStationURL
			soapAction = 'http://tempuri.org/IWebLinksService/GetWebLinksByCategoryUniqueName';
			name = 'GetWebLinksByCategoryUniqueName';
			params = ['LangID', 'CatUniqueName', 'ItemCount'];
			//values = [coord.latitude, coord.longitude, '50'];
			
			values = [1, 'general', 15];
			keyName_cat = 'GetWebLinksByCategoryUniqueNameResponse';
			hasZoneNo = true;
			
			var request = getXHRForWCF(url, soapAction);
			
			var message = getWCFMessge(name, params, values);
		
			request.onload = function() {
				try {  
		              
		            var sections = [];           
					var xml = Ti.XML.parseString(this.responseText);
					var ameen_news = xml.documentElement.getElementsByTagName(keyName_cat);
		
					//Titanium.API.log('ResponseText: ' + ameen_news.item(0).text);
		
					var ameen_newstext = ameen_news.item(0).text;
					//alert((metroStationList.item(0).text));
		
					var arr_ameennews = JSON.parse(ameen_newstext);   //alert(arr_ameennews);
					//alert(arrMetrostations);
		
					
						
						
					callBackFunction(arr_ameennews);	
						
						//return sections;
						
					
		
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
	}
	
	

	
};

module.exports = HttpManager;
