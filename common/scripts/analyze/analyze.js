require([
	'analyze/getXPath',
	'analyze/addResultSet',
	'analyze/manageOutput',
	], function(getXPath, addResultSet, manageOutput){

		var analyze = function(){
			var json = {};

			/* headings */
			var headingsset = [];
			var headings = document.querySelectorAll('h1:not([role]) ,[role="heading"]');
			for (var i = 0; i < headings.length; i++) {
				headingsset.push(manageOutput(headings[i]));
			}
		
			//if (headingsset.length > 0) {
				addResultSet(json, browser.i18n.getMessage("msgHeadings"), {
					name:  browser.i18n.getMessage("msgHeading") + (headingsset.length > 1 ? 's' : ''),
					type: 'humanneeded',
					data: headingsset
				});
			//} 
		
			/* Boutons */
			var buttonsset = [];
			var buttons = document.querySelectorAll('button:not([role]), input[type="reset"]:not([role]), input[type="submit"]:not([role])');
			for (var i = 0; i < buttons.length; i++) {
				buttonsset.push(manageOutput(buttons[i]));
			}
			//if (buttonsset.length > 0) {
				addResultSet(json, browser.i18n.getMessage("msgButtons"), {
					name:  browser.i18n.getMessage("msgButton") + (buttonsset.length > 1 ? 's' : ''),
					type: 'humanneeded',
					data: buttonsset
				});
			//}
		
			/* Images */
			var imageswithoutalt = [];
			var imageswithalt = [];
			var imgs = document.querySelectorAll('img:not([role])');
			for (var i = 0; i < imgs.length; i++) {
				(imgs[i].hasAttribute('alt') ? imageswithalt : imageswithoutalt).push(manageOutput(imgs[i]));
			}
			//if (imageswithoutalt.length > 0) {
				addResultSet(json, 'Images', {
					name: 'Image' + (imageswithoutalt.length > 1 ? 's' : '') + ' sans attribut alt',
					type: 'failure',
					data: imageswithoutalt,
					mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)'
				});
			//}
			//if (imageswithalt.length > 0) {
				addResultSet(json, 'Images', {
					name: 'Image' + (imageswithalt.length > 1 ? 's' : '') + ' avec attribut alt',
					type: 'humanneeded',
					data: imageswithalt,
					mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)'
				});
			//}
		
			/* Liens */
			var linksset = [];
			var links = document.querySelectorAll('a[href]:not([role])');
			for (var i = 0; i < links.length; i++) {
				linksset.push(manageOutput(links[i]));
			}
			//if (linksset.length > 0) {
				addResultSet(json, browser.i18n.getMessage("msgLinks"), {
					name: browser.i18n.getMessage("msgLink") + (linksset.length > 1 ? 's' : ''),
					type: 'humanneeded',
					data: linksset
				});
			//}
		
			/* Liens title*/
			var linksset = [];
			var linksseterror = [];
			var links = document.querySelectorAll('a[href][title]:not([role])');
			for (var i = 0; i < links.length; i++) {
				var link = links[i];
				if (link.getAttribute('title') == '') {
					linksseterror.push(manageOutput(links[i]));
				} else {
					linksset.push(manageOutput(links[i]));
				}
			}
			//if (linksset.length > 0) {
				addResultSet(json, browser.i18n.getMessage("msgLinks"), {
					name: browser.i18n.getMessage("msgLink") + (linksset.length > 1 ? 's' : '') + ' avec un titre',
					type: 'humanneeded',
					data: linksset,
					mark: '(title=&quot;(?:(?!&quot;).)*&quot;)'
				});
				
				addResultSet(json, browser.i18n.getMessage("msgLinks"), {
					name: browser.i18n.getMessage("msgLink") + (linksset.length > 1 ? 's' : '') + ' avec un titre vide',
					type: 'failure',
					data: linksseterror,
					mark: '(title=&quot;(?:(?!&quot;).)*&quot;)'
				});
			//}
		
			/* ARIA */
			var ariabuttons = [];
			var ariaimgs = [];
			var arialinks = [];
			var arialistboxes = [];
			var ariatextboxes = [];
		
			/* Roles */
			var duplicatedroles = [];
			var notallowedroles = [];
			var unknownroles = [];
			var emptyroles = [];
			var roles = [];
			var roleelements = document.querySelectorAll('[role]');
			for (var i = 0; i < roleelements.length; i++) {
				var roleelement = roleelements[i];
				var involveddata;
				if (roleelement.getAttribute('role') == '') {
					involveddata = emptyroles;
				}
				else if (ariaroles[roleelement.getAttribute('role')]) {
					var availableARIASemantics = roleelements[i].availableARIASemantics;
					var implicitARIASemantic = roleelements[i].implicitARIASemantic;
					if ('[role="' + roleelement.getAttribute('role') + '"]' == implicitARIASemantic) {
						involveddata = duplicatedroles;
					}
					else if (availableARIASemantics && availableARIASemantics.indexOf('[role="' + roleelement.getAttribute('role') + '"]') == -1) {
						involveddata = notallowedroles;
					}
					else {
						switch (roleelement.getAttribute('role')) {
							case 'button':
								involveddata = ariabuttons;
								break;
							case 'img':
								involveddata = ariaimgs;
								break;
							case 'link':
								involveddata = arialinks;
								break;
							case 'listbox':
								involveddata = arialistboxes; 
								break;
							case 'textbox':
								involveddata = ariatextboxes;
								break;
							default:
								involveddata = roles;
								break;
						}
					}
				}
				else {
					involveddata = unknownroles;
				}
				involveddata.push(manageOutput(roleelement));
			}
		
			/* Boutons via ARIA */
			//if (ariabuttons.length > 0) {
				addResultSet(json, 'Boutons', {
					name: 'Bouton' + (ariabuttons.length > 1 ? 's' : '') + ' implémenté' + (ariabuttons.length > 1 ? 's' : '') + ' via ARIA',
					type: 'humanneeded',
					data: ariabuttons,
					mark: '(role=&quot;(?:(?!&quot;).)*&quot;)'
				});
			//}
		
			/* Images via ARIA */
			//if (ariaimgs.length > 0) {
				addResultSet(json, 'Images', {
					name: 'Image' + (ariaimgs.length > 1 ? 's' : '') + ' implémentée' + (ariaimgs.length > 1 ? 's' : '') + ' via ARIA',
					type: 'humanneeded',
					data: ariaimgs,
					mark: '(role=&quot;(?:(?!&quot;).)*&quot;)'
				});
			//}
		
			/* Liens via ARIA */
			//if (arialinks.length > 0) {
				addResultSet(json, 'Liens', {
					name: 'Lien' + (arialinks.length > 1 ? 's' : '') + ' implémenté' + (arialinks.length > 1 ? 's' : '') + ' via ARIA',
					type: 'humanneeded',
					data: arialinks,
					mark: '(role=&quot;(?:(?!&quot;).)*&quot;)'
				});
			//}
		
			/* Champs de saisie via ARIA */
			//if (ariatextboxes.length > 0) {
				addResultSet(json, 'Champs de saisie', {
					name: 'Champ' + (ariatextboxes.length > 1 ? 's' : '') + ' de saisie implémenté' + (ariatextboxes.length > 1 ? 's' : '') + ' via ARIA',
					type: 'humanneeded',
					data: ariatextboxes,
					mark: '(role=&quot;(?:(?!&quot;).)*&quot;)'
				});
			//}
		
			//if (arialistboxes.length > 0) {
				addResultSet(json, 'Champs de saisie', {
					name: 'Liste de sélection implémentée via ARIA',
					type: 'humanneeded',
					data: arialistboxes,
					mark: '(role=&quot;(?:(?!&quot;).)*&quot;)'
				});
			//}
		
			/* Tabindex */
			var tabindex = [];
			var positivetabindex = [];
			var emptytabindex = [];
			var incorrecttabindex = [];
			var tabindexelements = document.querySelectorAll('[tabindex]');
			for (var i = 0; i < tabindexelements.length; i++) {
				var tabindexelement = tabindexelements[i];
				if (['0', '-1'].indexOf(tabindexelement.getAttribute('tabindex')) == -1) {
					if (tabindexelement.getAttribute('tabindex').trim() == '') {
						involveddata = emptytabindex;
					}
					else if (String(Math.floor(Number(tabindexelement.getAttribute('tabindex')))) === tabindexelement.getAttribute('tabindex') && String(Math.floor(Number(tabindexelement.getAttribute('tabindex')))) > 0) {
						involveddata = positivetabindex;
					}
					else {
						involveddata = incorrecttabindex;
					}
				}
				else {
					involveddata = tabindex;
				}
				involveddata.push(manageOutput(tabindexelement));
			}
		
			/* Regroupement des problématiques liées à ARIA */
			addResultSet(json, "Usage d'ARIA", {
				name: 'Rôle' + (notallowedroles.length > 1 ? 's' : '') + ' non autorisé' + (notallowedroles.length > 1 ? 's' : ''), 
				type: 'failure',
				description: 'La valeur de l\'attribut <code lang="en">role</code> est invalide car le rôle n\'est pas autorisé sur l\'élément (cf. <a href="https://www.w3.org/TR/html-aria/" lang="en" target="_blank" title="ARIA in HTML (new window)">ARIA in HTML</a>).', 
				data: notallowedroles,
				mark: '(role=&quot;(?:(?!&quot;).)*&quot;)'
			});
					
			addResultSet(json, "Usage d'ARIA", {
				name: 'Rôle' + (unknownroles.length > 1 ? 's' : '') +' inconnu' + (unknownroles.length > 1 ? 's' : ''), 
				type: 'failure',
				description: 'La valeur de l\'attribut <code lang="en">role</code> est invalide car le rôle est inconnu.', 
				data: unknownroles,
				mark: '(role=&quot;(?:(?!&quot;).)*&quot;)'
			});
		
			addResultSet(json, "Usage d'ARIA", { 
				name: 'Rôle' + (emptyroles.length > 1 ? 's' : '') + ' non spécifié' + (emptyroles.length > 1 ? 's' : ''), 
				type: 'failure',
				description: 'L\'attribut <code lang="en">role</code> ne peut être vide.', 
				data: emptyroles,
				mark: '(role=&quot;(?:(?!&quot;).)*&quot;)'
			});
		
			addResultSet(json, "Usage d'ARIA", { 
				name: 'Rôle' + (duplicatedroles.length > 1 ? 's' : '') + ' redondant'+ (duplicatedroles.length > 1 ? 's' : ''), 
				type: 'failure',
				description: 'La valeur de l\'attribut <code lang="en">role</code> est invalide car le rôle est identique à celui de l\'élément.', 
				data: duplicatedroles,
				mark: '(role=&quot;(?:(?!&quot;).)*&quot;)'
			});
		
			addResultSet(json, "Usage d'ARIA", {
				name: 'Rôle' + (roles.length > 1 ? 's' : '') + ' autorisé' + (roles.length > 1 ? 's' : ''), 
				type: 'humanneeded',
				description: 'La valeur de l\'attribut <code lang="en">role</code> est valide.', 
				data: roles,
				mark: '(role=&quot;(?:(?!&quot;).)*&quot;)'
			});
		
			addResultSet(json, "Usage d'ARIA", {
				name: 'Attribut' + (positivetabindex.length > 1 ? 's' : '') + ' <code lang="en">tabindex</code> avec valeur' + (positivetabindex.length > 1 ? 's' : '') + ' positive' + (positivetabindex.length > 1 ? 's' : ''),
				type: 'failure',
				description: 'L\'attribut <code lang="en">tabindex</code> ne peut avoir une valeur positive.',
				data: positivetabindex,
				mark: '(tabindex=&quot;(?:(?!&quot;).)*&quot;)'
			});
		
			addResultSet(json, "Usage d'ARIA", {
				name: 'Attribut' + (emptytabindex.length > 1 ? 's' : '') + ' <code lang="en">tabindex</code> avec valeur' + (emptytabindex.length > 1 ? 's' : '') + ' non spécifiée' + (emptytabindex.length > 1 ? 's' : ''),
				type: 'failure',
				description: 'L\'attribut <code lang="en">tabindex</code> ne peut être vide.',
				data: emptytabindex,
				mark: '(tabindex=&quot;(?:(?!&quot;).)*&quot;)'
			});
		
			addResultSet(json, "Usage d'ARIA", {
				name: 'Attribut' + (incorrecttabindex.length > 1 ? 's' : '') + ' <code lang="en">tabindex</code> avec valeur' + (incorrecttabindex.length > 1 ? 's' : '') + ' incorrecte' + (incorrecttabindex.length > 1 ? 's' : ''),
				type: 'failure',
				description: 'La valeur de l\'attribut <code lang="en">tabindex</code> est invalide.',
				data: incorrecttabindex,
				mark: '(tabindex=&quot;(?:(?!&quot;).)*&quot;)'
			});
		
			addResultSet(json, "Usage d'ARIA", {
				name: 'Attribut' + (tabindex.length > 1 ? 's' : '') + ' <code lang="en">tabindex</code> avec valeur' + (tabindex.length > 1 ? 's' : '') + ' autorisée' + (tabindex.length > 1 ? 's' : ''),
				type: 'humanneeded',
				description: 'La valeur de l\'attribut <code lang="en">tabindex</code> est valide.',
				data: tabindex,
				mark: '(tabindex=&quot;(?:(?!&quot;).)*&quot;)'
			});
		
			/* Valeur de retour */
			return json;
		}
	/* JSON (Résultats) */
	return analyze;
})


	