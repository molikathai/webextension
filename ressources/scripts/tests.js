/**
 * SOMMAIRE
 *
 * ACCESSIBILITE
 * 01 - Cadres
 * 02 - Titres de contenus 
 * 03 - Images
 * 04 - Liens
 * 05 - Liens images
 * 06 - Boutons
 * 07 - Boutons images
 * 08 - Formulaires
 * 09 - Scripts
 * 10 - Eléments obligatoires
 * -------- Eléments obsolètes
 * -------- Titre de la page
 * -------- Gestion des langues
 * -------- Sens de lecture
 * 11 - Structuration de l'information
 * 12 - Présentation de l'information
 * 
 * SEO
 * 
 * OPQUAST (règles spécifiques)
 * 
 * PIDILA (règles spécifiques)
 * 
 * 00 - Chargement des résultats
*/

/*************************************************
 ***** Accessibilité *****************************
 *************************************************/

// ------------------------------------------------
// --- CADRES -------------------------------------
// ------------------------------------------------

createTanaguruTest({
	lang: 'fr',
	name: "Présence d'un titre pour chaque cadre",
	query: 'iframe:not([role]):not([title])',
	expectedNbElements: 0,
	explanations: { 
		'passed': "Tous les cadres de cette page ont un titre.", 
		'failed': "Des éléments iframe sans attribut title sont présents dans cette page."
	},
	mark: '(title=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'frames', 'q5y', 'pidila'],
	ressources: { 'rgaa': ['2.1.1'], 'opquast': ['145'], 'pidila': ['Pi-357'] }
});

createTanaguruTest({
	lang: 'fr',
	name: "Pertinence du titre pour chaque cadre",
	query: 'iframe:not([role])[title]',
	filter: function (item) {
		var title = item.getAttribute('title');
		var src = item.getAttribute('src');
		if (title=="") {
			return  false;
		}
		if (title==src) {
			return false;
		}
		return true;
	},
	explanations: { 
		'cantTell': "Vérifiez que les titres des cadres en présence sont pertinents."
	},
	mark: '(title=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'frames', 'q5y', 'pidila'],
	ressources: { 'rgaa': ['2.1.1'], 'opquast': ['145'], 'pidila': ['Pi-357'] }
});

createTanaguruTest({
	lang: 'fr',
	name: "Non pertinence du titre pour chaque cadre",
	query: 'iframe:not([role])[title]',
	filter: function (item) {
		var title = item.getAttribute('title');
		var src = item.getAttribute('src');
		if (title=="") {
			return  true;
		}
		if (title==src) {
			return true;
		}
	},
	expectedNbElements: 0,
	explanations: {  
		'failed': "Des éléments iframe avec attribut title non pertinent sont présents dans cette page."
	},
	mark: '(title=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'frames', 'q5y', 'pidila'],
	ressources: { 'rgaa': ['2.2.1'], 'opquast': ['145'], 'pidila': ['Pi-357'] }
});

// ------------------------------------------------
// --- TITRES DE CONTENUS -------------------------
// ------------------------------------------------

createTanaguruTest({
	lang: 'fr',
	name: "Présence d'au moins un titre de niveau 1.",
	query: 'h1:not([role]):not([aria-level]), h1[role="heading"]:not([aria-level]), [role="heading"][aria-level="1"]',
	expectedNbElements: { min: 1 },
	explanations: { 
		'passed': "Un titre de niveau 1 (élément h1) est présent dans la page.", 
		'failed': "Cette page ne contient pas de titre de niveau 1 (élément h1)."
	},
	tags: ['a11y', 'headings', 'SEO', 'pidila', 'q5y'],
	ressources: { 'rgaa': ['9.1.1'], 'opquast': ['13'], 'pidila': ['Pi-362'], 'opquast-seo': ['10'] }
});

createTanaguruTest({
	lang: 'fr',
	name: "Pertinence des titres de contenus.",
	query: 'h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role]), [role="heading"]',
	explanations: {
		'cantTell': "Vérifiez que les titres de contenus en présence sont pertinents."
	},
	tags: ['a11y', 'headings', 'SEO', 'pidila', 'q5y'],
	ressources: { 'rgaa': ['9.1.4'], 'pidila': ['Pi-362'], 'opquast': ['13'] }
});


// ------------------------------------------------
// --- IMAGES -------------------------------------
// ------------------------------------------------

createTanaguruTest({
	lang: 'fr',
	name: 'Images (balise area) sans attribut alt.',
	query: 'area[href]:not([role]):not([alt])',
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'éléments area sans attribut alt.",
		'failed': "Des éléments area sans attribut alt sont présents dans la page."
	},
	tags: ['a11y', 'images'],
	ressources: { 'rgaa': ['1.2.3'] }
});

createTanaguruTest({
	lang: 'fr',
	name: 'Images (balise area) sans attribut alt.',
	query: 'area[href]:not([role]):not([alt])',
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'éléments area sans attribut alt.",
		'failed': "Des éléments area sans attribut alt sont présents dans la page."
	},
	tags: ['a11y', 'images'],
	ressources: { 'rgaa': ['1.1.2'] }
});

createTanaguruTest({
	lang: 'fr',
	name: 'Images (balise area) avec une alternative vide et un attribut title, aria-label, aria-describedby ou aria-labelledby.',
	query: 'area[alt=""][title]:not([role]) ,area[alt=""][aria-label]:not([role]), area[alt=""][aria-labelledby]:not([role]), area[alt=""][aria-describedby]:not([role])',
	expectedNbElements: 0,
	explanations: {
		'failed': "Des éléments area avec un attribut alt vide et un attribut title, aria-label, aria-describedby ou aria-labelledby sont présents dans la page"
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images'],
	ressources: { 'rgaa': ['1.2.2'] }
});

createTanaguruTest({
	lang: 'fr',
	name: 'Images (balise area) sans attribut href avec un attribut alt rempli.',
	query: 'area[alt]:not([role]):not([href])',
	filter: function (item) {
		return item.getAttribute('alt') != ""
	},
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'éléments area de décoration (sans attribut href) avec attribut alt renseigné.",
		'failed': "Des éléments area de décoration (sans attribut href) avec attribut alt renseigné sont présents dans la page."
	},
	tags: ['a11y', 'images'],
	ressources: { 'rgaa': ['1.2.2'] }
});

createTanaguruTest({
	lang: 'fr',
	name: 'Images informative (balise area) avec attribut alt vide.',
	query: 'area[href][alt=""]:not([role])',
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'éléments cliquables area avec un attribut alt vide.",
		'failed': "Des éléments cliquables area avec un alt vide sont présents dans la page."
	},
	tags: ['a11y', 'images'],
	ressources: { 'rgaa': ['1.3.2'] }
});

createTanaguruTest({
	lang: 'fr',
	name: "Images cliquables (balise area) avec un attribut title, aria-label ou aria-labelledby différent de l'attribut alt.",
	query: 'area[alt][href]:not([alt=""]):not([role])',
	filter: function (item) {
		var alt = item.getAttribute('alt');
		if (item.hasAttribute('title')) {
			return  alt != item.getAttribute('title');
		}
		if (item.hasAttribute('aria-label')) {
			return alt != item.getAttribute('aria-label');
		}
		if (item.hasAttribute('aria-labelledby')) {
			var AttrLabelledby = item.getAttribute('aria-labelledby');
			if (document.querySelector('*[id="'+AttrLabelledby+'"]') != null){
				return document.querySelector('*[id="'+AttrLabelledby+'"]').textContent != alt;
			};
		};
	},
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'images cliquables (area) dont l'attribut aria-label ou aria-labelledby sont différents de l'attibut alt.",
		'failed': "Des éléments cliquables (area) ont un attribut title, aria-label ou aria-labelledby différents de l'attibut alt."
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images', 'pidila', 'q5y'],
	ressources: { 'rgaa': ['1.3.2'], 'pidila': ['Pi-304', 'Pi-305'], 'opquast': ['2, 3'] }
});

createTanaguruTest({
	lang: 'fr',
	name: 'Images (balise img) sans attribut alt.',
	query: 'img:not([role]):not([alt]), img[role="img"]:not([alt])',
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'éléments img sans attribut alt.",
		'failed': "Des éléments img sans attribut alt sont présents dans la page."
	},
	tags: ['a11y', 'images', 'SEO'],
	ressources: { 'rgaa': ['1.1.1'] }
});

createTanaguruTest({
	lang: 'fr',
	name: "Images (balise img) avec une alternative vide et un attribut title, aria-label, aria-describedby ou aria-labelledby.",
	query: 'img[alt=""][title]:not([role]), img[alt=""][title][role="img"] ,img[alt=""][aria-label]:not([role]), img[alt=""][aria-label][role="img"], img[alt=""][aria-labelledby]:not([role]), img[alt=""][aria-labelledby][role="img"], img[alt=""][aria-describedby]:not([role]), img[alt=""][aria-describedby][role="img"]',
	expectedNbElements: 0,
	explanations: {
		'failed': "Des éléments img avec un attribut alt vide et un attribut title, aria-label, aria-describedby ou aria-labelledby sont présents dans la page."
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images'],
	ressources: { 'rgaa': ['1.2.1'] }
});

createTanaguruTest({
	lang: 'fr',
	name: "Images (balise img) avec une alternative vide.",
	query: 'img[alt=""]:not([title]):not([role]), img[alt=""]:not([title])[role="img"] ,img[alt=""]:not([aria-label]):not([role]), img[alt=""]:not([aria-label])[role="img"], img[alt=""]:not([aria-labelledby]):not([role]), img[alt=""]:not([aria-labelledby])[role="img"], img[alt=""]:not([aria-describedby]):not([role]), img[alt=""]:not([aria-describedby])[role="img"]',
	explanations: {
		'cantTell': "Vérifier que ces images sont bien des images de décoration.",
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images'],
	ressources: { 'rgaa': ['1.2.1'] }
});

createTanaguruTest({
	lang: 'fr',
	name: 'Images (balise img) avec attribut alt renseigné.',
	query: 'img[alt]:not([role]):not([alt=""]), img[alt][role="img"]:not([alt=""])',
	filter: function (item) {
		return !item.matches('a[href]:not([role]) img, [role="link"] img, button:not([role]) img, [role="button"] img');
	},
	explanations: {
		'cantTell': "Vérifier que ces images sont bien des images informatives.",
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images'],
	ressources: { 'rgaa': ['1.2.1', '1.3.1'] }
});

createTanaguruTest({
	lang: 'fr',
	name: "Images (balise img) avec un attribut title, aria-label ou aria-labelledby différent de l'attribut alt.",
	query: 'img[alt]:not([alt=""]):not([role]), img[alt]:not([alt=""])[role="img"]',
	filter: function (item) {
		var alt = item.getAttribute('alt');
		if (item.hasAttribute('title')) {
			return  alt != item.getAttribute('title');
		}
		if (item.hasAttribute('aria-label')) {
			return alt != item.getAttribute('aria-label');
		}
		if (item.hasAttribute('aria-labelledby')) {
			return  alt != item.getAttribute('aria-labelledby');
		}
	},
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'images dont l'attribut aria-label ou aria-labelledby est différent de l'attibut alt.",
		'failed': "Des éléments img ont un attribut title, aria-label ou aria-labelledby différent de l'attibut alt."
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images'],
	ressources: { 'rgaa': ['1.3.1'] }
});


// ------------------------------------------------
// --- LIENS --------------------------------------
// ------------------------------------------------

createTanaguruTest({
	lang: 'fr',
	name: 'Liens sans attribut title.',
	query: 'a[href]:not([role]):not([title])',
	tags: ['links']
});

createTanaguruTest({
	lang: 'fr',
	name: 'Liens avec attribut title renseigné.',
	query: 'a[href][title]:not([role])',
	filter: function (item) {
		return item.getAttribute('title').trim().length > 0;
	},
	mark: '(title=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'links'],
	ressources: { 'rgaa': ['6.2.1', '6.2.2', '6.2.3'] }
});

createTanaguruTest({
	lang: 'fr',
	name: 'Liens avec attribut title vide.',
	query: 'a[href][title]:not([role])',
	filter: function (item) {
		return item.getAttribute('title').trim().length == 0;
	},
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'éléments a avec attribut title vide.",
		'failed': "Des éléments a avec attribut title vide sont présents dans la page."
	},
	mark: '(title=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'links'],
	ressources: { 'rgaa': ['6.2.1', '6.2.2', '6.2.3'] }
});

// ------------------------------------------------
// --- LIENS IMAGES  ------------------------------
// ------------------------------------------------

createTanaguruTest({
	lang: 'fr',
	name: 'Liens images sans intitulé.',
	query: 'a[href]:not([role]) > img[alt=""]:not([role]):only-child, a[href]:not([role]) > img[role="img"][alt=""]:only-child, a[href]:not([role]) > img[role="presentation"][alt]:only-child, [role="link"] > img[alt=""]:not([role]):only-child, [role="link"] > img[role="img"][alt=""]:only-child, [role="link"] > img[role="presentation"][alt]:only-child',
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas de liens images sans intitulé.",
		'failed': "Des liens images sans intitulé sont présents dans la page."
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images', 'links', 'pidila', 'q5y'],
	ressources: { 'rgaa': ['6.5.1'], 'pidila': ['Pi-322'], 'opquast': ['107'] }
});

// ------------------------------------------------
// --- BOUTONS ------------------------------------
// ------------------------------------------------

createTanaguruTest({
	lang: 'fr',
	name: 'Boutons.',
	query: 'button:not([role]), input[type="reset"]:not([role]), input[type="submit"]:not([role])',
	tags: ['buttons']
});

// ------------------------------------------------
// --- BOUTONS IMAGES  ----------------------------
// ------------------------------------------------

createTanaguruTest({
	lang: 'fr',
	name: 'Boutons images avec attribut alt.',
	query: 'input[alt][type=image]:not([role])',
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images', 'buttons', 'pidila'],
	ressources: { 'rgaa': ['1.3.3'], 'pidila': ['Pi-304'] }
});

createTanaguruTest({
	lang: 'fr',
	name: 'Boutons Images sans attribut alt.',
	query: 'input[type=image]:not([role]):not([alt])',
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'éléments input type='image' sans attribut alt.",
		'failed': "Des éléments input type='image' sans attribut alt sont présents dans la page."
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images', 'buttons', 'pidila'],
	ressources: { 'rgaa': ['1.1.3'], 'pidila': ['Pi-302'] }
});

createTanaguruTest({
	lang: 'fr',
	name: 'Boutons Images avec un attribut alt vide.',
	query: 'input[alt][type=image]:not([role]):not([title]):not([aria-label]):not([aria-labelledby])',
	filter: function (item) {
		return item.getAttribute('alt').trim().length == 0;
	},
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'éléments input type='image' sans attribut alt.",
		'failed': "Des éléments input type='image' sans attribut alt sont présents dans la page."
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images', 'buttons', 'pidila'],
	ressources: { 'rgaa': ['1.3.3'], 'pidila': ['Pi-304'] }
});


createTanaguruTest({
	lang: 'fr',
	name: "Boutons Images avec un attribut title, aria-label ou aria-labelledby différent de l'attribut alt.",
	query: 'input[alt][type=image]:not([alt=""]):not([role])',
	filter: function (item) {
		var alt = item.getAttribute('alt');
		if (item.hasAttribute('title')) {
			return  alt != item.getAttribute('title');
		}
		if (item.hasAttribute('aria-label')) {
			return alt != item.getAttribute('aria-label');
		}
		if (item.hasAttribute('aria-labelledby')) {
			var AttrLabelledby = item.getAttribute('aria-labelledby');
			if (document.querySelector('*[id="'+AttrLabelledby+'"]') != null){
				return document.querySelector('*[id="'+AttrLabelledby+'"]').textContent != alt;
			};
		};
	},
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas de boutons images dont l'attribut title, aria-label ou aria-labelledby est différent de l'attibut alt.",
		'failed': "Des éléments boutons images ont un attribut title, aria-label ou aria-labelledby différent de l'attibut alt."
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images', 'buttons', 'pidila'],
	ressources: { 'rgaa': ['1.3.3'], 'pidila': ['Pi-304'] }
});

// ------------------------------------------------
// --- FORMULAIRES --------------------------------
// ------------------------------------------------

createTanaguruTest({
lang: 'fr',
name: "Absence d'étiquette pour les éléments de formulaire natifs.",
query: 'input:not([type="image"]):not([type="button"]):not([type="hidden"]):not([type="submit"]):not([type="reset"]):not([role]), select:not([role]), textarea:not([role])',
filter: function (item) {
	if ((item.hasAttribute('title')) || (item.hasAttribute('aria-labelledby')) || (item.hasAttribute('id')) || (item.hasAttribute('aria-label')))  {
		if(item.hasAttribute('id')){
		var AttrId = item.getAttribute('id');
		if (document.querySelector('label[for="'+AttrId+'"]') == null){
				return true;
			};
		};
		return false;
	};
	return true;
},
expectedNbElements: 0,
explanations: {
	'passed': "Cette page ne contient pas d'éléments de formulaire natifs sans étiquette.",
	'failed': "Des éléments de formulaire natifs n'ont pas d'étiquette."
},
mark: '(\sid=&quot;(?:(?!&quot;).)*&quot;)',
tags: ['a11y', 'forms', 'labels', 'pidila', 'q5y'],
ressources: { 'rgaa': ['11.1.1'], 'pidila': ['Pi-313'], 'opquast': ['85'] }
});

createTanaguruTest({
	lang: 'fr',
	name: "Absence d'étiquette pour les éléments de formulaire aria.",
	query: '*[role="checkbox"], *[role="radio"], *[role="textbox"], *[role="combobox"]',
	filter: function(item) {
			// (à sortir title puisque alt > title + title pouvant servir côté UI/UX)
			if (!item.matches('[aria-labelledby], [aria-label], [title]')) {
				if (item.matches('img')) {
					// Image (possibilité de gérer le sans alt).
					return item.getAttribute('alt') == '';
				}
				else {
					var cloneditem = item.cloneNode(true);
					var clonedimg = cloneditem.querySelectorAll('img');
					for (var i = 0; i < clonedimg.length; i++) {
						var text = document.createTextNode(clonedimg[i].hasAttribute('alt') ? clonedimg[i].getAttribute('alt') : '');
						clonedimg[i].parentNode.replaceChild(text, clonedimg[i]);
					}
					return cloneditem.textContent.trim().length == 0;
				}
			}
			else {
				return false;
			};
		},
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'éléments de formulaire implémentés via Aria sans etiquette.",
		'failed': "Des éléments champs de formulaire implémentés via aria n'ont pas d'étiquette."
	},
	mark: '(\sid=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'forms', 'labels', 'aria', 'pidila'],
	ressources: { 'rgaa': ['7.1.1'], 'pidila': ['Pi-348'] }
	});

// ------------------------------------------------
// --- SCRIPTS ------------------------------------
// ------------------------------------------------

createTanaguruTest({
	lang: 'fr',
	name: "Les composants d’interface implémentés via un rôle ARIA sont accessibles au clavier.",
	query: '*[role="checkbox"], *[role="radio"], *[role="textbox"], *[role="combobox"], *[role="contenteditable"]',
	filter: function (item) {
		if (item.hasAttribute('tabindex')){
			return false;
			}
		else return true;
	},
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'éléments impléments via Aria non accessibles au clavier.",
		'failed': "Des composants d’interface implémentés via un rôle ARIA sont accessibles au clavier (via l'attribut tabindex)."
	},
	mark: '(tabindex=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'forms', 'labels', 'aria', 'pidila'],
	ressources: { 'rgaa': ['7.3.1'], 'pidila': ['Pi-327'] }
	});

// ------------------------------------------------
// --- ELEMENTS OBLIGATOIRES  ---------------------
// ------------------------------------------------

// Eléments obsolètes

createTanaguruTest({
	lang: 'fr',
	name: "Les balises obsolètes.",
	query: 'applet, acronym, bgsound, dir, frame, frameset, noframes, isindex, listing, xmp, nextid, noembed, plaintext, rb, basefont, big, blink, center, font, marquee, multicol, nobr, s, spacer, strike, tt, u, wbr',
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'éléments obsolètes.",
		'failed': "Des balises obsolètes sont présentes dans la page."
	},
	tags: ['a11y', 'Deprecated', 'pidila'],
	ressources: { 'rgaa': ['8.2.2'], 'pidila': ['Pi-360'] }
	});

	createTanaguruTest({
	lang: 'fr',
	name: "Les attributs obsolètes.",
	query: 'a[charset], link[charset], a[coords], a[shape], a[methods], a[name], embed[name], img[name], option[name], a[urn], link[urn], form[accept], area[hreflang], head[profile], html[version], input[ismap], input[usemap], iframe[longdesc], img[longdesc], link[target], meta[scheme], object[archive], object[classid], object[code], object[codebase], object[codetype], object[declare], object[standby], param[type], param[valuetype], script[language], script[event], script[for], table[datapagesize], table[summary], td[abbr], td[axis], th[axis], td[scope], a[datasrc], applet[datasrc],button[datasrc],div[datasrc], frame[datasrc], iframe[datasrc], img[datasrc], input[datasrc], label[datasrc], legend[datasrc], marquee[datasrc], object[datasrc], option[datasrc], select[datasrc], table[datasrc], textarea[datasrc], a[datafld], applet[datafld], button[datafld], div[datafld], fieldset[datafld], frame[datafld], iframe[datafld], img[datafld], input[datafld], label[datafld], legend[datafld], marquee[datafld], object[datafld], param[datafld], select[datafld], text[datafld], button[dataformatas], div[dataformatas], input[dataformatas], label[dataformatas], legend[dataformatas], marquee[dataformatas], object[dataformatas], option[dataformatas], select[dataformatas], a[dataformatas], table[dataformatas], body[alink], body[bgcolor], body[bottommargin], body[leftmargin], body[link], body[marginheight], body[marginwidth], body[rightmargin], body[text], body[topmargin], body[vlink], br[clear], caption[align], col[align], col[widht], div[align], dl[compact], embed[align], embed[hspace], embed[vspace], frame[bodercolor], hr[align], hr[color], hr[noshade], hr[size], hr[width], h1[align], h2[align], h3[align], h4[align], h5[align], h6[align], iframe[align], iframe[allowtransparency], iframe[frameborder], iframe[framespacing], iframe[hspace], iframe[marginheight], iframe[marginwidth], iframe[scrolling], iframe[vspace], input[align], input[border], input[hspace], input[vspace], img[align], img[border], img[hspace], img[vspace], legend[align], li[type], menu[compact], marquee[bgcolor], marquee[height], marquee[hspace], marquee[vspace], marquee[width], object[align], object[border], object[hspace], object[vspace], ol[compact], p[align], pre[width], table[align], table[bgcolor], table[border], table[bordercolor], table[cellpadding], table[callspacing], table[frame], table[height], table[rules], table[width], tbody[align], thead[align], tfoot[align], tbody[char], thead[char], tfoot[char], tbody[charoff], thead[charoff], tfoot[charoff], tbody[valign], thead[valign], tfoot[valign], td[align], th[align], td[bgcolor], th[bgcolor], td[char], th[char], td[charoff], th[charoff], td[height], th[height], td[nowrap], th[nowrap], td[valign], th[valign], td[with], th[width], tr[align], tr[bgcolor], tr[char], tr[charoff], tr[height], tr[valign], ul[compact], ul[type], body[background], table[background], thead[background],tbody[background], tfoot[background],tr[background], td[background], th[background]',
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'attributs obsolètes.",
		'failed': "Des attributs obsolètes sont présents dans la page."
	},
	tags: ['a11y', 'Deprecated'],
	ressources: { 'rgaa': ['8.1.2'] }
	});

// Titre de la page

createTanaguruTest({
	lang: 'fr',
	name: "Présence du titre de la page.",
	query: 'head>title',
	expectedNbElements: 1,
	explanations: {
		'passed': "La page a un titre de page.",
		'failed': "Aucun titre (balise title dans la balise head) dans la page."
	},
	tags: ['a11y', 'Mandatory', 'SEO'],
	ressources: { 'rgaa': ['8.5.1'] }
	});

createTanaguruTest({
	lang: 'fr',
	name: "Pertinence du titre de la page.",
	query: 'head>title',
	filter: function (item) {
		var tagTitle =  item != null;
		if (tagTitle) {
			return item.textContent == "";
		}
	},
	expectedNbElements: 0,
	explanations: {
		'failed': "Le titre de la page est vide."
	},
	mark: '(title=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'Mandatory'],
	ressources: { 'rgaa': ['8.6.1'] }
	});

// Gestion des langues

createTanaguruTest({
	lang: 'fr',
	name: "Présence de la langue par défaut.",
	query: 'html[lang]',
	expectedNbElements: 1,
	explanations: {
		'passed': "La langue par défaut est présente dans la page.",
		'failed': "Aucune langue par défaut n'est définie dans la page."
	},
	mark: '(lang=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'Mandatory', 'SEO'],
	ressources: { 'rgaa': ['8.5.1'] }
});

createTanaguruTest({
	lang: 'fr',
	name: "Pertinence de la langue par défaut.",
	query: 'html[lang=""]',
	expectedNbElements: 0,
	explanations: {
		'failed': "la langue par défaut est vide."
	},
	mark: '(lang=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'Mandatory', 'SEO'],
	ressources: { 'rgaa': ['8.4.1'] }
});

createTanaguruTest({
lang: 'fr',
name: "Ne pas associer de label à un champ de formulaire de type hidden.",
query: 'input[type="hidden"][id]',
filter: function(item) {
	var AttrId = item.getAttribute('id');
	if (document.querySelector('label[for="'+AttrId+'"]') == null){
		return false;
	};
	return true;
},
	expectedNbElements: 0,
	explanations: {
		'failed': "Des éléments champs de formulaire de type hidden sont associées à une balise label."
	},
	mark: '(for=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'Mandatory', 'pidila'],
	ressources: { 'rgaa': ['8.2.1'], 'pidila': ['Pi-360'] }
});

createTanaguruTest({
lang: 'fr',
name: "Information via l'attribut aria-labelledby.",
query: '*[aria-labelledby]',
filter: function(item) {
	var AttrLabelledby = item.getAttribute('aria-labelledby');
	return document.querySelector('*[id="'+AttrLabelledby+'"]') == null;
},
	expectedNbElements: 0,
	explanations: {
		'failed': "Des attributs aria-labelledby ne correspondent à aucun élément de la page."
	},
	mark: '(for=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'Mandatory', 'pidila'],
	ressources: { 'rgaa': ['8.2.1'], 'pidila': ['Pi-360'] }
});

// Sens de lecture

createTanaguruTest({
	lang: 'fr',
	name: "Pertinence des indications sur le sens de lecture.",
	query: '[dir="ltr"], [dir="rtl"]',
	explanations: {
		'cantTell': "Vérifier la pertinence des attributs indiquant le sens de lecture."
	},
	tags: ['a11y', 'Mandatory', 'pidila'],
	ressources: { 'rgaa': ['8.10.2'], 'pidila': ['Pi-359'] }
});

createTanaguruTest({
	lang: 'fr',
	name: "Conformité des indications sur le sens de lecture.",
	query: '*[dir]',
	filter: function(item){
		var dirAttr = item.getAttribute('dir').toLowerCase();

		if (dirAttr !== 'ltr' && dirAttr !== 'rtl') {
			return true;
		}

		return false;
	},
	expectedNbElements: 0,
	explanations: {
		'passed' : "Les valeurs des attributs 'dir' sont conformes ('rtl' ou 'ltr').",
		'failed': "Les valeurs des attributs 'dir' ne sont pas conformes."
	},
	tags: ['a11y', 'Mandatory', 'pidila'],
	ressources: { 'rgaa': ['8.10.2'], 'pidila': ['Pi-359'] }
})

// ------------------------------------------------
// --- STRUCTURATION DE L'INFORMATION  ------------
// ------------------------------------------------

createTanaguruTest({
	lang: 'fr',
	name: "Structure du document : Pertinence de balises structurantes.",
	query: 'header, nav, footer, main',
	explanations: {
		'cantTell' : "Vérifier la pertinence de ces balises. La balise <header> correspond-elle à la zone d'en-tête de la page ? La et les balise(s) <nav> correspondent-elles aux zones de navigation ? La balise <footer> correspond-elle à la zone de pied de page de la page ? La balise <main> correspond-elle à la zone de contenu principal de la page ?"
	},
	tags: ['a11y', 'Structure', 'pidila'],
	ressources: { 'rgaa': ['9.2.1'], 'pidila': ['Pi-363'] }
})

createTanaguruTest({
	lang: 'fr',
	name: "Structure du document : Unicité de la zone de contenu principal.",
	query: 'main, [role="main"]:not(main)',
	expectedNbElements : { max: 1 },
	explanations: {
		'passed' : "La zone de contenu principal est unique.",
		'failed' : "Il existe plusieurs zones identifiées comme zones de contenu principal sur cette page."
	},
	tags: ['a11y', 'Structure', 'pidila'],
	ressources: { 'rgaa': ['9.2.1', '12.10.1'], 'pidila': ['Pi-363'] }
})

createTanaguruTest({
	lang: 'fr',
	name: "Pertinence de l'usage des balises de citation.",
	query: 'q, blockquote',
	explanations: {
		'cantTell' : "Vérifier que les balises 'q' sont utilisées pour des citations courtes et que les balises 'blockquote' sont utilisées pour des blocs de citation."
	},
	tags: ['a11y', 'Structure', 'pidila'],
	ressources: { 'rgaa': ['9.6.1', '9.6.2'], 'pidila': ['Pi-366'] }
})

// ------------------------------------------------
// --- PRESENTATION DE L'INFORMATION  -------------
// ------------------------------------------------

createTanaguruTest({
	lang: 'fr',
	name: "Les balises de présentation de l'information.",
	query: 'basefont, blink, center, font, marquee, s, strike, tt, u, bing, small',
	expectedNbElements: 0,
	explanations: {
		'passed' : "Cette page ne contient aucune balise de présentation de l'information dans son code source.",
		'failed' : "Des balises de présentation de l'information sont présentes sur cette page."
	},
	tags: ['a11y', 'Presentation', 'pidila', 'q5y'],
	ressources: { 'rgaa': ['10.1.1'], 'pidila': ['Pi-342'], 'opquast': ['24'] }
})

createTanaguruTest({
	lang: 'fr',
	name: "Les attributs de présentation de l'information.",
	query: '[align], [alink], [background], [bgcolor], [border], [cellpading], [cellspacing], [char], [charoff], [clear], [compact], [color], [frameborder],[hspace], [link], [marginheight], [marginwidth], [text], [valign], [vlink], [vspace], [size], [width], [height]',
	filter: function(item){
		var nodeName = item.nodeName;
		var widthAttr = item.attributes.width;
		var heightAttr = item.attributes.height;

		/** Si l'élément possède les attributs width et/ou height, et s'il s'agit 
		 * d'un élément img, svg, canvas, embed ou object : exclure l'élément de l'échantillon.
		 * Sinon, on le laisse. Ainsi un élément img[width] ne sera pas ajouté.
		 */

		if (widthAttr !== undefined || heightAttr !== undefined) {
			if (nodeName == 'IMG' || nodeName == 'SVG' || nodeName == 'CANVAS' || nodeName == 'EMBED' || nodeName == 'OBJECT') {
				return false;
			}

			return true;
		}

		return true;
	},
	expectedNbElements: 0,
	explanations: {
		'passed' : "Cette page ne contient aucun attribut de présentation de l'information dans son code source.",
		'failed' : "Des attributs de présentation de l'information sont présents sur cette page."
	},
	tags: ['a11y', 'Presentation', 'pidila', 'q5y'],
	ressources: { 'rgaa': ['10.1.2'], 'pidila': ['Pi-342'], 'opquast': ['24'] }
})

/*************************************************
 ***** SEO ***************************************
 *************************************************/

createTanaguruTest({
	lang: 'fr',
	name: "Présence d'une metadonnée de description.",
	query: 'head > meta[name="description"]',
	expectedNbElements: 1,
	explanations: {
		'passed' : "Cette page contient une balise de métadonnée de description.",
		'failed' : "Aucune balise de métadonnée de description n'est renseignée, ou plus d'une balise de métadonnée de description est présente sur la page."
	},
	tags: ['SEO']
})

createTanaguruTest({
	lang: 'fr',
	name: "Présence d'une metadonnée de description.",
	query: 'head > meta[name="description"]',
	filter: function(item){
		if (item.textContent !== ''){
			return true;
		}

		return false;
	},
	explanations: {
		'cantTell' : "Vérifier que le contenu de l'élément meta description est une phrase significative et non une liste de mots clefs."
	},
	tags: ['SEO'],
	ressources: { 'opquast-seo':['48'] }
})

createTanaguruTest({
	lang: 'fr',
	name: "La métadonnée de description contient moins de 250 caractères.",
	query: 'head > meta[name="description"]',
	expectedNbElements: 0,
	filter: function(item){
		if (item.length > 250){
			return true;
		}

		return false;
	},
	explanations: {
		'passed' : "La valeur de la métadonnée de description contient moins de 250 caractères.",
		'failed' : "La valeur de la métadonnée de description contient plus de 250 caractères."
	},
	tags: ['SEO'],
	ressources: { 'opquast-seo':['49'] }
})

createTanaguruTest({
	lang: 'fr',
	name: "Les styles CSS sont externalisés.",
	query: 'head > style, [style]',
	expectedNbElements: 0,
	filter: function(item){
		var styleAttr = item.getAttribute('style');

		if (item.nodeName == 'STYLE' && item.textContent) {
			return true;
		} else if (styleAttr && styleAttr !== "") {
			return true;
		}

		return false;
	},
	explanations: {
		'passed' : "Tous les éléments de styles CSS sont externalisés.",
		'failed' : "Au moins une balise de style ou un attribut de style non vide est présent dans la page."
	},
	mark: '(style=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['SEO'],
	ressources: { 'opquast-seo':['74'] }
})

createTanaguruTest({
	lang: 'fr',
	name: "Le titre contient moins de 80 caractères.",
	query: 'head > title',
	expectedNbElements: 0,
	filter: function(item){
		// 80 caractères est un compromis compte tenu du nombre de caractères
		// affichés par les résultats Google sur desktop et sur mobile.
		if (item.length > 80){
			return true;
		}

		return false;
	},
	explanations: {
		'passed' : "Le titre de la page contient moins de 80 caractères.",
		'failed' : "Le titre de la page contient plus de 80 caractères."
	},
	tags: ['SEO', 'pidila'],
	ressources: { 'pidila':['Pi-412'], 'opquast-seo':['46'] }
})

createTanaguruTest({
	lang: 'fr',
	name: "Les images sont indexables par les principaux moteurs de recherche.",
	query: 'img[src]',
	expectedNbElements: 0,
	filter: function(item){
		var imgFormat = item.getAttribute('src').split('.').pop().toLowerCase();
		var ext = ['jpg', 'jpeg', 'gif', 'png', 'svg'];

		if (ext.indexOf(imgFormat) == -1) {
			return true;
		}

		return false;
	},
	explanations: {
		'passed' : "Tous les formats d'images sont indexables par les principaux moteurs de recherche (svg, png, jpeg, gif).",
		'failed' : "Certaines images ne sont pas dans un format indexable par les principaux moteurs de recherche. Remplacer ces images par des images au format SVG, JPEG, GIF ou PNG."
	},
	tags: ['SEO'],
	ressources: { 'opquast-seo':['20'] }
})

/*************************************************
 ***** Opquast ***********************************
 *************************************************/

createTanaguruTest({
	lang: 'fr',
	name: "Le site n'emploie pas la technique des jeux de cadres.",
	query: 'frameset, frame, noframes',
	expectedNbElements: 0,
	explanations: { 
		'passed': "Les balises frameset, frame et noframes ne sont pas utilisées dans cette page", 
		'failed': "Des éléments framest, frame ou noframes sont présents dans cette page."
	},
	mark: '(title=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['q5y','pidila'],
	ressources: { 'pidila':['Pi-368'], 'opquast':['146'] }
})

createTanaguruTest({
	lang: 'fr',
	name: "la balise meta viewport ne contient pas la propriété minimum-scale.",
	query: 'meta[name="viewport"][content]',
	filter: function (item) {
		return item.content.toLowerCase().includes('minimum-scale') 
	},
	expectedNbElements: 0,
	explanations: { 
		'passed': "la balise meta viewport ne contient pas la propriété minimum-scale.", 
		'failed': "la balise meta viewport contient la propriété minimum-scale."
	},
	mark: '(content=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['q5y','pidila'],
	ressources: { 'pidila':['Pi-344'], 'opquast':['139'] }
})

createTanaguruTest({
	lang: 'fr',
	name: "la balise meta viewport ne contient pas la propriété maximum-scale.",
	query: 'meta[name="viewport"][content]',
	filter: function (item) {
		return item.content.toLowerCase().includes('maximum-scale') 
	},
	expectedNbElements: 0,
	explanations: { 
		'passed': "la balise meta viewport ne contient pas la propriété maximum-scale.", 
		'failed': "la balise meta viewport contient la propriété maximum-scale."
	},
	mark: '(content=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['q5y','pidila'],
	ressources: { 'pidila':['Pi-344'], 'opquast':['139'] }
})

createTanaguruTest({
	lang: 'fr',
	name: "la balise meta viewport ne contient pas la propriété user-scalable.",
	query: 'meta[name="viewport"][content]',
	filter: function (item) {
		return item.content.toLowerCase().includes('user-scalable') 
	},
	expectedNbElements: 0,
	explanations: { 
		'passed': "la balise meta viewport ne contient pas la propriété user-scalable.", 
		'failed': "la balise meta viewport contient la propriété user-scalable."
	},
	mark: '(content=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['q5y','pidila'],
	ressources: { 'pidila':['Pi-344'], 'opquast':['139'] }
})

/*************************************************
 ***** Pidila ************************************
 *************************************************/

createTanaguruTest({
	lang: 'fr',
	name: "Présence d'une page mentions légales dans le pied de page",
	query: 'footer a',
	filter: function (item) {
		return item.textContent.toLowerCase().includes('mentions légales');
	},
	expectedNbElements: 1,
	explanations: { 
		'passed': "Il existe un lien vers la page mentions légales dans cette page", 
		'failed': "Le lien vers la page mentions légales est absent dans cette page."
	},
	tags: ['q5y','pidila'],
	ressources: { 'pidila':['Pi-008', 'Pi-032'],'opquast':['26'] }
})

createTanaguruTest({
	lang: 'fr',
	name: "Présence d'une page accessibilité dans le pied de page",
	query: 'footer a',
	filter: function (item) {
		return item.textContent.toLowerCase().includes('accessibilité');
	},
	expectedNbElements: 1,
	explanations: { 
		'passed': "Il existe un lien vers la page accessibilité dans cette page", 
		'failed': "Le lien accessibilité est absent dans cette page."
	},
	tags: ['q5y','pidila'],
	ressources: { 'pidila':['Pi-010', 'Pi-032'],'opquast':['26'] } 
})

createTanaguruTest({
	lang: 'fr',
	name: "Présence d'une page contact dans le pied de page",
	query: 'footer a',
	filter: function (item) {
		return item.textContent.toLowerCase().includes('contact');
	},
	expectedNbElements: 1,
	explanations: { 
		'passed': "Il existe un lien vers la page contact dans cette page", 
		'failed': "Le lien contact est absent dans cette page."
	},
	tags: ['q5y','pidila'],
	ressources: { 'pidila':['Pi-032'],'opquast':['26'] } 
})

createTanaguruTest({
	lang: 'fr',
	name: "Présence d'une page plan du site dans le pied de page",
	query: 'footer a',
	filter: function (item) {
		return item.textContent.toLowerCase().includes('plan du site');
	},
	expectedNbElements: 1,
	explanations: { 
		'passed': "Il existe un lien vers la page plan du site dans cette page", 
		'failed': "Le lien plan du site est absent dans cette page."
	},
	tags: ['q5y','pidila'],
	ressources: { 'pidila':['Pi-032'],'opquast':['26'] } 
})

createTanaguruTest({
	lang: 'fr',
	name: "Présence d'un lien vers legifrance.gouv.fr dans le pied de page",
	query: 'footer a[href="https://www.legifrance.gouv.fr/"], footer a[href="http://www.legifrance.gouv.fr/"], footer a[href="www.legifrance.gouv.fr/"], footer a[href="legifrance.gouv.fr/"]',
	expectedNbElements: 1,
	explanations: { 
		'passed': "Il existe un lien vers la page legifrance.gouv.fr dans cette page", 
		'failed': "Le lien legifrance.gouv.fr est absent dans cette page."
	},
	tags: ['pidila'],
	ressources: { 'pidila':['Pi-147'] } 
})

createTanaguruTest({
	lang: 'fr',
	name: "Présence d'un lien vers service-public.fr dans le pied de page",
	query: 'footer a[href="https://www.service-public.fr/"], footer a[href="http://www.service-public.fr/"], footer a[href="www.service-public.fr/"], footer a[href="service-public.fr/"]',
	expectedNbElements: 1,
	explanations: { 
		'passed': "Il existe un lien vers la page service-public.fr dans cette page", 
		'failed': "Le lien service-public.fr est absent dans cette page."
	},
	tags: ['pidila'],
	ressources: { 'pidila':['Pi-147'] } 
})

createTanaguruTest({
	lang: 'fr',
	name: "Présence d'un lien vers gouvernement.fr dans le pied de page",
	query: 'footer a[href="https://www.gouvernement.fr/"], footer a[href="http://www.gouvernement.fr/"], footer a[href="www.gouvernement.fr/"], footer a[href="gouvernement.fr/"]',
	expectedNbElements: 1,
	explanations: { 
		'passed': "Il existe un lien vers la page gouvernement.fr dans cette page", 
		'failed': "Le lien gouvernement.fr est absent dans cette page."
	},
	tags: ['pidila'],
	ressources: { 'pidila':['Pi-147'] } 
})

createTanaguruTest({
	lang: 'fr',
	name: "Présence d'un lien vers france.fr dans le pied de page",
	query: 'footer a[href="https://www.france.fr/fr"], footer a[href="http://www.france.fr/fr"], footer a[href="www.france.fr/fr"], footer a[href="france.fr/fr"]',
	expectedNbElements: 1,
	explanations: { 
		'passed': "Il existe un lien vers la page france.fr dans cette page", 
		'failed': "Le lien france.fr est absent dans cette page."
	},
	tags: ['pidila'],
	ressources: { 'pidila':['Pi-147'] } 
})

/*************************************************
 ***** Chargement des résultats ******************
 *************************************************/
loadTanaguruTests();