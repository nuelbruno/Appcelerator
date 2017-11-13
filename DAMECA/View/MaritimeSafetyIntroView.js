// Ti.include(Ti.App.getResourceFile('/Model/NewsModel.js'));
// Ti.include(Titanium.Filesystem.resourcesDirectory + '/View/NewsDetailView.js');
var getMeritimeSafetyView = function() {
	var dataArray = [];
	var meritimeSafetyView = Ti.App.customViews.createCustomTabViews({
		width : '100%',
		height : '100%',
		top : 0,
		layout : 'vertical'
		},Ti.App.L('news'));
		
	var width = Ti.Platform.displayCaps.platformWidth*96/100;
	var height = width/5;
		
	var upperTextView = Ti.UI.createView({
		top:0,
		width:'100%',
		backgroundColor:'#D4D4D4',
		editable:false,
		height:GetHeight(72),
		// left:'2%',
		layout:'vertical'
	});
	
	var headLbl = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		top:GetHeight(10),
		text:Ti.App.L('dodontlist'),//'Below is the list of Do\'s and Dont\'s',
		color:'black',
		left:'2%'
	});
	var doDontBackView = Ti.UI.createView({
		backgroundColor:'transparent',
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		top:0,
		left:'2%',
		layout:'horizontal'
	});
	
	var doBackView = Ti.UI.createView({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		layout:'horizontal'
	});
	
	var doIcon = Ti.UI.createView({
		width:GetWidth(21),
		height:GetHeight(21),
		backgroundImage:Ti.App.getResourceFile ('images/Common/DOSmall.png')
	});
	
	var doText = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		text:Ti.App.L('dos'),
		color:'#149942'
	});
	doBackView.add(doIcon);
	doBackView.add(doText);
	
	var seperator = Ti.UI.createView({
		width:'3dp',
		backgroundImage:''
	});
	
	var dontBackView = Ti.UI.createView({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		layout:'horizontal'
	});
	
	var dontIcon = Ti.UI.createView({
		width:GetWidth(21),
		height:GetHeight(21),
		backgroundImage:Ti.App.getResourceFile ('images/Common/DONTSmall.png')
	});
	
	var dontText = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		text:Ti.App.L('donts'),
		color:'#E5001C'
	});
	
	dontBackView.add(dontIcon);
	dontBackView.add(dontText);
	
	doDontBackView.add(doBackView);
	doDontBackView.add(dontBackView);
	
	upperTextView.add(headLbl);
	upperTextView.add(doDontBackView);
	
	var tableView = Ti.UI.createTableView({
		top:'2%',
		width:'96%',
		height:Ti.UI.FILL,
		left:'2%',
		rowHeight:'50dp',
		separatorColor:'transparent'
	});
	
	var tableRowData = [];
	
	// tag = 0 ---- > dont's
	// tag = 1 ---- > do's
	
	var dataText;
	var condBackImage = 'images/Common/ListBgar.png';
	var condBackclickImage = 'images/Common/ListBgClickar.png';
	if(Ti.App.LangID === 1)
	{
		condBackImage = 'images/Common/ListBg.png';
		condBackclickImage = 'images/Common/ListBgClick.png';
		dataText = [{image:Ti.App.getResourceFile ('images/Contents/do1.png'),txt:'Wear your lifejacket!', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/do2.png'),txt:'Take an approved boating safety course!', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/do3.png'),txt:'Come prepared; bring dringking water, sunglasses, sunscreen and safety equipment!', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/do4.png'),txt:'Use enough fuel for the trip!', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/do5.png'),txt:'Learn and follow the boating "rules of the road"!', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/do6.png'),txt:'Check the weather, watch for changing water conditions!', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/do7.png'),txt:'Always pay attention!', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/do8.png'),txt:'Inspect your marine craft (battery, klines, fuel,navigation kits, GPS, fire extinguisher, charts, etc.)!', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/do9.png'),txt:'Inspect your marine craft\'s communications system!', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/dont1.png'),txt:'DON\'T ride on the outside of the marine craft (as in picture)!', tag:0},
		{image:Ti.App.getResourceFile ('images/Contents/dont2.png'),txt:'DON\'T ride too closely to other marine crafts and larger vessels. Remember boats don\'t have breaks!', tag:0},
		{image:Ti.App.getResourceFile ('images/Contents/dont3.png'),txt:'DON\'T tie up the buoys or markers!', tag:0},
		{image:Ti.App.getResourceFile ('images/Contents/dont4.png'),txt:'DON\'T litter', tag:0},
		{image:Ti.App.getResourceFile ('images/Contents/dont5.png'),txt:'DON\'T fish within harbours and swimming areas.', tag:0},
		{image:Ti.App.getResourceFile ('images/Contents/dont6.png'),txt:'DON\'T operate a marine craft near water-front development.', tag:0}];
	} else {
		headLbl.right = headLbl.left;
		headLbl.left = undefined;
		doDontBackView.right = doDontBackView.left;
		doDontBackView.left = undefined;
		dataText = [{image:Ti.App.getResourceFile ('images/Contents/do1.png'),txt:'!ارتداء سترة نجاة الخاص بك', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/do2.png'),txt:'!تأخذ دورة سلامة القوارب وافق', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/do3.png'),txt:'!يأتي مستعدا؛ جلب المياه، والنظارات، واقية من الشمس ومعدات السلامة الشرب', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/do4.png'),txt:'!استخدام ما يكفي من الوقود لرحلة', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/do5.png'),txt:'!تعلم واتبع "قواعد الطريق" القوارب', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/do6.png'),txt:'!تحقق من الطقس، ومشاهدة لتغيير ظروف المياه', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/do7.png'),txt:'!تولي اهتماما دائما', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/do8.png'),txt:'!تفتيش طائرة البحرية الخاصة بك (البطارية، klines والوقود، ومجموعات الملاحة وتحديد المواقع، وطفاية حريق، والرسوم البيانية، وما إلى ذلك)', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/do9.png'),txt:'!فحص نظام الاتصالات البحرية الحرفية الخاص بك', tag:1},
		{image:Ti.App.getResourceFile ('images/Contents/dont1.png'),txt:'!لا تركب على السطح الخارجي للطائرة البحرية (كما في الصورة)', tag:0},
		{image:Ti.App.getResourceFile ('images/Contents/dont2.png'),txt:'لا تركب بشكل وثيق جدا لالحرف البحرية الأخرى والسفن الكبيرة. تذكر القوارب لم يكن لديك فواصل', tag:0},
		{image:Ti.App.getResourceFile ('images/Contents/dont3.png'),txt:'!لا ربط العوامات وعلامات', tag:0},
		{image:Ti.App.getResourceFile ('images/Contents/dont4.png'),txt:'لا القمامة', tag:0},
		{image:Ti.App.getResourceFile ('images/Contents/dont5.png'),txt:'لا بالصيد داخل الموانئ ومناطق السباحة.', tag:0},
		{image:Ti.App.getResourceFile ('images/Contents/dont6.png'),txt:'لا تعمل طائرة البحرية بالقرب تطوير الواجهة البحرية.', tag:0}];}
		
	for(var i=0;i<dataText.length;i++)
	{
		var textAlign = 'left';
		if(Ti.App.LangID === 2)
		{
			textAlign = 'right';
		}
		var row = Ti.UI.createTableViewRow({
			backgroundImage:Ti.App.getResourceFile(condBackImage),
			touch:'true',
			width:'100%',
			height:GetHeight(62),
			backgroundFocusedImage:Ti.App.getResourceFile(condBackclickImage),
			focusable:true
		});
		
		var clausesFirstBackView = Ti.UI.createView({
			// backgroundImage:Ti.App.getResourceFile('images/ListIcons/SafetyFirst.png'),
			backgroundColor:'transparent',
			width:'98%',
			height:Ti.UI.FILL,
			top:width/98*2,
			left:'1%'
		});
	
		var iconView = Ti.UI.createView({
			width:GetHeight(50),
			height:GetHeight(50),
			left:'1%',
			backgroundImage:dataText[i].image,
			touchEnabled : false,
			top:GetHeight(2)
		});
		
		var clausesLabel = Ti.UI.createLabel({
			right:GetWidth(40),
			left:GetWidth(69),
			text:Ti.App.L(dataText[i].txt),
			color:'#0A3A72',
			font:{fontSize : '12dp'},
			touchEnabled : false,
			textAlign : textAlign
		});
		
		if(Ti.App.LangID === 2)
		{
			var temp = clausesLabel.left;
			clausesLabel.left = clausesLabel.right;
			clausesLabel.right = temp;
		}
		
		var iconView2 = Ti.UI.createView({
			width:GetHeight(32),
			height:GetHeight(32),
			right:GetWidth(6),
			backgroundImage:Ti.App.getResourceFile('images/Common/DOSmall.png'),
			touchEnabled : false,
		});
		
		if(Ti.App.LangID === 2){
			iconView.right = iconView.left;
			iconView2.left = iconView2.right;
			iconView.left = undefined;
			iconView2.right = undefined;
		}
		
		if(dataText[i].tag)
		{
			iconView2.backgroundImage = Ti.App.getResourceFile('images/Common/DOSmall.png');
		}
		else
		{
			iconView2.backgroundImage = Ti.App.getResourceFile('images/Common/DONTSmall.png');
		}
		
		clausesFirstBackView.add(iconView2);
		clausesFirstBackView.add(iconView);
		clausesFirstBackView.add(clausesLabel);
		// clauseView.add(clausesFirstBackView);
		// row.add(clauseView);
		row.add(clausesFirstBackView);
		dataArray.push(row);
	}
	
	tableView.setData(dataArray);
	// meritimeSafetyView.add(upperTextView);
	// meritimeSafetyView.add(boldHeadline);
	meritimeSafetyView.add(upperTextView);
	meritimeSafetyView.add(tableView);
	return meritimeSafetyView;
}; 