var args = arguments[0] || {};

var arrData = args;
var ab = Ti.Platform.model;
var ipn = ab.search('iPod');

//Ti.API.info('arrData == '+JSON.stringify(arrData));

var density;
//Initializing an array for storing data for search implementation
var searchArray = [];
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

if (Alloy.Globals.isIOS7Plus) {
	$.winLocationFederal.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function searchList() {
	var arrSearch = [];
	if ($.txtSearch.value.trim().length == 0) {
		arrSearch = arrData;
	} else {

		arrSearch = arrData.filter(function(obj) {
			Ti.API.info("Seaerch"+ obj.enName.toUpperCase());
			Ti.API.info("Seaerch value"+ $.txtSearch.value.toUpperCase());
			
			if(Alloy.Globals.isEnglish){
				return obj.enName.toUpperCase().indexOf($.txtSearch.value.toUpperCase().trim()) != -1;
			}else{
				return obj.arName.toUpperCase().indexOf($.txtSearch.value.toUpperCase().trim()) != -1;
			}
		});
	}
	loadItems(arrSearch);
}


function openCall(e){
	var number = arrData[e.itemIndex].number;
	
	if(number.length != 0) {
		//if (number != null)
		
			if(ipn == 0) {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.phone, Alloy.Globals.selectedLanguage.phoneCallService);
				return;
				}
			Alloy.Globals.makeCall(number);
	}else{
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.phone, Alloy.Globals.selectedLanguage.notAvailable);
	}
}

function openWebsite(e){
	var section = $.tableViewItems.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);
	var winDetail = Alloy.createController("FederalEntities/winWebView", item.properties.obj).getView();
	Alloy.Globals.openWindow(winDetail);
}

function openMapDirection(e){
	var section = $.tableViewItems.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);
	if (OS_ANDROID) {
		if (Alloy.Globals.Map.isGooglePlayServicesAvailable() != 0) {
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.direction, Alloy.Globals.selectedLanguage.googlePlayServieMsg);
		} else if (!Titanium.Geolocation.getLocationServicesEnabled()) {
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.direction, Alloy.Globals.selectedLanguage.turnOnGPS);
		} else if (item.properties.obj.latitude == "" || item.properties.obj.latitude == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.direction, Alloy.Globals.selectedLanguage.invalidRoute);
		} else {
			getCurrentLocation(function(e) {
				var win = Alloy.createController("FederalEntities/winMapDirection", {
					itemObj : item.properties.obj,
					curLocation : e
				}).getView();
				Alloy.Globals.openWindow(win);
			});
		}
	} else {
		Ti.API.info('LOCATION SERVICE == '  + Titanium.Geolocation.getLocationServicesEnabled());
		if (!Titanium.Geolocation.getLocationServicesEnabled()) {
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.direction, Alloy.Globals.selectedLanguage.turnOnGPS);
		} else if (item.properties.obj.latitude == "" || item.properties.obj.latitude == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.direction, Alloy.Globals.selectedLanguage.invalidRoute);
		} else {
			getCurrentLocation(function(e) {
				var win = Alloy.createController("FederalEntities/winMapDirection", {
					itemObj : item.properties.obj,
					curLocation : e
				}).getView();
				Alloy.Globals.openWindow(win);
			});
		}
	}
	
}

function getCurrentLocation(callback) {
	Titanium.Geolocation.getCurrentPosition(function(e) {
		if (!e.success || e.error) {
			if (OS_IOS) {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.direction, Alloy.Globals.selectedLanguage.turnOnGPS);
			}else{
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.direction, Alloy.Globals.selectedLanguage.turnOnGPS);
			}
		} else {
			callback({
				latitude : e.coords.latitude,
				longitude : e.coords.longitude
			});
		}

	});
}
//Defining function for loading data and add to tableview
function loadItems(arrDoc){
	
	if (arrDoc.length == 0) {
		$.lblNoItems.visible = true;
	} else {
		$.lblNoItems.visible = false;
	}
		
	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {

		rowData.push({
			viewContents:{
				backgroundColor : "transparent"
			},
			lblTitle : {
				text : (Alloy.Globals.isEnglish) ? arrDoc[i].enName : arrDoc[i].arName,
				font:(Alloy.isTablet) ? Alloy.Globals.path.font20 : Alloy.Globals.path.font14,
				color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.blackColor,
				backgroundColor : "transparent"
			},
			lblAddress : {
				text : (Alloy.Globals.isEnglish) ? arrDoc[i].enAddress : arrDoc[i].arAddress,
				font:(Alloy.isTablet) ? Alloy.Globals.path.font16 : Alloy.Globals.path.font12,
				color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.darkGrayColor,
				backgroundColor : "transparent"
			},
			imgView : {
				image :((arrDoc[i].image.length == 0)) ? Alloy.Globals.path.defaultImageThumb : arrDoc[i].image,
			},
			
			properties : {
				obj : arrDoc[i]
			}
		});
		
	}

	$.listSection.setItems(rowData);
	
}

$.tableViewItems.addEventListener("itemclick",function(e){
	return;
	var section = $.tableViewItems.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);
	var win = Alloy.createController("FederalEntities/winMapDirection", item.properties.obj).getView();
	Alloy.Globals.openWindow(win);
});

/*
Ti.App.iOS.addEventListener("watchkitextensionrequest",function(e){
    alert(e);
    Ti.API.info('e==='+JSON.stringify(e));
    return;
    
    var myReplyContent = {foo:"bar"};
    Ti.App.iOS.sendWatchExtensionReply(e.handlerId,myReplyContent);
});
*/


function closeWindow() {
	Alloy.Globals.closeWindow($.winLocationFederal);
}

//defining function for sorting items in tableview
function sortItems() {
}

function changeLanguage() {
	loadItems(arrData);
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.locateFederal;
	$.lblNoItems.text = Alloy.Globals.selectedLanguage.noRecordFound;
	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.imgSearch.left = 10;
		if (OS_IOS) {
			$.txtSearch.left = (Alloy.isTablet) ? 40 : 30;
			$.txtSearch.right = 10;
		} else {
			$.txtSearch.left = (Alloy.isTablet) ? 35 : 25;
			$.txtSearch.right = 0;
		}
		$.imgSearch.right = undefined;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.imgSearch.right = 10;
		if (OS_IOS) {
			$.txtSearch.right = (Alloy.isTablet) ? 40 : 30;
			$.txtSearch.left = 10;
		} else {
			$.txtSearch.right = (Alloy.isTablet) ? 35 : 25;
			$.txtSearch.left = 0;
		}
		$.imgSearch.left = undefined;
	}
	$.txtSearch.textAlign=alignment;
}
changeLanguage();

$.winLocationFederal.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winLocationFederal);
});
$.viewBottomToolbar.setDefaultTheme($.winLocationFederal);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winLocationFederal);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winLocationFederal);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	Alloy.Globals.arrWindows.push($.winLocationFederal);
	
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true,
	});
};


/**
 * Window is closed
 * 
 * @param {Object} e
 */
var windowClosed = function(e){
	Alloy.Globals.arrWindows.pop();
	$.imgBackBtn = $.imgSorting = $.imgSearch = $.tableViewItems = null;
	$.destroy();
};
