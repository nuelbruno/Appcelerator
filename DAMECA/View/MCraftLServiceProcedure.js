
var getMCrewLServiceProcedureView = function() {
	var dataArray = [];
	var meritimeSafetyView = Ti.App.customViews.createCustomTabViews({
		width : '100%',
		height : '100%',
		top : 0,
		layout : 'vertical'
		},Ti.App.L('service_procedure'));
		
	var upperTextView = Ti.UI.createWebView({
		top:0,
		width:'96%',
		color:'black',
		editable:false,
		bottom:0,
		left:'2%',
		scalesPageToFit:true,
		url:Ti.App.getResourceFile('craftServiceProceedure.html')
	});
	//upperTextView.html = '<html><head><title>HTML Online Editor Sample</title></head><body><table border="0" cellpadding="5"><tbody><tr><td><strong>Service Procedures</strong></td></tr><tr><td><ol><li>Filling the Marine Crew Licensing Application form (Ref. No. LAR-FRM-004-V1)</li><li>Submit all the required documents to issue Marine Craft Crew Licensing</li><li>Submit the applicable fees</li><li>Receive the Marine Craft Crew Licence</li></ol></td></tr></tbody></table></body></html>';	
	meritimeSafetyView.add(upperTextView);
	meritimeSafetyView.reload = function()
	{
		
	};
	return meritimeSafetyView;
};

module.exports = getMCrewLServiceProcedureView;