var args = arguments[0] || {};

function openUserSatisfaction() {
	httpManager.getUserSatisfactionQuestions(function(e) {

		if (e == null) {
			return;
		}

		var win = Alloy.createController("UserSatisfaction/winUserSatisfaction", e).getView();
		Alloy.Globals.openWindow(win);

	});
}
