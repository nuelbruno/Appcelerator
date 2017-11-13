function FaqView() {

	var scrool_view = Ti.UI.createScrollView({
		   contentWidth:'auto',
		    contentHeight:'auto',
		    top:0,
		    showVerticalScrollIndicator:true,
		    showHorizontalScrollIndicator:true
	});
	
	
	var self = Ti.UI.createView({
		top : 10,
		left : 10,
		layout : 'vertical',
		right : 10
	});

	function collapse_view(title, describtion, height) {

		var main_view1 = Ti.UI.createView({
			top : 0,
			left : 0,
			width : '100%',
			height : GetHeight(45),
			zIndex : 1
		});

		//collapse_view.add(main_view1);

		var faq_view = Ti.UI.createView({
			//top : 5,
			left : 0,
			zIndex : 3,
			width : '100%'
		});

		main_view1.add(faq_view);

		var titleLabel = Titanium.UI.createLabel({
			text : title,
			font : {
				fontSize : GetHeight(14),
				fontFamily : 'Helvetica Neue'
			},
			color : '#000',
			textAling : 'left',
			top : 0,
			left : 0,
			width : '80%',
			height : GetHeight(40)
		});

		faq_view.add(titleLabel);

		var arrow1 = Titanium.UI.createLabel({
			text : '٧',
			font : {
				fontSize : GetHeight(14),
				fontFamily : 'Helvetica Neue'
			},
			color : '#999999',
			textAling : 'right',
			top :  GetHeight(5),
			right : GetWidth(3),
			width : '9%',
			height : GetHeight(20)
		});

		faq_view.add(arrow1);

		var horline_1 = Titanium.UI.createLabel({
			text : '',
			height : 2,
			borderWidth : 1,
			borderColor : '#b0b0b0',
			opacity : 0.3,
			width : "100%",
			//right : GetWidth(9),
			top : GetHeight(42)
		});
		faq_view.add(horline_1);

		var faqdrp1 = false;

		var show_view = show_dropdown_content(title, describtion);

		faq_view.addEventListener('click', function(e) {
			if (faqdrp1 === false) {
				main_view1.add(show_view);
				arrow1.text = '٨';
				main_view1.height = GetHeight(110);
				faqdrp1 = true;
			} else if (faqdrp1 === true) {
				main_view1.remove(show_view);
				arrow1.text = '٧', main_view1.height = GetHeight(45);
				faqdrp1 = false;
			}
		});

		function show_dropdown_content(title, describtion, height) {
			var drop_content = Ti.UI.createView({
				top : GetHeight(10),
				left : 0,
				//borderColor:'red',
				width : '100%',
				height : GetHeight(height),
			});

			var titleLabel = Titanium.UI.createLabel({
				text : describtion,
				font : {
					fontSize : 12,
					fontFamily : 'Helvetica Neue'
				},
				color : '#999999',
				textAling : 'left',
				left : GetWidth(3),
				width : '100%'
			});
			
			

			drop_content.add(titleLabel);

			var arrow_drop2 = Titanium.UI.createLabel({
				text : '',
				height : 2,
				borderWidth : 1,
				borderColor : '#b0b0b0',
				opacity : 0.3,
				width : "100%",
				//right : GetWidth(9),
				bottom : GetHeight(3)
			});

			drop_content.add(arrow_drop2);

			return drop_content;
		}

		return main_view1;

	}

	var HttpManager = require(L('HttpManager'));
	var httpManager = new HttpManager();
	var httpManager = httpManager.webserviceMyland(function(e) {
		FAQitem = e;
		fetchallFAQ();
	});
	

	function fetchallFAQ() {
		for (var i = 0; i < FAQitem.length; i++) {
			
			var height = heightincreasefn(FAQitem.item(i).text);
			var collapseviewadd = collapse_view(FAQitem.item(i).text, FAQitem.item(i).text, height);
			self.add(collapseviewadd);
		}

	}
	
	function heightincreasefn(describtion)
	{
		 var lengthcheck = describtion.length;
		 
		 var count_lenth = (describtion.length%60);
		 
		 var LineNumber = (count_lenth *20);
		 
		 return LineNumber;
	}
	
	scrool_view.add(self);

	return scrool_view;
};
module.exports = FaqView;
