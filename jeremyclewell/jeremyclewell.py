from flask import Flask
from flask import redirect, render_template, send_from_directory, url_for
import os
app = Flask(__name__)

PROJECT_PATHS = {
    "bcbsr2008": "archive/ibx/bcbsr2008",
    "bcbsr2009": "archive/ibx/bcbsr2009/main.html",
    "bcbsr2010": "archive/ibx/bcbsr2010/index.html",
    "bsr_tshirts": "archive/ibx/bsr_tshirts/tshirts.html",
    "good2bme": "archive/ibx/good2bme/main.html",
}

@app.route("/")
def index():
    bundle_url = url_for('static', filename='if_bundles/Trapped---in House of Hammond.gblorb.js')
    return render_template('if_stage.html', if_url=bundle_url)

@app.route("/resume")
def resume():
    return redirect(url_for('static', filename="jeremyclewell.pdf"))

@app.route("/interactive_fiction/<if_bundle>")
def interactive_fiction(if_bundle=None):
    bundle_url = url_for('static', filename='if_bundles/{}'.format(if_bundle))
    return render_template('if_stage.html', if_url=bundle_url)

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html", error = str("Waaarrrrgggg"))

@app.errorhandler(500)
def unhandled_exception(e):
    return render_template("404.html", error=str(e))

if __name__ == "__main__":
    app.run(host='0.0.0.0')
