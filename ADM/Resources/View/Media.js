function MediaCode()
{
	
      var Media_View = Ti.UI.createView({
		width : '100%'
	    });
	
       var headerLabel = Ti.UI.createLabel({
		width : '60%',
		text : 'MEDIA',
		font : {
			fontSize : '12sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		textAlign : 'center',
		color : '#000'
	    });
	    Media_View.add(headerLabel);

   return Media_View;

}
module.exports = MediaCode;