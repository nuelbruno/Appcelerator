var createCustomTab = function(App,tabViewArray)
{
	var tabWindow;
	var tabHeaderView;
	var tabContentView;
	var tabCount = tabViewArray.length;
	var activeIndex = undefined;
	
	tabWindow = Ti.UI.createView({
		height:'100%', // total tab windowHeight;
		width:'100%',
		backgroundColor:'white'
	});
	
	tabHeaderView = Ti.UI.createView({
		width:'100%',
		height:Ti.Platform.displayCaps.platformHeight*10/100,
		top:0,
		layout:'horizontal', //107FCC  //0A3A72,
		backgroundGradient: {
	        type: 'linear',
	        startPoint: { x: '0%', y: '50%' },
	        endPoint: { x: '100%', y: '50%' },
	        colors: [ '#107FCC','#0A3A72' ]
	    }
	});
	
	// creating tabs.
	
	for(var i=0;i < tabViewArray.length;i++)
	{
		var tab = Ti.UI.createView({
			width:Ti.Platform.displayCaps.platformWidth/tabViewArray.length,
			height:'100%',
			left:0,
			attachedView:tabViewArray[i],
			index:i,
			//backgroundColor:'white',
			backgroundGradient: {
		        type: 'linear',
		        startPoint: { x: '50%', y: '0%' },
		        endPoint: { x: '50%', y: '100%' },
		        colors: [ '#d1e2f0','#bcd6e8' ]
		    },
		    //borderColor:'#DCDCDC',
		   // borderWidth:1,
			kind:'tab'
		});
		
		var Lbl = Ti.UI.createLabel({
			width:'99%',
			height:'100%',
			text:tabViewArray[i].label,
			touchEnabled:false,
			textAlign:'center',
			kind:'label',
			font:{fontSize:'12dp'},
			index:i,
			left:1,
			//right:1,
			color:'black'
		});
		
		if(i != (tabViewArray.length -1))
		{
		 var ver_line_tab = Titanium.UI.createLabel({
							text : '',
							height :"100%",
							borderWidth : 1,
							textAlign:'right',
							borderColor : '#99b5c7',
							opacity:0.8,
							width : 1,
							index:i,
							right : 0
							
						});
		
		 
		 tab.add(ver_line_tab);
		}
		tab.add(Lbl);
		tabHeaderView.add(tab);
		
		tab.addEventListener('click',function(e){
			if(e.source.index!= undefined)
			tabWindow.loadTabWithIndex(e.source.index);
		});
	}
	
	tabContentView = Ti.UI.createView({
		width:'100%',
		height:Ti.Platform.displayCaps.platformHeight*80/100,
		top:Ti.Platform.displayCaps.platformHeight*10/100,
	});
	tabWindow.add(tabHeaderView);
	tabWindow.add(tabContentView);
	
	tabWindow.loadTabWithIndex = function(index){
		if(activeIndex!=index)
		{
			if(Ti.App.directionwin != undefined)
			{
				Ti.App.directionwin.close();
				clearInterval(Ti.App.directionwin_timer);
				//Ti.App.directionwin_timer = null;
				//Ti.App.directionwin='';
			}
			for(var i = 0;i < tabHeaderView.children.length;i++)
			{
				if(tabHeaderView.children[i].kind!=undefined && tabHeaderView.children[i].kind == 'tab')
				{
					if(tabHeaderView.children[i].attachedView!=undefined && tabHeaderView.children[i].index == index)
					{
						tabHeaderView.children[i].backgroundGradient = {
					        type: 'linear',
					        startPoint: { x: '50%', y: '0%' },
					        endPoint: { x: '50%', y: '100%' },
					        colors: [ '#084d82','#074f82' ]
					    };
					    tabHeaderView.children[i].children[0].color = 'white';
						activeIndex = index;
						Ti.App.customViews.removeAllChildren(tabContentView);
						tabContentView.add(tabHeaderView.children[i].attachedView);
					    tabHeaderView.children[i].attachedView.reload();
					}
					else
					{
						// alert('i am in else');
						tabHeaderView.children[i].backgroundGradient = {
					        type: 'linear',
					        startPoint: { x: '50%', y: '0%' },
					        endPoint: { x: '50%', y: '100%' },
					        colors: [ '#d1e2f0','#bcd6e8' ]
					    };
					    tabHeaderView.children[i].children[0].color = 'black';
					}
				}
			}
		}
	};
	
	tabWindow.loadTabWithIndex(0);
	return tabWindow;
};
