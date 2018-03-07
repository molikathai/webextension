define(['./getXPath'], function(getXPath){

    var manageOutput = function (element) {
        var implicitARIASemantic = element.implicitARIASemantic;
        var explicitARIASemantic = element.explicitARIASemantic;
        var canBeReachedUsingKeyboardWith = element.canBeReachedUsingKeyboardWith;
        var isNotVisibleDueTo = element.isNotVisibleDueTo;
        var isNotExposedDueTo = element.isNotExposedDueTo;
        var fakeelement = element.cloneNode(true);
        var e = document.createElement(fakeelement.tagName.toLowerCase());
        if (e.outerHTML.indexOf("/") != -1) {
            if (fakeelement.innerHTML.length > 512) {
                fakeelement.innerHTML = '[...]';
            }	
        }
        return { outer: fakeelement.outerHTML, xpath: that.getXPath(element), role: { implicit: implicitARIASemantic, explicit: explicitARIASemantic }, canBeReachedUsingKeyboardWith: canBeReachedUsingKeyboardWith, isNotVisibleDueTo: isNotVisibleDueTo, isNotExposedDueTo: isNotExposedDueTo };
    }

    return manageOutput;
})