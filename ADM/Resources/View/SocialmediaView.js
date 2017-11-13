function SocailMediaCode()
{
	
      var Socail_View = Ti.UI.createView({
		width : '100%'
	    });
	
       var headerLabel = Ti.UI.createLabel({
		width : '60%',
		text : 'SOCAIL MEDIA',
		font : {
			fontSize : '12sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		textAlign : 'center',
		color : '#000'
	    });
	    Socail_View.add(headerLabel);

   return Socail_View;

}
module.exports = SocailMediaCode;