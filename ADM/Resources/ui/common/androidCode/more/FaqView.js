function FaqView() {

	var scrool_view =  Ti.UI.createScrollView({
					  contentWidth: '100%',
					  contentHeight: 'auto',
					  showVerticalScrollIndicator: true,
					  showHorizontalScrollIndicator: false,
					  width: '100%'
					});
	

	var self = Ti.UI.createView({
		top : 10,
		left : 10,
		//height: 2000,
        width: '100%',
		layout : 'vertical',
		right : 10
	});

	function collapse_view(title, describtion, cell_height) {
		
		

		var main_view1 = Ti.UI.createView({
			top : 0,
			left : 0,
			width : '100%',
			height : GetHeight(45),
			//layout : 'vertical',
			zIndex : 1
		});
		
		//alert(cell_height);
		
		//main_view1.height = cell_height;


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

		var show_view = show_dropdown_content(title, describtion, cell_height);

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
			
			var int_height = parseInt(height); //alert(int_height);
			
			var drop_content = Ti.UI.createView({
				top : GetHeight(48),
				left : 0,
				//borderColor:'red',
				width : '90%',
				height : GetHeight(60),
			});

			/*var titleLabel = Titanium.UI.createLabel({
				text : describtion,
				font : {
					fontSize : 12,
					fontFamily : 'Helvetica Neue'
				},
				color : '#999999',
				textAling : 'left',
				left : GetWidth(3),
				width : '100%'
			});*/
			
			
			
			
			var web_answer = Titanium.UI.createWebView({
				html : '<html><head><body style="width:100%;height:30px;font-size:13px;">'+describtion+'</body></html>',
				backgroundColor : 'transparent',
				width : '100%',
				//height :GetHeight(int_height)
			}); 

			
			

			drop_content.add(web_answer);

			/*var arrow_drop2 = Titanium.UI.createLabel({
				text : '',
				height : 2,
				borderWidth : 1,
				borderColor : '#b0b0b0',
				opacity : 0.3,
				width : "100%",
				//right : GetWidth(9),
				bottom : GetHeight(3)
			});

			drop_content.add(arrow_drop2);*/

			return drop_content;
		}

		return main_view1;

	}

	var HttpManager = require(L('HttpManager'));
	var httpManager = new HttpManager();
	var httpManager = httpManager.getFAQservice(function(e) {
		FAQitem = e;
		fetchallFAQ();
	});
	
//FAQitem.length
	function fetchallFAQ() {
		for (var i = 0; i < FAQitem.length; i++) {
			
			
			
			
			
			//var cell_height = heightincreasefn(FAQitem.item(i).getElementsByTagName('a:Answer').item(0).text);
			var cell_height = heightincreasefn(FAQitem.item(i).getElementsByTagName('a:Content').item(0).text);
			
			var height = totalheightincreaese(FAQitem.length, cell_height);
			
			self.height = height;
			
			//var collapseviewadd = collapse_view(FAQitem.item(i).getElementsByTagName('a:Title').item(0).text, FAQitem.item(i).getElementsByTagName('a:Answer').item(0).text, cell_height);
			var collapseviewadd = collapse_view(FAQitem.item(i).getElementsByTagName('a:Title').item(0).text, FAQitem.item(i).getElementsByTagName('a:Content').item(0).text, cell_height);
			self.add(collapseviewadd);
		}

	}
	
	function totalheightincreaese(totalrecord, cell_height)
	{
		 var eachcell_height = cell_height + 45;
		 var total_height = totalrecord * eachcell_height;
		 
		 return total_height;
	}
	
	function heightincreasefn(describtion)
	{
		 var lengthcheck = describtion.length;  
		 
		 var count_lenth = (describtion.length%60); 
		 
		 var LineNumber = count_lenth;  
		 
		 return LineNumber;
	}
	
	scrool_view.add(self);

	return scrool_view;
};
module.exports = FaqView;
