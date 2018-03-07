define(function(){

    var getXPath = function(element) {
        var position = 0;
        if (element.parentNode && element.parentNode.nodeType == 1) {
            var children = element.parentNode.children;
            for (var i = 0; i < children.length; i++) {
                if (children[i].tagName.toLowerCase() == element.tagName.toLowerCase()) {
                    position++;
                }
                if (children[i] == element) {
                    break;
                }
            }
        }
        return (element.parentNode.nodeType == 1 ? getXPath(element.parentNode) : '') + '/' + element.tagName.toLowerCase() + '[' + (position ? position : '1') + ']' + (element.hasAttribute('id') ? '[@id="' + element.getAttribute('id') + '"]' : '') + (element.hasAttribute('class') ? '[@class="' + element.getAttribute('class') + '"]' : '');
    }

    return getXPath;
})