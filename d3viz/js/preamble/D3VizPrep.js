function D3VizPrep(element, vizConstructor, data, opts) {
    // Ensure element is jQuery-wrapped
    // It seems it is wrapped by default in VSCode but not in jupyter notebook/lab
    var el = element.get ? element : $(element);
    // Clear any existing SVG first
    el.html("");
    
    console.log("making viz", vizConstructor.name);
    if (typeof d3 !== 'undefined') {
        const v = new vizConstructor(d3, el);
        v.make(data, opts);
    } else {
        require(['d3'], function (d3) {
            const v = new vizConstructor(d3, el);
            v.make(data, opts);
        });
    }

} 