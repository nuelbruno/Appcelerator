var args = arguments[0] || {};

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}
//Initializing an array for storing data for search implementation
var arrSearch = [];

$.win.addEventListener("open", function(e) {

});

if (Alloy.Globals.isIOS7Plus) {
	$.win.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
	$.tableView.separatorInsets = {
		left : 0
	};
}

function closeWindow() {
	Alloy.Globals.closeWindow($.win);
}

//Declaring an array for storing data
var arrNews = [{
	title : "UAE and the Grand Duchy of Luxembourg sign a protocol to amend the agreement on the avoidance of double taxation and prevention of fiscal evasion.",
	image : Alloy.Globals.path.bgNews1,
	bigImage : Alloy.Globals.path.bgBigNews1,
	date : "26 Oct, 2014",
	shortDate : " 26 Oct",
	desc : "HE Obaid Humaid Al Tayer, Minister of State for Financial Affairs and HE Pierre Gramegna, Luxembourg's Minister of Finance, today signed a protocol to amend the agreement on the avoidance of double taxation and prevention of fiscal evasion on income and capital between the United Arab Emirates and Luxembourg. The signing was held today at the Ministry’s headquarters in Abu Dhabi in the presence of HE Younis Haji Al Khouri, Undersecretary of the UAE Ministry of Finance (MoF); HE Khalid Ali Al Bustani, Assistant Undersecretary of International Financial Relations Sector at MoF; Majid Ali Omran, Director of MoF’s International Financial Relations Department along with members of the Grand Duchy of Luxembourg’s delegation.\n\nThe signing of this Protocol aimed at amending the agreement between the two countries that was initially signed in November 2005. The amendments see the addition of new provisions that were determined based on MoF’s suggestions in addition to the inclusion of entities and funds that were not included in the original agreement. These entities include the Abu Dhabi Investment Authority (ADIA), the Central Bank of the UAE, Abu Dhabi Investment Council (ADIC), Abu Dhabi National Energy Company PJSC (TAQA), International Petroleum Investment Company (IPIC), Mubadala Development Company and the Investment Corporation of Dubai. The Protocol also offers the opportunity of adding any new government entity to the agreement through official letters received from the UAE Ministry of Foreign Affairs.\n\nOn the sidelines of this meeting, the two parties signed a Memorandum of Understanding on cooperation in the field of Islamic banking services. This MoU was signed following MoF’s suggestion and in recognition of the two countries’ growing role in the field of Islamic banking which has become part of the global financial system."
}, {
	title : "UAE participates in the 45th meeting of the GCC Committee for Undersecretaries of Ministries of Finance and Economy in Kuwait.",
	image : Alloy.Globals.path.bgNews2,
	bigImage : Alloy.Globals.path.bgBigNews2,
	date : "23 Oct, 2014",
	shortDate : " 23 Oct",
	desc : "The UAE, represented by the Ministry of Finance (MoF), participated today in the 45th meeting of the GCC Committee for Undersecretaries of Ministries of Finance and Economy. The meeting is held in preparation of the 99th meeting of the GCC Financial and Economic Cooperation Committee, which will be held on the 25th of October 2014 in Kuwait. HE Younis Haji Al Khoori, Undersecretary of MoF participated in the 45th meeting on behalf of the UAE.\n\nDuring the meeting, a discussion was held on a number of the UAE’s recommendations with regards to the General Secretariat’s remarks on the eighth  and ninth meeting of the GCC Customs Union Authority, the third and fourth meeting of the work team for the governance of financial, monetary and regional organisations and entities as well as the GCC railway project.The meeting also discussed the UAE’s recommendation on  bringing together all GCC opinions with regards to the studies prepared by the IMF during the joint meeting in order to have a unified vision among Gulf states.",
}, {
	title : "UAE delegation participates in the 99th meeting of the GCC Financial and Economic Cooperation Committee in Kuwait.",
	image : Alloy.Globals.path.bgNews3,
	bigImage : Alloy.Globals.path.bgBigNews3,
	date : "22 Oct, 2014",
	shortDate : " 22 Oct",
	desc : "HE Obaid Humaid Al Tayer, Minister of State for Financial Affairs is set to head the UAE delegation during the 99th meeting of the GCC Financial and Economic Cooperation Committee, which will be held between October 24 and 25 in Kuwait. The participating delegation will include HE Mubarak Rashid Khamis Al Mansouri, UAE Central Bank Governor and HE Younis Haji Al Khoori, Undersecretary of the Ministry of Finance (MoF), along with a number of employees from the Ministry and the UAE Central Bank.\n\nAhead of the 99th meeting, Kuwait will also hold the 45th preparatory meeting of the GCC Committee for Undersecretaries of Ministries of Finance on the 23rd of October, with the participation of HE Younis Haji Al Khoori on behalf of the UAE. The preparatory meeting will address several topics including the economic projects and resolutions issued by the Supreme Council of the Gulf Cooperation Council."
}];
//Defining function for loading data from webservice and add to tableview
function loadNews(arrNews, isFirstLoad) {

	var rowData = [];
	for (var i = 0; i < arrNews.length; i++) {
		//Check if it is loading first time and then assigned the data to search array
		if (isFirstLoad) {
			arrSearch.push(arrNews[i]);
		}

		var payLoad = {
			title : arrNews[i].title,
			image : arrNews[i].image,
			bigImage : arrNews[i].bigImage,
			date : arrNews[i].date,
			shortDate : arrNews[i].shortDate,
		};

		var imgSeparator = Ti.UI.createImageView({
			width : "100%",
			height : 1,
			bottom : 0,
			backgroundColor : Alloy.Globals.path.grayColor
		});

		var row = Alloy.createController("Notifications/notificationsRow", payLoad).getView();
		//	if (i < [arrNews.length - 1]) {
		row.add(imgSeparator);
		//	}
		row.doc = arrNews[i];
		rowData.push(row);
		//	Click event for navigating to its details
		row.addEventListener("click", function(e) {
			var winNewsDetail = Alloy.createController("Notifications/winNotificationsDetails", e.source.doc).getView();
			if (OS_IOS) {
				Alloy.Globals.openWindow(winNewsDetail);
			} else {
				winNewsDetail.open();
			}
		});
	}
	$.tableView.data = rowData;
}

var searchList = function(e) {
	var pattern = e.source.value;
	var tempArray = PatternMatch(arrSearch, pattern);
	loadNews(tempArray, false);
};

function PatternMatch(arrayToSearch, pattern) {
	var searchLen = pattern.length;
	arrayToSearch.sort();
	var tempArray = [];
	for (var index = 0,
	    len = arrayToSearch.length; index < len; index++) {
		if (arrayToSearch[index].title.substring(0, searchLen).toUpperCase() === pattern.toUpperCase()) {
			tempArray.push(arrayToSearch[index]);
		}
	}
	return tempArray;
}

function changeLanguage() {

	loadNews(arrNews, true);

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.notificationsTitle;

	var alignment;

	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.imgSearch.left = 10;
		if (OS_IOS) {
			$.txtSearch.left = 30;
			$.txtSearch.right = 10;
		} else {
			$.txtSearch.left = 25;
			$.txtSearch.right = 0;
		}
		$.imgSearch.right = undefined;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.imgSearch.right = 10;
		if (OS_IOS) {
			$.txtSearch.right = 30;
			$.txtSearch.left = 10;
		} else {
			$.txtSearch.right = 25;
			$.txtSearch.left = 0;
		}
		$.imgSearch.left = undefined;
	}
	$.txtSearch.textAlign = alignment;
}
changeLanguage();
