Ti.include(Titanium.Filesystem.resourcesDirectory+'/Utils/SoapCall.js');
var getGalleryParameters = function(App, fn_end)
{
	var parameters = {
		URL : 'http://www.dmca.ae/DMCATacsoft/Services/'+Ti.App.Defines.GalleryServiceName,
		soapAction : 'http://tempuri.org/IMediaGalleryVadService/GetMediaGalleryByCategoryUniqueName',
		name : 'GetMediaGalleryByCategoryUniqueName',
		params : ['websiteID', 'languageID', 'uniqueName'],
		values : ['1', Ti.App.LangID, 'B67A18AF62E94E75A41044504A51AB4A'],
		keyName : 'GetMediaGalleryByCategoryUniqueNameResult',
	};
	getResponseFromTheServer(parameters, fn_end);
};