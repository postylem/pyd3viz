if (typeof d3 === 'undefined') {
    {

        const D3 = 'https://d3js.org/d3.v7.min';
        console.log('D3 not found. Using', D3 + ".js");

        if (typeof require === 'undefined') {
            // console.log('require not available, using script tags for d3 and jquery');
            var d3script = document.createElement('script');
            d3script.src = D3URL + '.js';
            document.head.appendChild(script);

            var jqscript = document.createElement('script');
            jqscript.src = 'jquery-3.7.1.min.js';
            document.head.appendChild(jqscript);

        } else {
            // console.log('require available, loading d3');
            require.config({ paths: { d3: D3 } });

        }

    }
} else {
    {
        console.log('D3 found');
        console.log('jQuery assumed present');
    }
}

