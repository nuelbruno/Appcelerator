Ti.API.info('start');


function parseWeatherResponse(data)
{
	var retVal = {
		iconName:undefined,
		temp: undefined,
		text:undefined
	};
	
	var xml = Ti.XML.parseString(data);
	retVal.iconName = (xml.getElementsByTagName('weather').item(0).getElementsByTagName('cc').item(0).getElementsByTagName('icon').item(0).textContent);
	retVal.temp = (xml.getElementsByTagName('weather').item(0).getElementsByTagName('cc').item(0).getElementsByTagName('tmp').item(0).textContent);
	retVal.text = (xml.getElementsByTagName('weather').item(0).getElementsByTagName('cc').item(0).getElementsByTagName('t').item(0).textContent);
	// alert(retVal);
	return retVal;
};
var parser = function(fn_end){
	var xhr = Ti.Network.createHTTPClient({
		onerror: function()
		{
			alert('Connection Error!!\n Please try again later.');
		},
		onload:function()
		{
			var result =  parseWeatherResponse(this.responseText);
			fn_end(result);
		},
	});
	
	xhr.open('GET','http://wxdata.weather.com/wxdata/weather/local/AEXX0001?cc=*&dayf=1&link=xoap&prod=xoap&par=1160927424&key=6da813a3f61c2558&unit=m');
	xhr.send();
};
module.exports = parser;