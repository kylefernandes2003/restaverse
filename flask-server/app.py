# app.py
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS

import os

import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize JWTManager
app.config['JWT_SECRET_KEY'] = 'dmiwao392483'  
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
jwt = JWTManager(app)

load_dotenv()  

reviews = [
    {"id": 1, "author": "Ashutosh Bohra", "email": "Ashutosh@gmail.com", "text": "Pocket friendly place for non veg lovers.Chapatis are big , so order only one at a time. Chicken fry was very tasty. Friendly staff decent ambience. Recently renovated interiors. Not a place for fine dine much like a small street side legendary restaurant for having some really tasty chicken. Custard and Firni are must try.", "rating": 4, "food_rating": 4,"service_rating": 5,"atmosphere_rating": 3,"recommended_dishes": "Chicken Fry, Custard, Firni","recommendation_for_vegetarians": "Recommended for vegetarians","parking_space": "Limited parking","parking_options": "Street parking"},
    {"id": 2, "author": "Ejaz", "email": "Ejaz@gmail.com", "text": "A simple place to sit down and taste some of the most delicious dishes. Nothing fancy just great food and service with a smile. The prices would transport you to the old world charm. Out of all the dishes it's always been the caramel custard which has me going back to this restaurant again and again. The best caramel custard I have tasted in Mumbai. Must visit if you want to have some great Non Vegetarian food and definitely don't miss their Caramel Custard", "rating": 5},
    {"id": 3, "author": "Samarth Bhatia", "email": "samarth@gmail.com", "text": "Pocket friendly place for non veg lovers. Although I found the chicken dishes to be good but I was not that satisfied with the mutton handi I ordered. Big chapatis so order only one at a time. Chicken fry was very tasty. Friendly staff decent ambience. Recently renovated interiors. Not a place for fine dine much like a small street side legendary restaurant for having some really tasty chicken. Custard and Firni are must try.", "rating": 3},
    {"id": 4, "author": "Ziyad Beg", "email": "Ziyad@gmail.com", "text": "This is the best place for having lunch and dinner. Very low/cheap price n the best quality of food, you will get here. Even though the place was high in standard I can't imagine that this hotel's price is very low.The staff are very sweet n nice. Don't go to the Taj hotel come here n taste every food. ❤️❤️", "rating": 4},
    {"id": 5, "author": "Ameer Muhammed N", "email": "Ameer@gmail.com", "text": "Bagdadi Restaurant in Mumbai is a culinary gem with its delightful Chicken Fry and flavorful Kheema.The old-world charm of the restaurant adds to the experience, making it a must-visit for those seeking authentic and delicious dishes in a nostalgic setting.", "rating": 5},
    {"id": 6, "author": "Athar Khan", "email": "Athar@gmail.com", "text": "I had the pleasure of dining at Bagdadi Restaurant, and I must say it's a haven for authentic Mughlai cuisine. The chicken fry was a delightful experience, with each bite revealing juicy and tender flavors. The mutton karhai was a true masterpiece, brimming with rich spices and succulent meat. To end the meal on a sweet note, the caramel custard was a perfect choice, offering a creamy and delectable finish to a remarkable culinary journey. Bagdadi Restaurant is a must-visit for anyone craving the true taste of Mughlai cuisine.", "rating": 5},
    # Add more mock reviews as needed
]

GOOGLE_CLIENT_ID = os.environ['GOOGLE_CLIENT_ID']
GOOGLE_SECRET_KEY = os.environ['GOOGLE_SECRET_KEY']

@app.route('/login', methods=['POST'])
def login():
    auth_code = request.get_json()['code']

    data = {
        'code': auth_code,
        'client_id': GOOGLE_CLIENT_ID,  # client ID from the credential at google developer console
        'client_secret': GOOGLE_SECRET_KEY,  # client secret from the credential at google developer console
        'redirect_uri': 'postmessage',
        'grant_type': 'authorization_code'
    }

    response = requests.post('https://oauth2.googleapis.com/token', data=data).json()
    headers = {
        'Authorization': f'Bearer {response["access_token"]}'
    }
    user_info = requests.get('https://www.googleapis.com/oauth2/v3/userinfo', headers=headers).json()

    """
        check here if user exists in database, if not, add him
    """

    jwt_token = create_access_token(identity=user_info['email'])  # create jwt token
    response = jsonify(user=user_info)
    response.set_cookie('access_token_cookie', value=jwt_token, secure=True)

    return response, 200

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    jwt_token = request.cookies.get('access_token_cookie') # Demonstration how to get the cookie
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route('/reviews', methods=['GET'])
def get_reviews():
    return jsonify(reviews)

@app.route('/review/<int:review_id>', methods=['GET'])
def get_review(review_id):
    review = next((r for r in reviews if r['id'] == review_id), None)
    if review:
        return jsonify(review)
    else:
        return "Review not found", 404

@app.route('/reply/<int:review_id>', methods=['POST'])
def reply_review(review_id):
    data = request.form.get('reply_text')
    print(f"Replied to Review {review_id}: {data}")
    return "Reply submitted successfully"

@app.route('/logout', methods=['POST'])
def logout():
    response = jsonify(message="Logout successful")
    response.delete_cookie('access_token_cookie')
    return response, 200

if __name__ == '__main__':
    app.run(debug=True)
