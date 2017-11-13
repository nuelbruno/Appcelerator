var args = arguments[0] || {};
var density;

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

$.winCofogByEntity.addEventListener("open", function(e) {

	$.sectionView.height = (Alloy.Globals.GetHeight(30) + density);
	$.lblCode.width = (Alloy.Globals.GetWidth(60) + density);
	$.lblDesc.width = (Alloy.Globals.GetWidth(160) + density);
	$.lblTotal.width = (Alloy.Globals.GetWidth(80) + density);
	
});
if (Alloy.Globals.isIOS7Plus) {
	//	$.winDashboard.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
	$.winCofogByEntity.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function loadRows(arrDoc){
	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {
		
		var row = Alloy.createController("Reports/BudgetReports/cofogEntityRow", arrDoc[i]).getView();
		
		var separator = Ti.UI.createImageView({
			width : "100%",
			height : 1,
			bottom : 0,
			backgroundColor : Alloy.Globals.path.grayColor
		});
		
		row.add(separator);
		row.height = Ti.UI.SIZE;
				
		if(i==0){
			row.backgroundColor = "#5eabed";	
		}else{
			row.backgroundColor = "#cfd7f2";
		}	
				
				
		row.doc = arrDoc[i];
		rowData.push(row);
	}

	$.tableView.data = rowData;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winCofogByEntity);
}

function changeLanguage() {
	
	loadRows(args);
	$.lblNavTitle.text = "Cofog By Entity";
	$.lblDesc.text = "Description";
	$.lblCode.text = "Code";
	$.lblTotal.text = Alloy.Globals.selectedLanguage.total;
	
	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		
		$.lblCode.left = (Alloy.Globals.GetWidth(5) + density);
		$.lblDesc.left = (Alloy.Globals.GetWidth(70) + density);
		$.lblTotal.left = (Alloy.Globals.GetWidth(235) + density);
		
		$.lblCode.right = $.lblDesc.right = $.lblTotal.right = undefined;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		
		$.lblCode.right = (Alloy.Globals.GetWidth(5) + density);
		$.lblDesc.right = (Alloy.Globals.GetWidth(70) + density);
		$.lblTotal.right = (Alloy.Globals.GetWidth(235) + density);
		
		$.lblCode.left = $.lblDesc.left = $.lblTotal.left = undefined;
	}
}

changeLanguage();
