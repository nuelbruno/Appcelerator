
var xhr = Ti.Network.createHTTPClient({
	onerror: function()
	{
		
	},
	onload:function()
	{
		alert('done');
	},
});

xhr.open('POST','http://www.dmca.ae/DMCATacsoft/Services/ MediaGalleryvadService.svc');
xhr.send();