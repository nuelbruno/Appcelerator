var args = arguments[0] || {};
Ti.API.info('Response === >>> ', JSON.stringify(args));
var density,isTablet = Alloy.isTablet;

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

if (Alloy.Globals.isIOS7Plus) {
	//	$.winDashboard.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
	$.winDirections.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}


function closeWindow() {
	Alloy.Globals.closeWindow($.winDirections);
}
function gotoHome(){
	Alloy.Globals.gotoHome();
}
function loadItems(arrDoc) {
	//$.lblNoItems.visible = false;
	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {
		var row = Ti.UI.createTableViewRow({
			height : Ti.UI.SIZE,
			selectedBackgroundColor : "transparent",
		});	
		var indexLabel = Ti.UI.createLabel({
			top : 5,
			text : i + 1,
			font :  (isTablet) ? Alloy.Globals.path.font18 : Alloy.Globals.path.font13,
			color : Alloy.Globals.path.blackColor,
			width :(isTablet) ? 35 : 25,
			//textAlign : 'center'
		});

		var contentLabel = Ti.UI.createLabel({
			//	text : arrDoc[i].html_instructions,
			top : 5,
			bottom : 5,
			text : Alloy.Globals.CleanHtml(arrDoc[i].html_instructions),
			font : (isTablet) ? Alloy.Globals.path.font18 : Alloy.Globals.path.font13,
			color : Alloy.Globals.path.darkGrayColor,
			height : Ti.UI.SIZE
			//height :  (isTablet) ? 40 : 32
		});

		// var rowseparater = Ti.UI.createView({
		// height : 1,
		// bottom : 0,
		// backgroundColor : Alloy.Globals.path.grayColor
		// });
		if (Alloy.Globals.isEnglish) {
			indexLabel.left = 0;
			contentLabel.left = (Alloy.isTablet) ?  40 : 30;
			contentLabel.right = 0;
			indexLabel.textAlign = contentLabel.textAlign = 'left';
			indexLabel.right = undefined;
		} else {
			indexLabel.right = 0;
			contentLabel.right = (Alloy.isTablet) ? 40 : 30;
			contentLabel.left = 0;
			indexLabel.textAlign = contentLabel.textAlign = 'right';
			indexLabel.left = undefined;
		}
		row.add(indexLabel);
		row.add(contentLabel);
		//row.add(rowseparater);
		rowData.push(row);
	}
	$.tableViewItems.data = rowData;
	// if (arrDoc.length == 0) {
	// $.lblNoItems.visible = true;
	// }
}

function changeLanguage() {
	
	if(args.status != "NOT_FOUND"){
	loadItems(args.routes[0].legs[0].steps);

	$.lblFromValue.text = args.routes[0].legs[0].start_address;
	$.lblToValue.text = args.routes[0].legs[0].end_address;
	$.lblTotalDurationValue.text = args.routes[0].legs[0].duration.text;
	$.lblTotalLengthValue.text = args.routes[0].legs[0].distance.text; 
	
	}

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.direction;
	$.lblDirection.text = Alloy.Globals.selectedLanguage.direction;
	$.lblFromTitle.text = Alloy.Globals.selectedLanguage.from;
	$.lblToTitle.text = Alloy.Globals.selectedLanguage.to;
	$.lblTotalDurationTitle.text = Alloy.Globals.selectedLanguage.totalDuration;
	$.lblTotalLengthTitle.text = Alloy.Globals.selectedLanguage.totalLength;
	$.lblSteps.text = Alloy.Globals.selectedLanguage.steps;

	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.lblFromTitle.left = $.lblToTitle.left = $.lblTotalDurationTitle.left = $.lblTotalLengthTitle.left = 0;
		$.lblFromTitle.right = $.lblToTitle.right = $.lblTotalDurationTitle.right = $.lblTotalLengthTitle.right = undefined;

		$.lblFromValue.right = $.lblToValue.right = $.lblTotalDurationValue.right = $.lblTotalLengthValue.right = 0;

		if(isTablet){
			$.lblFromColon.left = $.lblToColon.left = $.lblTotalDurationColon.left = $.lblTotalLengthColon.left = 140;
			$.lblFromValue.left = $.lblToValue.left = $.lblTotalDurationValue.left = $.lblTotalLengthValue.left = 170;
		}else{
			$.lblFromColon.left = $.lblToColon.left = $.lblTotalDurationColon.left = $.lblTotalLengthColon.left = 80;
			$.lblFromValue.left = $.lblToValue.left = $.lblTotalDurationValue.left = $.lblTotalLengthValue.left = 110;			
		}
		$.lblFromColon.right = $.lblToColon.right = $.lblTotalDurationColon.right = $.lblTotalLengthColon.right = undefined;

	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.lblFromTitle.right = $.lblToTitle.right = $.lblTotalDurationTitle.right = $.lblTotalLengthTitle.right = 0;
		$.lblFromTitle.left = $.lblToTitle.left = $.lblTotalDurationTitle.left = $.lblTotalLengthTitle.left = undefined;

		$.lblFromValue.left = $.lblToValue.left = $.lblTotalDurationValue.left = $.lblTotalLengthValue.left = 0;

		$.lblFromColon.left = $.lblToColon.left = $.lblTotalDurationColon.left = $.lblTotalLengthColon.left = undefined;
		
		if(isTablet){
			$.lblFromColon.right = $.lblToColon.right = $.lblTotalDurationColon.right = $.lblTotalLengthColon.right = 140;
			$.lblFromValue.right = $.lblToValue.right = $.lblTotalDurationValue.right = $.lblTotalLengthValue.right = 170;
		}else{
			$.lblFromColon.right = $.lblToColon.right = $.lblTotalDurationColon.right = $.lblTotalLengthColon.right = 80;
			$.lblFromValue.right = $.lblToValue.right = $.lblTotalDurationValue.right = $.lblTotalLengthValue.right = 110;	
		}

	}
	$.lblDirection.textAlign = $.lblSteps.textAlign = alignment;
	$.lblFromTitle.textAlign = $.lblToTitle.textAlign = $.lblTotalDurationTitle.textAlign = $.lblTotalLengthTitle.textAlign = alignment;
	$.lblFromValue.textAlign = $.lblToValue.textAlign = $.lblTotalDurationValue.textAlign = $.lblTotalLengthValue.textAlign = alignment;
}
$.winDirections.addEventListener("open", function(e) {
	Alloy.Globals.arrWindows.push($.winDirections);
});
$.winDirections.addEventListener("close", function(e) {
	Alloy.Globals.arrWindows.pop();
	$.imgBackBtn = $.imgHomeBtn = $.tableViewItems = null;
});
changeLanguage();
