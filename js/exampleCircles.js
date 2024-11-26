class exampleCircles {
    constructor(d3, element) {

        this.rootElement = element
        
        // Must have a this.make function
        // which takes in data and opts (both dictionaries)
        // and builds visualization on the element using d3
        this.make = function (data, opts) {
            const default_opts = {width: 200, height: 200};
            opts = {...default_opts, ...opts};
            console.log("using opts:", opts);

            const N = data.length
            const NCOL = 3
            const MAX = Math.max(...data)
            var svg = d3.select(this.rootElement.get(0)).append('svg')
                .attr('width', opts.width)
                .attr('height', opts.height);

            // Add tooltip div
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("color", "black")
                .style("background-color", "white")
                .style("border", "solid")

            svg.selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr("cx", function (d, i) { return (i %  NCOL + 1/2) * (opts.width / (NCOL)); })
                .attr("cy", function (d, i) { return (Math.floor(i /  NCOL) + 1/2) * (opts.height / Math.ceil(N/ NCOL)); })
                .style("fill", function(d, i) { return d3.interpolateViridis(d/MAX); })
                // Add mouseover events
                .on("mouseover", function(event, d) {
                    const color = d3.interpolateViridis(d/MAX);
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html("Value: " + d)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("border-color", color);
                })
                .on("mouseout", function(d) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                })
                .transition().duration(2500)
                .attr("r", function (d) { return d; });
        };
    }
}