function compileTemplate(template, model) {
    var html = template.replace(/\{\{(.*?)\}\}/g, function (match, group1) {
            return eval('model.' + group1);
        }
    );

    var container = document.createElement('span');
    container.innerHTML = html;

    if (container.children.length !== 1) {
        throw new Error('Template must have exactly one root element: "' + html + '".');
    }

    return container.children[0];
}
