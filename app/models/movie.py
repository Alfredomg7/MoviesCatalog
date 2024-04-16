from .. import db

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    director = db.Column(db.String(100), nullable=True)
    genre = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return f'<Movie {self.title}'