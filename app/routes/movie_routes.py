from flask import request, jsonify, render_template
from ..models.movie import Movie
from .. import db, app

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/api/movies', methods=['POST'])
def add_movie():
    data = request.get_json()
    try:
        new_movie = Movie(title=data['title'], director=data['director'], genre=data['genre'])
        db.session.add(new_movie)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Movie added successfully!'})
    except Exception as e:
        return jsonify({'success': False, 'errors': [str(e)]}), 400

    
@app.route('/api/movies', methods=['GET'])
def get_movies():
    movies = Movie.query.all()
    return jsonify([{'title': m.title, 'director': m.director, 'genre': m.genre} for m in movies])
