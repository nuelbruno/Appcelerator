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

		 var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
   
		 message = message + '<soapenv:Header/>';
		 message = message + '<soapenv:Body><tem:' + name + ">";

		 for (var i = 0; i < paramKeys.length; i++) {
			 var key = paramKeys[i];
			 var val = paramValues[i];
			message = message + '<tem:' + key + '>' + val + '</tem:' + key + '>';
		 }
		 message = message + '</tem:' + name + '></soapenv:Body></soapenv:Envelope>';
 
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
		   //var webservice_url = 'http://demoserver.tacme.net:3030/';
			// ##################### CALLING SERVICE NEWS FETCH ################################################# //
			var url = '';
			var soapAction = '';
			var name = '';
			var category = '';
			var params = [];
			var values = [];
			var keyName = '';
			
			var langSet = (Ti.App.LanguageId == 1)? 'ENG' :'ARA';
			
			Ti.App.showLoading(L('Loading'), false);
		
			url =  Ti.App.webserviceURL+'sddmobservices/SDDMOBSERVICES.svc?wsdl';
			//Ti.App.MetroStationURL ARA
			soapAction = 'http://tempuri.org/ISDDMOBSERVICES/Get_Zones';
			name = 'Get_Zones';
			params = ['Output_Language', 'Token'];
			
			values = [langSet, 'GoVyM/I7hy46x3K6GBFCJiWiTJiC3kM9zsH1a4+WltY='];
			keyName_newsf = 'Get_ZonesResponse';
			hasZoneNo = true;
			
			var request = getXHRForWCF(url, soapAction);
		
			var message = getWCFMessge(name, params, values);
		
			request.onload = function() {
				try {  
		              
		           var xml = Ti.XML.parseString(this.responseText); //alert(xml);
		           var zoneListarray = xml.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('Get_ZonesResponse').item(0).getElementsByTagName('Get_ZonesResult').item(0).getElementsByTagName('a:Results').item(0).getElementsByTagName('b:string');
			
					//alert(zoneListarray.length);	
					Ti.App.hideLoading();
				    callBackFunction(zoneListarray);	
						
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
				Ti.App.hideLoading();
				//Ti.App.hideLoading();
				if (request.status != 200) {
		
					Ti.API.log("The service is currently unavailable. Please Try Again Later");
					return;
				}
			};
			request.send(message);
	};
	
	
	this.webserviceMyzone= function(uniq_id, callBackFunction)
	{
		    //var webservice_url = 'http://demoserver.tacme.net:3030/';
			// ##################### CALLING SERVICE NEWS FETCH ################################################# //
			var url = '';
			var soapAction = '';
			var name = '';
			var category = '';
			var params = [];
			var values = [];
			var keyName = '';
			var langSet = (Ti.App.LanguageId == 1)? 'ENG' :'ARA';
			
			Ti.App.showLoading(L('Loading'), false);
			
			url =  Ti.App.webserviceURL+'sddmobservices/SDDMOBSERVICES.svc?wsdl';
			//Ti.App.MetroStationURL
			soapAction = 'http://tempuri.org/ISDDMOBSERVICES/Get_Sectors';
			name = 'Get_Sectors';
			params = ['ZoneName', 'Token'];
			//values = [coord.latitude, coord.longitude, '50'];
			
			values = [Ti.App.areaname, 'GoVyM/I7hy46x3K6GBFCJiWiTJiC3kM9zsH1a4+WltY='];
			keyName_cat = 'GetWebLinksByCategoryUniqueNameResponse';
			hasZoneNo = true;
			
			var request = getXHRForWCF(url, soapAction);
			
			var message = getWCFMessge(name, params, values);
		
			request.onload = function() {
				try {  
		              
		            var xml = Ti.XML.parseString(this.responseText); //alert(xml);
		            var sectorListarray = xml.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('Get_SectorsResponse').item(0).getElementsByTagName('Get_SectorsResult').item(0).getElementsByTagName('a:Results').item(0).getElementsByTagName('b:string');
			
					//alert(zoneListarray.length);	
					Ti.App.hideLoading();
				    callBackFunction(sectorListarray);	
						
						//return sections;
				} catch(e) {
					Ti.API.log('EXC : ' + e);
				}
			};
			request.onerror = function(e) {
				Ti.App.hideLoading();
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
	};
	
	this.webserviceMyplot= function(uniq_id,callBackFunction)
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
			
			Ti.App.showLoading(L('Loading'), false);
			
			url =  Ti.App.webserviceURL+'sddmobservices/SDDMOBSERVICES.svc?wsdl';
			//Ti.App.MetroStationURL
			soapAction = 'http://tempuri.org/ISDDMOBSERVICES/Get_Plots';
			name = 'Get_Plots';
			params = ['SectorNumber', 'Token'];
			//values = [coord.latitude, coord.longitude, '50'];
			
			values = [uniq_id, 'GoVyM/I7hy46x3K6GBFCJiWiTJiC3kM9zsH1a4+WltY='];
			keyName_cat = 'GetWebLinksByCategoryUniqueNameResponse';
			hasZoneNo = true;
			
			var request = getXHRForWCF(url, soapAction);
			
			var message = getWCFMessge(name, params, values);
		
			request.onload = function() {
				try {  
		              
		            var xml = Ti.XML.parseString(this.responseText); //alert(xml);
		            var sectorListarray = xml.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('Get_PlotsResponse').item(0).getElementsByTagName('Get_PlotsResult').item(0).getElementsByTagName('a:Results').item(0).getElementsByTagName('b:string');
			
					//alert(zoneListarray.length);	
					Ti.App.hideLoading();
				    callBackFunction(sectorListarray);	
		
				} catch(e) {
					Ti.API.log('EXC : ' + e);
					Ti.App.hideLoading();
				}
			};
			request.onerror = function(e) {
				Ti.App.hideLoading();
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
	};
	
	this.webserMapfinal= function(plotnum, sectionnum ,callBackFunction)
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
			
			Ti.App.showLoading(L('Loading'), false);
			
			url =  Ti.App.webserviceURL+'sddmobservices/SDDMOBSERVICES.svc?wsdl';
			//Ti.App.MetroStationURL
			soapAction = 'http://tempuri.org/ISDDMOBSERVICES/Get_Plot_Info';
			name = 'Get_Plot_Info';
			params = ['SectorNumber', 'PlotNumber', 'Token'];
			values = [ 'Abu Al Abyad Island', 'AUH2496' , 'GoVyM/I7hy46x3K6GBFCJiWiTJiC3kM9zsH1a4+WltY='];
			
			//values = [sectionnum, plotnum];
			keyName_cat = 'GetWebLinksByCategoryUniqueNameResponse';
			hasZoneNo = true;
			
			var request = getXHRForWCF(url, soapAction);
			
			var message = getWCFMessge(name, params, values);
		
			request.onload = function() {
				try {  
		              
		            var xml_map = Ti.XML.parseString(this.responseText); //alert(xml);
		            var finalMaparray = xml_map.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('Get_Plot_InfoResponse').item(0).getElementsByTagName('Get_Plot_InfoResult');
			
					//alert(finalMaparray.item(0).getElementsByTagName('a:AreaSQRM').item(0).text);	
					Ti.App.hideLoading();
				    callBackFunction(finalMaparray);	
		
				} catch(e) {
					Ti.App.hideLoading();
					Ti.API.log('EXC : ' + e);
				}
			};
			request.onerror = function(e) {
				Titanium.API.error('Status: ' + this.status);
				Titanium.API.error('ResponseText: ' + this.responseText);
				Titanium.API.error('connectionType: ' + this.connectionType);
				Titanium.API.error('location: ' + this.location);
				Ti.App.hideLoading();
				//Ti.App.hideLoading();
				if (request.status != 200) {
		
					Ti.API.log("The service is currently unavailable. Please Try Again Later");
					return;
				}
			};
			request.send(message);
	};
	

	function callserviceWCF(name, paramKeys, paramValues, url, soapAction, callback) {

		if (hasConnection() == false) {
			return;
		}

		Ti.App.showLoading(L('Loading'), false);


		var message = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns="http://tempuri.org/">';
		message = message + '<soap:Header/>';
		message = message + '<soap:Body><' + name + ">";

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
			Ti.App.hideLoading();
		};
		request.onerror = function(e) {
			Ti.App.hideLoading();
			Titanium.API.error('Status: ' + this.status);
			Titanium.API.error('ResponseText: ' + this.responseText);
			Titanium.API.error('connectionType: ' + this.connectionType);
			Titanium.API.error('location: ' + this.location);

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
    this.getNewsList = function(callBackFunction) {

		if (hasConnection() == false) {
			return;
		}

		Ti.App.showLoading(L('Loading'), false);

		var url = Ti.App.NewsServiceURL;
		var soapAction = 'http://tempuri.org/INewsService/GetNewsBySearch';
		var name = 'GetNewsBySearch';
		var params = ['websiteID','languageID'];
		var values = [Ti.App.WebsiteId,Ti.App.LanguageId];
		
		// < ---------- bru edit ------- >
		//var params = ['websiteID','languageID', 'keyword'];
		//var values = [Ti.App.WebsiteId,Ti.App.LanguageId , ' '];

		var request = getXHRForWCF(url, soapAction);

		var message = getWCFMessge(name, params, values);

		Ti.API.log('message ' + message);

		request.onload = function() {

			

			Titanium.API.log('Success : ResponseText: ' + this.responseText);

			var xml = Ti.XML.parseString(this.responseText);

			//var resultList = xml.documentElement.getElementsByTagName("GetNewsBySearchResponse");
			var resultList =  xml.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('GetNewsBySearchResponse').item(0).getElementsByTagName('a:NewsView');

			//alert(resultList.length);

			//var newsList = JSON.parse(resultList.item(0).text);

			Ti.App.hideLoading();

			callBackFunction(resultList);
		};

		request.onerror = function(e) {
			Ti.App.hideLoading();
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

		request.send(message);
	};
	
	this.getNewsDetailsByUniqueName = function(uniqueName,callBackFunction) {

		if (hasConnection() == false) {
			return;
		}

		Ti.App.showLoading(L('Loading'), false);

		var url = Ti.App.NewsServiceURL;
		var soapAction = 'http://tempuri.org/INewsService/GetNewsByUniqueName';
		var name = 'GetNewsByUniqueName';
		var params = ['websiteID','languageID','uniqueName'];
		var values = [Ti.App.WebsiteId,Ti.App.LanguageId,uniqueName];

		var request = getXHRForWCF(url, soapAction);

		var message = getWCFMessge(name, params, values);

		Ti.API.log('message ' + message);

		request.onload = function() {

			

			Titanium.API.log('Success : ResponseText: ' + this.responseText);

			var xml = Ti.XML.parseString(this.responseText);

			//var resultList = xml.documentElement.getElementsByTagName("GetNewsBySearchResponse");
			var resultList =  xml.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('GetNewsByUniqueNameResponse').item(0).getElementsByTagName('GetNewsByUniqueNameResult');

			//alert(resultList.length);

			//var newsList = JSON.parse(resultList.item(0).text);

			Ti.App.hideLoading();

			callBackFunction(resultList);
		};

		request.onerror = function(e) {
			Ti.App.hideLoading();
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

		request.send(message);
	};

	this.getGenericContentList = function(categoryUniqueName,callBackFunction) {

		if (hasConnection() == false) {
			return;
		}

		Ti.App.showLoading(L('Loading'), false);

		var url = Ti.App.GenericContentServiceURL;
		var soapAction = 'http://tempuri.org/IGenericContentService/GetGenericContentByCategoryUniqueName';
		var name = 'GetGenericContentByCategoryUniqueName';
		var params = ['websiteID','languageID','uniqueName'];
		var values = [Ti.App.WebsiteId,Ti.App.LanguageId,categoryUniqueName];

		var request = getXHRForWCF(url, soapAction);

		var message = getWCFMessge(name, params, values);

		Ti.API.log('message ' + message);

		request.onload = function() {

			

			Titanium.API.log('Success : ResponseText: ' + this.responseText);

			var xml = Ti.XML.parseString(this.responseText);

			//var resultList = xml.documentElement.getElementsByTagName("GetNewsBySearchResponse");
			var resultList =  xml.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('GetGenericContentByCategoryUniqueNameResponse').item(0).getElementsByTagName('a:GenericContentView');

			//alert(resultList.length);

			//var newsList = JSON.parse(resultList.item(0).text);

			Ti.App.hideLoading();

			callBackFunction(resultList);
		};

		request.onerror = function(e) {
			Ti.App.hideLoading();
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

		request.send(message);
	};

    this.getGenericContentByUniqueName = function(uniqueName,callBackFunction) {

		if (hasConnection() == false) {
			return;
		}

		Ti.App.showLoading(L('Loading'), false);

		var url = Ti.App.GenericContentServiceURL;
		var soapAction = 'http://tempuri.org/IGenericContentService/GetGenericContentByUniqueName';
		var name = 'GetGenericContentByUniqueName';
		var params = ['websiteID','languageID','uniqueName'];
		var values = [Ti.App.WebsiteId,Ti.App.LanguageId,uniqueName];

		var request = getXHRForWCF(url, soapAction);

		var message = getWCFMessge(name, params, values);

		Ti.API.log('message ' + message);

		request.onload = function() {

			

			Titanium.API.log('Success : ResponseText: ' + this.responseText);

			var xml = Ti.XML.parseString(this.responseText);

			//var resultList = xml.documentElement.getElementsByTagName("GetNewsBySearchResponse");
			var resultList =  xml.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('GetGenericContentByUniqueNameResponse').item(0).getElementsByTagName('GetGenericContentByUniqueNameResult');

			//alert(resultList.length);

			//var newsList = JSON.parse(resultList.item(0).text);

			Ti.App.hideLoading();

			callBackFunction(resultList);
		};

		request.onerror = function(e) {
			Ti.App.hideLoading();
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

		request.send(message);
	};
	
	//We are using generic contentmodule to read faqs.Ramesh Dec26,2013.
	this.getFAQservice = function(callBackFunction) {

		if (hasConnection() == false) {
			return;
		}

		Ti.App.showLoading(L('Loading'), false);

		var url = Ti.App.GenericContentServiceURL;//Ti.App.CMSServicesDomainPath+'FAQService.svc';
		// var soapAction = 'http://tempuri.org/IFAQService/GetFAQs';
		// var name = 'GetFAQs';
		// var params = ['websiteID','languageID','keyword'];
		// var values = [Ti.App.WebsiteId,Ti.App.LanguageId, ''];
		
		var soapAction = 'http://tempuri.org/IGenericContentService/GetGenericContentByCategoryUniqueName';
		var name = 'GetGenericContentByCategoryUniqueName';
		var params = ['websiteID','languageID','uniqueName'];
		
		var uniqnameFAQ = (Ti.App.LanguageId == 1)? Ti.App.FaqsGenericContentCategoryUniqueName : Ti.App.FaqsGenericContentCategoryUniqueNameArabic;
		    
		var values = [Ti.App.WebsiteId,Ti.App.LanguageId,uniqnameFAQ];

		var request = getXHRForWCF(url, soapAction);

		var message = getWCFMessge(name, params, values);

		Ti.API.log('message ' + message);


		request.onload = function() {

			

			Titanium.API.log('Success : ResponseText: ' + this.responseText);

			var xml = Ti.XML.parseString(this.responseText);

			
			//var resultList =  xml.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('GetFAQsResponse').item(0).getElementsByTagName('FAQView');
			var resultList =  xml.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('GetGenericContentByCategoryUniqueNameResponse').item(0).getElementsByTagName('a:GenericContentView');

			//alert(resultList.length);

			//var newsList = JSON.parse(resultList.item(0).text);

			Ti.App.hideLoading();

			callBackFunction(resultList);
		};

		request.onerror = function(e) {
			Ti.App.hideLoading();
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

		request.send(message);
	};
	
	this.getCategoryList = function(moduleType,callBackFunction) {

		if (hasConnection() == false) {
			return;
		}

		Ti.App.showLoading(L('Loading'), false);

		var url = Ti.App.HelperserviceURL;
		var soapAction = 'http://tempuri.org/IHelperService/GetParentCategories';
		var name = 'GetParentCategories';
		var params = ['websiteID','languageID','moduleType'];
		var values = [Ti.App.WebsiteId,Ti.App.LanguageId,moduleType];

		var request = getXHRForWCF(url, soapAction);

		var message = getWCFMessge(name, params, values);

		Ti.API.log('message ' + message);

		request.onload = function() {

			

			Titanium.API.log('Success : ResponseText: ' + this.responseText);

			var xml = Ti.XML.parseString(this.responseText);

			//var resultList = xml.documentElement.getElementsByTagName("GetChildCategoriesResponse");
			var resultList =  xml.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('GetParentCategoriesResponse').item(0).getElementsByTagName('a:CategoryView');

			//alert(resultList.length);

			//var newsList = JSON.parse(resultList.item(0).text);

			Ti.App.hideLoading();

			callBackFunction(resultList);
		};

		request.onerror = function(e) {
			Ti.App.hideLoading();
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

		request.send(message);
	};
	
	this.getCategoryFullDetails = function(cat_id,callBackFunction) {

		if (hasConnection() == false) {
			//return;
		}

		Ti.App.showLoading(L('Loading'), false);

		var url = 'http://csskiosk/ADMTacsoft/Services/Helperservice.svc';
		var soapAction = 'http://tempuri.org/IHelperService/GetCategoryByID';
		var name = 'GetCategoryByID';
		var params = ['id'];
		var values = [cat_id];

		var request = getXHRForWCF(url, soapAction);

		var message = getWCFMessge(name, params, values);

		Ti.API.log('message ' + message);

		request.onload = function() {

			

			Titanium.API.log('Success : ResponseText: ' + this.responseText);

			var xml = Ti.XML.parseString(this.responseText);

			//var resultList = xml.documentElement.getElementsByTagName("GetChildCategoriesResponse");
			var resultList =  xml.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('GetCategoryByIDResponse').item(0).getElementsByTagName('GetCategoryByIDResult');

			alert(resultList.length);

			//var newsList = JSON.parse(resultList.item(0).text);

			Ti.App.hideLoading();

			callBackFunction(resultList);
		};

		request.onerror = function(e) {
			Ti.App.hideLoading();
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

		request.send(message);
	};
	
	
	
	
	this.getChildCategoryList = function(parentCategoryId,callBackFunction) {

		if (hasConnection() == false) {
			return;
		}

		Ti.App.showLoading(L('Loading'), false);

		var url = Ti.App.HelperserviceURL;
		var soapAction = 'http://tempuri.org/IHelperService/GetChildCategories';
		var name = 'GetChildCategories';
		var params = ['parentID'];
		var values = [parentCategoryId];

		var request = getXHRForWCF(url, soapAction);

		var message = getWCFMessge(name, params, values);

		Ti.API.log('message ' + message);

		request.onload = function() {

			

			Titanium.API.log('Success : ResponseText: ' + this.responseText);

			var xml = Ti.XML.parseString(this.responseText);

			//var resultList = xml.documentElement.getElementsByTagName("GetChildCategoriesResponse");
			var resultList =  xml.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('GetChildCategoriesResponse').item(0).getElementsByTagName('a:CategoryView');

			//alert(resultList.length);

			//var newsList = JSON.parse(resultList.item(0).text);

			Ti.App.hideLoading();

			callBackFunction(resultList);
		};

		request.onerror = function(e) {
			Ti.App.hideLoading();
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

		request.send(message);
	};
	
	this.getMuncipalServicesList = function(cat_id, callBackFunction) {

		if (hasConnection() == false) {
			return;
		}

		Ti.App.showLoading(L('Loading'), false);

		var url = Ti.App.MunicipalServicesURL;
		var soapAction = 'http://tempuri.org/IMunicipalServicesService/GetMunicipalServiceBySearch';
		var name = 'GetMunicipalServiceBySearch';
		var params = ['websiteID','languageID', 'categoryID'];
		var values = [Ti.App.WebsiteId,Ti.App.LanguageId, cat_id];

		var request = getXHRForWCF(url, soapAction);

		var message = getWCFMessge(name, params, values);

		Ti.API.log('message ' + message);

		request.onload = function() {

			

			Titanium.API.log('Success : ResponseText: ' + this.responseText);

			var xml = Ti.XML.parseString(this.responseText);

			//var resultList = xml.documentElement.getElementsByTagName("GetNewsBySearchResponse");
			var resultList =  xml.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('GetMunicipalServiceBySearchResponse').item(0).getElementsByTagName('a:MunicipalServiceView');

			//alert(resultList.length);

			//var newsList = JSON.parse(resultList.item(0).text);

			Ti.App.hideLoading();

			callBackFunction(resultList);
		};

		request.onerror = function(e) {
			Ti.App.hideLoading();
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

		request.send(message);
	};
	
	this.getMuncipalDetailById = function(id_municip, callBackFunction) {

		if (hasConnection() == false) {
			return;
		}

		Ti.App.showLoading(L('Loading'), false);

		var url = Ti.App.MunicipalServicesURL;
		var soapAction = 'http://tempuri.org/IMunicipalServicesService/GetMunicipalServiceByID';
		var name = 'GetMunicipalServiceByID';
		var params = ['MunicipalServiceID'];
		var values = [id_municip];

		var request = getXHRForWCF(url, soapAction);

		var message = getWCFMessge(name, params, values);

		Ti.API.log('message ' + message);

		request.onload = function() {

			

			Titanium.API.log('Success : ResponseText: ' + this.responseText);

			var xml = Ti.XML.parseString(this.responseText);

			//var resultList = xml.documentElement.getElementsByTagName("GetNewsBySearchResponse");
			var resultList =  xml.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('GetMunicipalServiceByIDResponse');

			//alert(resultList.length);

			//var newsList = JSON.parse(resultList.item(0).text);

			Ti.App.hideLoading();

			callBackFunction(resultList);
		};

		request.onerror = function(e) {
			Ti.App.hideLoading();
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

		request.send(message);
	};
	
	
	this.getMediaGalleryImages = function(callBackFunction) {

		if (hasConnection() == false) {
			return;
		}

		Ti.App.showLoading(L('Loading'), false);

		var url = Ti.App.MediaGalleryServiceURL;
		var soapAction = 'http://tempuri.org/IMediaGalleryService/GetLatestMediaGalleryItem';
		var name = 'GetLatestMediaGalleryItem';
		var params = ['websiteID','languageID'];
		var values = [Ti.App.WebsiteId,Ti.App.LanguageId];

		var request = getXHRForWCF(url, soapAction);

		var message = getWCFMessge(name, params, values);

		Ti.API.log('message ' + message);

		request.onload = function() {

			

			Titanium.API.log('Success : ResponseText: ' + this.responseText);

			var xml = Ti.XML.parseString(this.responseText);

			//var resultList = xml.documentElement.getElementsByTagName("GetNewsBySearchResponse");
			var resultList =  xml.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('GetLatestMediaGalleryItemResponse').item(0).getElementsByTagName('a:MediaGalleryItemView');

			//alert(resultList.length);

			//var newsList = JSON.parse(resultList.item(0).text);

			Ti.App.hideLoading();

			callBackFunction(resultList);
		};

		request.onerror = function(e) {
			Ti.App.hideLoading();
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

		request.send(message);
	};
	
	// this.getRTAProjectList = function(callBackFunction) {
// 
		// if (hasConnection() == false) {
			// return;
		// }
// 
		// //Ti.App.showLoading(L('Loading'), false);
// 
		// var url = Ti.App.ProjectListServiceURL;
		// var soapAction = 'http://tempuri.org/IRTAProjectsService/GetAllProjects';
		// var name = 'GetAllProjects';
		// var params = [];
		// var values = [];
// 
		// var request = getXHRForWCF(url, soapAction);
// 
		// var message = getWCFMessge(name, params, values);
// 
		// Ti.API.log('message ' + message);
// 
		// request.onload = function() {
// 
			// /*
			 // * { "Title": "Test", "ProjectDate": "/Date(1352059200000)/",
			 // * "Code": "", "Cost": "465497887", "Content": "", "Duration":
			 // * "13222", "ProjectThumbnail":
			 // * "http://rta.tacme.com/Rtawebsite//Data/biharnew.jpg", "ID":
			 // * 143072, "Published": true, "CreatedDate":
			 // * "/Date(1353313207000)/", "CreatedBy": "administrator",
			 // * "UniqueName": "Test", "StartDate": null, "EndDate": null,
			 // * "ModuleType": "RTAProjectDAL.Model.RTAProject", "Keywords":
			 // * "kaza", "ShowInHomePage": false, "GeoCoordinateX": 0,
			 // * "GeoCoordinateY": 0, "MetaPageTitle": "", "MetaPageDescription":
			 // * "", "MainImage":
			 // * "http://rta.tacme.com/Rtawebsite//Data/biharnew.jpg", "Comments":
			 // * [], "Ratings": [] }
			 // */
// 
			// Titanium.API.log('Success : ResponseText: ' + this.responseText);
// 
			// var xml = Ti.XML.parseString(this.responseText);
// 
			// var catalogList = xml.documentElement.getElementsByTagName("GetAllProjectsResult");
// 
			// Ti.API.log(catalogList);
// 
			// var projectList = JSON.parse(catalogList.item(0).text);
// 
			// //Ti.App.hideLoading();
// 
			// callBackFunction(projectList);
		// };
// 
		// request.onerror = function(e) {
			// Titanium.API.error('Status: ' + this.status);
			// Titanium.API.error('ResponseText: ' + this.responseText);
			// Titanium.API.error('connectionType: ' + this.connectionType);
			// Titanium.API.error('location: ' + this.location);
			// Ti.App.hideLoading();
			// if (request.status != 200) {
// 
				// Ti.App.ShowAlert('Error', "The service is currently unavailable. Please Try Again Later");
				// return;
			// }
		// };
// 
		// request.send(message);
	// };
	

};

module.exports = HttpManager;
