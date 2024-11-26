from IPython.display import Javascript
import json
import os


class D3Vizable:
    def __init__(self, data):
        self.data = data

    def viz(self, **kwargs):
        """
        Base display method that should be overridden by subclasses.
        """
        raise NotImplementedError("Subclasses must implement viz()")

    def _load_JS(self, name, subdir="js"):
        """Load a visualization JavaScript file at {subdir}/{name}.js"""
        js_file_path = os.path.join(subdir, name + ".js")
        with open(js_file_path, "r") as f:
            return f.read()

    def _JSViz(self, name, **kwargs):

        data_json = json.dumps(self.data)
        opts = json.dumps(kwargs)

        js = f"""
        {self._load_JS("D3Setup", subdir='js/preamble')} // load D3 and jQuery
        {self._load_JS("D3VizPrep", subdir='js/preamble')} // loads D3VizPrep function
        // load viz constructor, which must be named `name`
        {self._load_JS(name)} 

        function runViz() {{
            (function(element) {{
                // 'element' is the HTML element that
                // jupyter exposes where the visualization will be put
                D3VizPrep(element, {name}, {data_json}, {opts});
            }})(element);
        }}

        runViz();
        """

        return Javascript(js)


class ExampleCircles(D3Vizable):
    """
    Example subclass.
    Uses visualization code in js/exampleCircles.js
    """

    def viz(self, **kwargs):
        """
        Displays a circle visualization of a list of numbers.
        """
        return self._JSViz("exampleCircles", **kwargs)
