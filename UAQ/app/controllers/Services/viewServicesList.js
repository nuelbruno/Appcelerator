var utilities = require("utilities");
var httpManager = require("httpManager");
var serviceData;
var serviceName;
var selectedIndex = null;

Ti.API.info('VIEW DEPARTMENT LIST');
var arrSection = [];

function listEmpty()
{
	$.listviewServices.setSections([]);
}
exports.listEmpty = listEmpty;

function loadServices(arr, name) {
	$.listviewServices.setSections([]);
	serviceName = name;
	arrSection = [];
	serviceData = arr;

	for (var j = 0; j < arr.length; j++) {
		var lstSection = Ti.UI.createListSection();
		var headerView = Ti.UI.createView({
			height : 60,
			width : "100%",
			backgroundColor : "transparent",
			//lSection : lstSection,
			isExpanded : false,
			lIndex : j
		});
		lstSection.headerView = headerView;

		var view = Ti.UI.createView({
			height : 45,
			//width : "100%",
			left : 30,
			right : 30,
			top : 0,
			//lSection : lstSection,
			isExpanded : false,
			//backgroundColor : "red",
			backgroundImage : Alloy.Globals.path.imgNormalRow,
			lIndex : j
		});

		headerView.add(view);

		var labelSectionTitle = Ti.UI.createLabel({
			left : 30,
			right : 30,
			backgroundColor : "transparent",
			height : Titanium.UI.SIZE,
			touchEnabled : false,
			color : Alloy.Globals.path.whiteColor,
			font : Alloy.Globals.path.font14,
			textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
		});

		if (name == "department") {
			labelSectionTitle.text = arr[j].name;
		} else {
			labelSectionTitle.text = arr[j].name;
			//labelSectionTitle.color=(arr[j].serviceEnabled=="True"?"#4d9900":"#999999");  //To do service
			// labelSectionTitle.color='white';
			labelSectionTitle.color=(arr[j].serviceEnabled=="True"?"#729D47":"#cccccc");
			labelSectionTitle.font = (arr[j].serviceEnabled=="True"?Alloy.Globals.path.font14Bold:Alloy.Globals.path.font14);
		}
		view.add(labelSectionTitle);

		var viewNumber = Ti.UI.createView({
			left : (Alloy.Globals.isEnglish) ? 0 : undefined,
			right : (Alloy.Globals.isEnglish) ? undefined : 0,
			backgroundColor : Alloy.Globals.path.titleRedColor,
			height : 25,
			width : 25,
			touchEnabled : false,
			borderRadius : 12
		});
		view.add(viewNumber);

		var labelSectionNumber = Ti.UI.createLabel({
			backgroundColor : "transparent",
			height : Titanium.UI.SIZE,
			width : Titanium.UI.SIZE,
			touchEnabled : false,
			font : Alloy.Globals.path.font13Bold,
			color : Alloy.Globals.path.whiteColor,
			text : (j + 1),
			textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
		});
		viewNumber.add(labelSectionNumber);

		/*var sectionSpace = Ti.UI.createView({
			height : 0,
			width : "100%",
			bottom : 0,
			touchEnabled : false,
			backgroundColor : "transparent"
		});*/
		//headerView.add(sectionSpace);
		//view.sectionSpace = sectionSpace;

		view.addEventListener("click", function(e) {
			Ti.API.info('E OBJ: '+ JSON.stringify(e));
			if (name != "department") {
				onItemClick(e);
			} else if (e.source.isExpanded) {
				arrSection[e.source.lIndex].setItems([]);
				e.source.backgroundImage = Alloy.Globals.path.imgNormalRow;
				//e.source.sectionSpace.backgroundColor = "transparent";
			} else {
				if (selectedIndex) {
					arrSection[selectedIndex.lIndex].setItems([]);
					selectedIndex.backgroundImage = Alloy.Globals.path.imgNormalRow;
					// selectedIndex.sectionSpace.backgroundColor = "transparent";
					selectedIndex.isExpanded = false;
				}
				selectedIndex = e.source;
				var arrData = [];
				var length;
				if (name == "department") {
					if (Object.prototype.toString.call(arr[e.source.lIndex].services) == "[object Array]")
					length = arr[e.source.lIndex].services.length;
					else
					length = [arr[e.source.lIndex].services].length;
				} else {
					length = arr.length;
				}

				for (var i = 0; i < length; i++) {
					var title = null;
					var data = null;
					var id = null;
					var site = null;
					var serviceEnabled = false;
					if (name == "department") {

						if (Object.prototype.toString.call(arr[e.source.lIndex].services) == "[object Array]") {
							title = arr[e.source.lIndex].services[i].name;
							id = arr[e.source.lIndex].services[i].id;
							serviceEnabled = (arr[e.source.lIndex].services[i].serviceEnabled=="True"?"#4d9900":"#808080");
							// labelSectionTitle.color='white';
						} else {
							title = [arr[e.source.lIndex].services][i].name;
							id = [arr[e.source.lIndex].services][i].id;
							serviceEnabled = (arr[e.source.lIndex].services[i].serviceEnabled=="True"?"#4d9900":"#808080");
						}

						site = arr[e.source.lIndex].site;
					} else {
						title = null;
						id = arr[i].id;
						site = arr[i].site;
					}
					arrData.push({
						/*viewGreenIcon:{
							right : (Alloy.Globals.isEnglish) ? undefined : "0%",
							visible:(arr[e.source.lIndex].services[i].serviceEnabled=="True"?true:false),
							left : (Alloy.Globals.isEnglish) ? "0%" : undefined,
						},*/
						
						labelServicesLIVE:{
							right : (Alloy.Globals.isEnglish) ? undefined : "1%",
							// text:Alloy.Globals.selectedLanguage.actLabel,
							visible:(arr[e.source.lIndex].services[i].serviceEnabled=="True"?true:false),
							left : (Alloy.Globals.isEnglish) ? "1%" : undefined,
						},
						labelServicesTitle : {
							text : title,
							right : (Alloy.Globals.isEnglish) ? undefined : "12%",
							left : (Alloy.Globals.isEnglish) ? "12%" : undefined,
							color:serviceEnabled
						},
						properties : {
							id : id,
							site : site,
							backgroundColor : 'transparent'
						}
					});
				}

				e.source.backgroundImage = Alloy.Globals.path.imgSelectedRow;
				//e.source.sectionSpace.backgroundColor = "#80FFFFFF";
				arrSection[e.source.lIndex].setItems(arrData);
			}
			e.source.isExpanded = !e.source.isExpanded;
		});
		arrSection.push(lstSection);
	}

	$.listviewServices.sections = arrSection;
	Alloy.Globals.hideLoading();
	// $.listviewDepartment.sections[0].setItems(arrData);
}

exports.loadServices = loadServices;


function onItemClick(e) {
	utilities.disableMultiTouch(e.source);
	if (serviceName == "department") {
		var section = $.listviewServices.sections[e.sectionIndex];
		var item = section.getItemAt(e.itemIndex);
		httpManager.getServicesDetailsInfo(function(response) {
			if (response == null)
				return;
			payload = {
				siteName : item.properties.site,
				data : response,
			};
			Alloy.Globals.openWindow(Alloy.createController("Services/winServices", payload).getView());
		}, item.properties.site, item.properties.id);
	} else {
		//Alloy.Globals.openWindow(Alloy.createController("Services/winServices", serviceData[e.source.lIndex]).getView());
		httpManager.getServicesDetailsInfo(function(response) {
			if (response == null)
				return;
			payload = {
				siteName : serviceData[e.source.lIndex].site,
				data : response,
			};
			Alloy.Globals.openWindow(Alloy.createController("Services/winServices", payload).getView());
		}, serviceData[e.source.lIndex].site, serviceData[e.source.lIndex].id);
	}
}


//loadDepartment([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);

