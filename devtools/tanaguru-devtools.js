function handleShown() {
	browser.runtime.sendMessage({
		tabId: browser.devtools.inspectedWindow.tabId,
		command: 'initPopup'
	});
}

function handleHidden() {
	browser.runtime.sendMessage({
		tabId: browser.devtools.inspectedWindow.tabId,
		command: 'resetPopup'
	});
}

/* Tanaguru in DevTools */
var manifest = browser.runtime.getManifest();
browser.devtools.panels.create(
	manifest.name,
	'/ressources/images/icons/tanaguru-32-dark.png',
	'/devtools/panel/tanaguru-devtools-panel.html'
).then((newPanel) => {
	newPanel.onShown.addListener(handleShown);
	newPanel.onHidden.addListener(handleHidden);
});