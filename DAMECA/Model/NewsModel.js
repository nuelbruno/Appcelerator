Ti.include(Titanium.Filesystem.resourcesDirectory+'/Utils/SoapCall.js');
var getNewsParameters = function(App, fn_end) {
	var parameters = {
		URL : 'http://www.dmca.ae/DMCATacsoft/Services/' + Ti.App.Defines.NewsServiceName,
		soapAction : 'http://tempuri.org/INewsService/SearchNews',
		name : 'SearchNews',
		params : ['websiteID', 'languageID', 'keyword'],
		values : ['1', Ti.App.LangID, ' '],
		keyName : 'SearchNewsResult',
	};
	getResponseFromTheServer(parameters, fn_end);
}; 