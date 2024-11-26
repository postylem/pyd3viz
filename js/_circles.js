function vizFn(d3, element, data, opts) {
    console.log("opts:", opts)
    var svg = d3.select(element.get(0)).append('svg')
        .attr('width', opts.width)
        .attr('height', opts.height);
    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr("cx", function(d, i) {return 40 * (i + 1);})
        .attr("cy", function(d, i) {return 100 + 30 * (i % 3 - 1);})
        .style("fill", "#1570a4")
        .transition().duration(2000)
        .attr("r", function(d) {return 2*d;});
}