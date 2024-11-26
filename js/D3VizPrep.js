function D3VizPrep(element, vizFn, data, opts) {
    // Ensure element is jQuery-wrapped
    // It seems it is wrapped by default in VSCode but not in jupyter notebook/lab
    var el = element.get ? element : $(element);
    // Clear any existing SVG first
    el.html("");
    

    if (typeof d3 !== 'undefined') {
        vizFn(d3, el, data, opts);
    } else {
        require(['d3'], function (d3) {
            vizFn(d3, el, data, opts);
        });
    }

} 