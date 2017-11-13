var httpManager = require("httpManager");

var getAllNotificationsResponse = null;
exports.changeLanguage = function () {
	
	$.labelTitle.text = Alloy.Globals.selectedLanguage.notificationTitle;
	if (Alloy.Globals.isEnglish) {
		$.labelTitle.textAlign = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	}
	else {
		$.labelTitle.textAlign = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	}
	
	// Ti.API.info(newsCnt, eventCnt, funeralCnt, eServicesCnt);
	Ti.API.info('CURRENT WIN: '+Alloy.Globals.currentWindow);
	loadNotification();
};


function closeView(e) {
	Ti.API.info('GOING TO CLOSE' + e.source.id);
	
	if (e.source.id == "viewNotificationMain")
	{
		if ($.viewNotificationMain.visible) {
			$.viewNotificationMain.animate({
				opacity : 0,
				duration : 300
			}, function(e) {
				$.viewNotificationMain.visible = false;
			});
		} else {
			$.viewNotificationMain.visible = true;
			$.viewNotificationMain.animate({
				opacity : 1,
				duration : 300
			});
		}
	}
	else
	{
		return;
	}
}
var tblData = [];
var arrStoredAllNotificationData=[];
function loadNotification() {
	try
	{
		getAllNotificationsResponse = null;
		httpManager.getAllNotifications(function(response) {
			if (response == null || response == "" || response == "undefined")
				return;
			
			getAllNotificationsResponse = response;
			
			Ti.API.info(' LENGTH: '+ getAllNotificationsResponse.count);
			
			Ti.API.info(' FINAL RESPONSE ALL NOTIFICATION HISTORY:::::; ' + JSON.stringify(getAllNotificationsResponse));

			var cntNews = 0;
			var cntEvents = 0;
			var cntFunerals = 0;
			var cntEservices = 0;
			
			Alloy.Globals.storedAllNotificationData=[];
			arrStoredAllNotificationData = [];
			tblData=[];
			
			var rows = null;
			
			if (parseInt(getAllNotificationsResponse.count) == 0)
			{
				$.lblEmptyNotifications.visible=true;
				$.lblEmptyNotifications.text = Alloy.Globals.selectedLanguage.no_notification;
				setBadgeValue(cntNews, cntEvents, cntFunerals, cntEservices);
				$.tableviewAllNotifications.setData(tblData);
				return;
			}
			
			$.lblEmptyNotifications.visible=false;
			var nTypeId = null;
			var msg = null;
			
			if (parseInt(getAllNotificationsResponse.count) == 1)
			{
				$.lblEmptyNotifications.visible=false;
				msg = JSON.parse(getAllNotificationsResponse.searchResults.message);
				
				nTypeId = parseInt(msg.nTypeId);
				
				rows = Alloy.createController('common/allNotificationTableRows', msg).getView();
				rows.messageId = getAllNotificationsResponse.searchResults.messageId;
				rows.nTypeId = nTypeId;
				rows.nTypeIdVal = msg.nTypeIdVal;
				
				(nTypeId==1?Ti.API.info('NOT YET'):(nTypeId==2?cntNews=cntNews+1:(nTypeId==3?cntEvents=cntEvents+1:(nTypeId==4?cntFunerals=cntFunerals+1:cntEservices=cntEservices+1))));
				
				(nTypeId==5?tblData.push(rows):Ti.API.info('DONT SHOW OTHER NOTIFICATION'));
				
				arrStoredAllNotificationData.push(getAllNotificationsResponse.searchResults);
				rows=null;
			}
			else
			{
				sortByKey(getAllNotificationsResponse.searchResults,"messageId");
				Ti.API.info('AFTER: '+JSON.stringify(getAllNotificationsResponse.searchResults));
				
				$.lblEmptyNotifications.visible=false;
				for (var i=0; i<getAllNotificationsResponse.searchResults.length; i++)
				{
					msg = JSON.parse(getAllNotificationsResponse.searchResults[i].message);
					nTypeId = parseInt(msg.nTypeId);
					
					rows = Alloy.createController('common/allNotificationTableRows', msg).getView();
					rows.messageId = getAllNotificationsResponse.searchResults[i].messageId;
					rows.nTypeId = nTypeId;
					rows.nTypeIdVal = msg.nTypeIdVal;
					
					(nTypeId==1?Ti.API.info('NOT YET'):(nTypeId==2?cntNews=cntNews+1:(nTypeId==3?cntEvents=cntEvents+1:(nTypeId==4?cntFunerals=cntFunerals+1:cntEservices=cntEservices+1))));
					
					(nTypeId==5?tblData.push(rows):Ti.API.info('DONT SHOW OTHER NOTIFICATION'));
					
					arrStoredAllNotificationData.push(getAllNotificationsResponse.searchResults[i]);
					rows=null;
				}
			}
			$.tableviewAllNotifications.setData(tblData);
			Alloy.Globals.storedAllNotificationData = arrStoredAllNotificationData;
			nTypeId = null;
			msg = null;
			setBadgeValue(cntNews, cntEvents, cntFunerals, cntEservices);
		});
	}
	catch(e)
	{
		Ti.API.info('############### ERROR ############ '+ JSON.stringify (e));
	}
}
//Ascending order: Latest entry wil come first (>, <):
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; 
        var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}
// function onItemClick(e) {
	// var section = $.listviewNotification.sections[e.sectionIndex];
	// var item = section.getItemAt(e.itemIndex);
// }


// if (Alloy.Globals.currentWindow=="winHome")
Ti.App.addEventListener('loadNbindNotificationDataInTable', loadNotification);
// else
	// Ti.API.info('NO NEED TO ADD IN ALL SCREEN');


function _eventTableAllNotificationClicked(e)
{
	try
	{
		if (Alloy.Globals.currentWindow == "winMyServices" && (Alloy.Globals.currentWindow != null || Alloy.Globals.currentWindow != undefined))
			Alloy.Globals.arrWindows[Alloy.Globals.arrWindows.length - 1].close();
			
		var nTypeId = e.row.nTypeId;
		if (nTypeId=="5"){
			Ti.API.info('ASSOCIATED MESSAGE ROW: '+e.row.nTypeIdVal);
			
			/*var userid = Ti.App.Properties.getObject("LoginDetaisObj");
				userid = (Ti.App.Properties.getObject("LoginDetaisObj") == null ? 0 : Ti.App.Properties.getObject("LoginDetaisObj").userName);*/
				
			httpManager.markNotificationMessageAsRead(function(response){
					if (response=='1')
						$.tableviewAllNotifications.deleteRow(e.index);
					var data = {"response":"", 
								"idToExpand":e.row.nTypeIdVal, 
								"isNoRecord":"" , 
								url : ""};
					Alloy.Globals.openWindow(Alloy.createController("Services/MyServices/winMyServices", data).getView());
				},e.row.messageId, (Ti.App.Properties.getObject("LoginDetaisObj") == null ? 0 : Ti.App.Properties.getObject("LoginDetaisObj").userName));
		}else{
			Ti.API.info('WHY OTHER RECORDS CAME HERE... ONLY eSERVICES NOTIFICATION COMES HERE');
			return;
		}
		setTimeout(function(){$.viewNotificationMain.animate({opacity : 0,duration : 300}, function(e) {$.viewNotificationMain.visible = false;});},500);
	}
	catch(e){Ti.API.info(' ############# ERROR IN eSERVICES TABLE NOTIFICATION CLICK ############## '+JSON.stringify(e));}
};

function setBadgeValue(cntNews, cntEvents, cntFunerals, cntEservices){
	
	// for testing runtime purpose
	// cntNews = 2;
	// cntEvents = 3;
	// cntFunerals = 4;
	// cntEservices = 2;
	// Alloy.Globals.actBadge.hide();
	Ti.API.info('<<<<<<<<<<<<<<<<<<<<<<<<<<<COUNTER VALUES>>>>>>>>>>>>>>>>>>>>>>>>>>>');

	
	Ti.API.info('cntNews : '+ cntNews);
	Ti.API.info('cntEvents : '+ cntEvents);
	Ti.API.info('cntFunerals : '+ cntFunerals);
	Ti.API.info('cntEservices : '+ cntEservices);
	Ti.API.info('TOTAL COUNTER ALL: '+ parseInt(cntNews + cntEvents + cntFunerals + cntEservices));
	
	(OS_IOS?Ti.UI.iPhone.setAppBadge(parseInt(cntNews + cntEvents + cntFunerals + cntEservices)):Ti.API.info('!...!'));
	
	if (cntNews ==0 && cntEvents==0 && cntFunerals==0 && cntEservices==0){
		Alloy.Globals.NotificationCounterNews.visible=false;
		Alloy.Globals.NotificationCounterEvents.visible=false;
		Alloy.Globals.NotificationCounterFunerals.visible=false;
		// Alloy.Globals.AllNotificationLabelCounter.visible=false;
		
		if (Alloy.Globals.currentWindow=="winHome"){
			Ti.API.info('U R ON HOME SCREEN..1111'+ Alloy.Globals.currentWindow);
			$.viewNotificationMain.setNotificationLabel({counterValue:cntEservices});
		}
		else{
			Alloy.Globals.AllNotificationLabelCounter.visible=false;
			
			$.lblEmptyNotifications.visible=true;
			$.lblEmptyNotifications.text = Alloy.Globals.selectedLanguage.no_notification;
		}
	}
	else
	{
		if (cntNews==0){
			Alloy.Globals.NotificationCounterNews.visible=false;
		}
		else{
			Alloy.Globals.NotificationCounterNews.visible=true;
			Alloy.Globals.NotificationCounterNews.children[0].text = cntNews;
		}
		if (cntEvents==0){
			Alloy.Globals.NotificationCounterEvents.visible=false;
		}
		else{
			Alloy.Globals.NotificationCounterEvents.visible=true;
			Alloy.Globals.NotificationCounterEvents.children[0].text = cntEvents;
		}
		if (cntFunerals==0){
			Alloy.Globals.NotificationCounterFunerals.visible=false;
		}
		else{
			Alloy.Globals.NotificationCounterFunerals.visible=true;
			Alloy.Globals.NotificationCounterFunerals.children[0].text = cntFunerals;
		}
		
		if (cntEservices==0){
			if (Alloy.Globals.currentWindow=="winHome"){
				Ti.API.info('U R ON HOME SCREEN..22222'+ Alloy.Globals.currentWindow);
				$.viewNotificationMain.setNotificationLabel({counterValue:cntEservices});
			}
			else{
				Alloy.Globals.AllNotificationLabelCounter.visible=false;
			}
		}
		else{
			/*if (Ti.App.Properties.getObject("LoginDetaisObj")== null || Ti.App.Properties.getObject("LoginDetaisObj")== undefined || Ti.App.Properties.getObject("LoginDetaisObj")==""){
				Alloy.Globals.AllNotificationLabelCounter.visible=false;
			}
			else{*/
				
				if (Alloy.Globals.currentWindow=="winHome"){
					Ti.API.info('U R ON HOME SCREEN..33333'+ Alloy.Globals.currentWindow);
					$.viewNotificationMain.setNotificationLabel({counterValue:cntEservices});
				}
				else{
					Alloy.Globals.AllNotificationLabelCounter.visible=true;
					Alloy.Globals.AllNotificationLabelCounter.children[0].text = cntEservices;
				}
			// }
		}
	}
};
