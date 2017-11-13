// Ti.include(Ti.App.getResourceFile('/Model/NewsModel.js'));
// Ti.include(Titanium.Filesystem.resourcesDirectory + '/View/NewsDetailView.js');
var getMCrewLCategoriesView = function() {
	var dataArray = [];
	var meritimeSafetyView = Ti.App.customViews.createCustomTabViews({
		width : '100%',
		height : '100%',
		top : 0,
		layout : 'vertical'
		},Ti.App.L('categories'));
		
	var upperTextView = Ti.UI.createWebView({
		top:0,
		width:'96%',
		color:'black',
		editable:false,
		bottom:0,
		left:'2%',
		scalesPageToFit:true
	});
	upperTextView.html = '<html><head><title>HTML Online Editor Sample</title>	</head>	<body><table border="0" cellpadding="5"><tbody><tr><td><strong>Marine Craft Crew Licensing Categories:</strong></td></tr>	<tr>		<td><p>	<strong>(A) Marine Craft Driving License:</strong></p><ul>	<li>		Skipper- Craft length up to (12) meters.</li>	<li>		Skipper- Craft length up to (24) meters.</li>	<li>		Heritage Abra Operator.</li>	<li>		Master - Craft length up to (12) meters:</li>	<li>		Master - Craft length up to (24) meters with gross tonnage less than 500 tons.</li></ul><p>	<strong>(B) Marine Crew Permit (Engineering):</strong><br />	The certificates of the sailors who carry out the works of the marine engineering shall base on the capacity of the Marine Craft, as these certificates shall entitle their holders to serve as:</p><ul>	<li>		Engine Operator below (3000) KW.&nbsp;</li>	<li>		Engine Operator below (1500) KW.</li>	<li>		Ass. Engine Operator below (3000) KW.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>	<li>		Ass. Engine Operator below (1500).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li></ul><p>	<strong>(C) Marine Crew Permit:</strong><br />	This includes issuing permits to:</p><ul>	<li>		Marine Pilot</li><li>Marine Trainer</li></ul></td></tr></tbody></table></body></html>';	
	meritimeSafetyView.add(upperTextView);
		
	meritimeSafetyView.reload = function()
	{
		
	};
	return meritimeSafetyView;
};

module.exports = getMCrewLCategoriesView;