from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///movies.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.cli.command("init-db")
def init_db_command():
    """Clear existing data and create new tables."""
    db.drop_all()
    db.create_all()
    print('Initialized the database.')
    
from .models import movie
from .routes import movie_routes