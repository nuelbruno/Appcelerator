function ServiceCode()
{
	
      var Service_View = Ti.UI.createView({
		width : '100%'
	    });
	
       var headerLabel = Ti.UI.createLabel({
		width : '60%',
		text : 'My land',
		font : {
			fontSize : '12sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		textAlign : 'center',
		color : '#000'
	    });
	    Service_View.add(headerLabel);

   return Service_View;

}
module.exports = ServiceCode;