/**
 * call with the parameter list as below:
 * var parameters = {
 *   URL : 'http://www.dmca.ae/DMCATacsoft/Services/Feedbackservice.svc';
 *   soapAction : 'http://tempuri.org/IFeedbackService/SaveFeedback';
 *   name : 'SearchNews_JSON';
 *   params : ['websiteID', 'languageID', 'categoryID', 'subject', 'name', 'company', 'emailAddress', 'phoneNumber', 'comment', 'address', 'feedbackType'];
 *   values : ['1', '1', '1', 'test', 'text', 'Tacme', 'nsahu@tacme.com', '0569200847', 'nothing', 'no known', '1'];
 *   keyName : 'SaveFeedbackResponse';
 * };
 * 
 * var xml = getResponseFromTheServer(parameters);
 * 
 * */

var getResponseFromTheServer = function(data)
{
	App.customViews.showActivityIndicator();
	var URL = '';
	var soapAction = '';
	var name = '';
	var params = [];
	var values = [];
	var keyName = '';
	
	if(data.URL!=undefined || data.URL!= '')
	{
		URL = data.URL;
	}
	if(data.soapAction!=undefined || data.soapAction!= '')
	{
		soapAction = data.soapAction;
	}
	if(data.name!=undefined || data.name!= '')
	{
		name = data.name;
	}
	
	if(data.params!=undefined || data.params!= '')
	{
		params = data.params;
	}
	if(data.values!=undefined || data.values!= '')
	{
		values = data.values;
	}
	if(data.keyName!=undefined || data.keyName!= '')
	{
		keyName = data.keyName;
	}
	
	
	function getXHRForWCF(url, soapAction) {
		var request = Titanium.Network.createHTTPClient();
		request.open("POST", url);
		request.setRequestHeader("enctype", "multipart/form-data");
		request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		request.setRequestHeader('SOAPAction', soapAction);
		return request;
	};
	
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
		// alert(message);
		return message;
	}
	
	var request_about = getXHRForWCF(URL, soapAction);
	var message_about = getWCFMessge(name, params, values);
	
	request_about.onload = function() {
		Ti.API.info('entered');
		try {
			var xml = Ti.XML.parseString(this.responseText);
			Ti.API.info(xml);
			App.customViews.removeActivityIndicator();
			//alert(xml.getElementsByTagName("s:Envelope").item(0).getElementsByTagName("s:Body").item(0).getElementsByTagName("SaveFeedbackResponse").item(0).getElementsByTagName("SaveFeedbackResult").item(0).textContent);
			return xml;	
		} catch(e) {
			Ti.API.log('EXC : ' + e);
			App.customViews.removeActivityIndicator();
			return undefined;
		}
	};
	
	request_about.onerror = function(e) {
		// alert(e);
		Titanium.API.log('Status: ' + this.status);
		Titanium.API.log('ResponseText: ' + this.responseText);
		Titanium.API.log('connectionType: ' + this.connectionType);
		Titanium.API.log('location: ' + this.location);
		App.customViews.removeActivityIndicator();
		if (e.status != 200) {
			Ti.API.log("The service is currently unavailable. Please Try Again Later");
			return;
		}
		return undefined;
	};
	request_about.send(message_about);
};
