var windowcontrole = function() {

	var win_leftnav = function() {
	var controller = require('Utils/MainWindowWithLeftPanel');
	// alert(new controller);
	var win = new controller();
	};

	var marina_open = function() {

		Ti.App.setAppHeaderTitle('My Marina');
		var getfishingcontroller1 = require('Controller/mylocationcontroller');
		var getfishingcontroller = new getfishingcontroller1();
		var tabWin = getfishingcontroller;
		Ti.App.ActiveTabController = tabWin;
		tabWin.loadTabWithIndex(0);
		//win.contentView.add(tabWin);
		//win.remove(e.source);
		//Ti.App.setbackevent(win);
		//Ti.App.baseWindow = win;
		//win.open();
	};
	var media_open = function() {
          
        Ti.App.setAppHeaderTitle(Ti.App.L('dmcaserviceinfo'));
		var getMediaController1 = require('Controller/MediaController');
		var getMediaController = new getMediaController1();
		var tabWin = getMediaController;
		Ti.App.ActiveTabController = tabWin;
		tabWin.loadTabWithIndex(0);
		win.contentView.add(tabWin);
		//win.remove(e.source);
		Ti.App.setbackevent(win);
		//Ti.App.baseWindow = win;
		//win.open();
	};

	return {
		win_leftnav : win_leftnav,
		marina_open : marina_open,
		media_open : media_open
	};

};

module.exports = windowcontrole;
