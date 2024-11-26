from IPython.display import Javascript
import json
import os


class D3Vizable:
    def __init__(self, data):
        self.data = data

    def viz(self, **kwargs):
        """Base display method that should be overridden by subclasses"""
        raise NotImplementedError("Subclasses must implement viz()")

    def _load_JS(self, name, subdir="js"):
        """Load a visualization JavaScript file at {subdir}/{name}.js"""
        js_file_path = os.path.join(os.path.dirname(__file__), subdir, name + '.js')
        with open(js_file_path, "r") as f:
            return f.read()

    def _JSViz(self, name, **kwargs):

        data_json = json.dumps(self.data)
        kwargs_json = json.dumps(kwargs)

        js = f"""
        {self._load_JS("D3Setup")} // load D3 and jQuery
        {self._load_JS("D3VizPrep")} // loads D3VizPrep function
        {self._load_JS(name)} // loads vizFn function

        function runViz() {{
            (function(element) {{
                // 'element' is the name of the div (?) that 
                // jupyter exposes where the viz wil be put
                D3VizPrep(element, vizFn, {data_json}, {kwargs_json});
            }})(element);
        }}

        console.log('Running viz...');
        runViz();
        """

        return Javascript(js)


class D3VizableCircles(D3Vizable):
    def viz(self, **kwargs):
        """Display a circle visualization"""
        return self._JSViz("_circles", **kwargs)
