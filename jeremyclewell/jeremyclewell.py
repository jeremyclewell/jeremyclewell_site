from flask import Flask
from flask import redirect, render_template, send_from_directory, url_for

from flask_login import UserMixin, LoginManager, login_user, logout_user
from flask_blogging import BloggingEngine
from flask_blogging.dynamodbstorage import DynamoDBStorage
from flask_fileupload.storage.s3storage import S3Storage
from flask_fileupload import FlaskFileUpload

from markdown.extensions.attr_list import AttrListExtension
from markdown.extensions.extra import ExtraExtension
from markdown.extensions.meta import MetaExtension


extn1 = AttrListExtension()
extn3 = ExtraExtension()
extn4 = MetaExtension()

app = Flask(__name__)

app.config["SECRET_KEY"] = "secret"  # for WTF-forms and login
app.config["BLOGGING_URL_PREFIX"] = "/blog"
# app.config["BLOGGING_DISQUS_SITENAME"] = "test"
app.config["BLOGGING_SITEURL"] = "http://localhost:8000"
app.config["BLOGGING_SITENAME"] = "Jeremy Clewell"
# app.config["BLOGGING_TWITTER_USERNAME"] = "@me"
app.config["FILEUPLOAD_S3_BUCKET"]='jeremyclewell-site'
app.config["FILEUPLOAD_PREFIX"] = "/upload"
app.config["FILEUPLOAD_ALLOWED_EXTENSIONS"] = ["png", "jpg", "jpeg", "gif"]
app.config["BLOGGING_ESCAPE_MARKDOWN"] = False
app.config["BLOGGING_GOOGLE_ANALYTICS"] = "UA-15169356-1"

# extensions
s3storage = S3Storage(app)
file_upload = FlaskFileUpload(app, storage=s3storage)

dyn_storage = DynamoDBStorage(endpoint_url="https://dynamodb.us-east-1.amazonaws.com")
blog_engine = BloggingEngine(app, dyn_storage, file_upload=file_upload, extensions=[extn1, extn3, extn4])
login_manager = LoginManager(app)


class User(UserMixin):
    def __init__(self, user_id):
        self.id = user_id

    def get_name(self):
        return "Jeremy Clewell"  # typically the user's name

@login_manager.user_loader
@blog_engine.user_loader
def load_user(user_id):
    return User(user_id)

# app = Flask(__name__)
# app.config['DYNAMO_TABLES'] = [
#     {
#          TableName='users',
#          KeySchema=[dict(AttributeName='username', KeyType='HASH')],
#          AttributeDefinitions=[dict(AttributeName='username', AttributeType='S')],
#          ProvisionedThroughput=dict(ReadCapacityUnits=5, WriteCapacityUnits=5)
#     }, {
#          TableName='groups',
#          KeySchema=[dict(AttributeName='name', KeyType='HASH')],
#          AttributeDefinitions=[dict(AttributeName='name', AttributeType='S')],
#          ProvisionedThroughput=dict(ReadCapacityUnits=5, WriteCapacityUnits=5)
#     }
# ]

# dynamo = Dynamo(app)

@app.route("/")
def index():
    bundle_url = url_for('static', filename='if_bundles/Trapped---in House of Hammond.gblorb.js')
    return render_template('if_stage.html', if_url=bundle_url)

@app.route("/login/")
def login():
    user = User("testuser")
    login_user(user)
    return redirect("/blog")

@app.route("/logout/")
def logout():
    logout_user()
    return redirect("/")

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
