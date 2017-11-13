
function MainController()
{
	
	var mainWindow;
	var contentView;

	mainWindow = Ti.UI.createWindow({
		backgroundColor:'#FFFFFF',
		frontPanelView : undefined,
		mainView : undefined,
		headerPanel : undefined,
		leftPanel : undefined
	});
	
	
	var mainView = Ti.UI.createView({
		//backgroundColor:'#ffffff'
		width:'100%',
		zIndex:1
	});
	
	mainWindow.add(mainView);
	
	
	var LandingviewCode = require(Ti.App.getcommonjsPath('View/landing_view'));

	var LandingviewCode = new LandingviewCode();
	
	mainWindow.add(LandingviewCode);
	
	//LandingviewCode.hide();
	
	//Ti.App.MainView = mainView;
	
	
	var btn = Ti.UI.createButton({
		title:'ADM',
		color:'black'
	});
	
	mainWindow.add(btn);
	
	btn.addEventListener('click', function(e){
		
		mainWindow.remove(e.source);
		mainWindow.remove(mainView);
		mainView = null;
		
		Ti.API.info('bruno------'+e.source);
		
		//var tabWin = getMediaController(App);
		//win.contentView.add(tabWin);
		//win.remove(e.source);
	});
	
	// #######  TAB GROUP ADDING TO MAIN WINDOW ################ //
	
	var tabgroup = require(Ti.App.getcommonjsPath('Controller/tabgroup'));

	var tabgroup = new tabgroup();
	
	mainView.add(tabgroup);
	
	return mainWindow;
	
}
module.exports = MainController;