from flask import Flask, request, jsonify, send_file

import firebase_admin
from firebase_admin import credentials, firestore
import time
api = "AIzaSyCQf5hWGMyjjnp32er0OJy31fXv6XHPi_w"
import google.generativeai as genai
from datetime import datetime
import requests
from gtts import gTTS
import os


genai.configure(api_key="AIzaSyCQf5hWGMyjjnp32er0OJy31fXv6XHPi_w")


app = Flask(__name__)

cred = credentials.Certificate("servicekey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()



@app.route('/getNews', methods=['GET'])
def get_news():
  date = request.args.get('date')
  news_ref = db.collection('news')
  query = news_ref.where('date', '==', date).stream()
  news_list = [{doc.id: doc.to_dict()} for doc in query]
  return jsonify(news_list)

@app.route('/getRatings', methods=['GET'])
def get_ratings():
  user_id = request.args.get('userId')
  ratings_ref = db.collection('ratings')
  query = ratings_ref.where('userId', '==', user_id).stream()
  ratings_list = [{doc.id: doc.to_dict()} for doc in query]
  return jsonify(ratings_list)

@app.route('/bookSlot', methods=['POST'])
def book_slot():
  data = request.get_json()
  booking_ref = db.collection('bookings').add(data)
  return jsonify({"message": "Booking successful", "id": booking_ref[1].id})

@app.route('/submitnews', methods=['POST'])
def submit_news():
  
  data = request.get_json()
  userid = data['userId']
  user_ref = db.collection('users').document(userid).get()
  if not user_ref.exists:
    return jsonify({"message": "User does not exist"})
  rating = user_ref.to_dict()['rating']
  if rating < 3:
        return jsonify({"message": "User rating is below 3. Cannot submit news"})
  

  model = genai.GenerativeModel('gemini-pro')
  text = data['text']
  chat = model.start_chat()

  response = chat.send_message('I am calling this from backend and i want only array as a response. No other thing or introduction. Just the array with strings. I am giving the text which user entered: '+text+ '. now in the array first thing, give me what user predited and second thing what is the date of prediction.')
  prediction = response.text.split(',')
  predict_text = prediction[0][1:]
  predict_date = prediction[1][:-1]

  predict_data = {'text': predict_text, 'date': predict_date, 'userId': userid}
  print(predict_text, predict_date)
  if(text.length < 500):
    text_res= model.start_chat().send_message("this is my text: "+ text + "Ellaborate it more")
    text = text + text_res.text
  data['text'] = text

  news_ref = db.collection('news').add(data)
  predict_ref = db.collection('predictions').add(predict_data)


  return jsonify({"message": "News submitted successfully", "news_id": news_ref[1].id, "prediction_id": predict_ref[1].id})

@app.route('/rateUser', methods=['GET'])
def rate_user():
 
  predict_ref=db.collection('predictions').get()
  seta=[]
  model = genai.GenerativeModel('gemini-pro')
  for doc in predict_ref:
    data=doc.to_dict()
    date=data['date']
    date_obj = datetime.strptime(date, '%Y-%m-%d')
    if date_obj < datetime.now():
      user_id = predict_ref.to_dict()['userId']
      user_ref = db.collection('users').document(user_id).get()
      predict_text = predict_ref.to_dict()['text']
      chat = model.start_chat()
      response = chat.send_message('I am calling this from backend and i want only string as a response. No other thing or introduction. Just the string. I am giving the text which user entered: '+predict_text+ '. Now after this i will be callig a News API with a query as keyword. Give a suitable keyword where i will get this news. ')
      time.sleep(0.1)
      keyword = response.text
      seta.append(keyword)
      print(keyword)
  today_news=[]
  today = datetime.today()
  formatted_date = today.strftime('%y--%m-%d')
  for keyword in seta:
    news=requests.get(f"https://newsdata.io/api/1/latest?apikey=pub_25905ff54517b05daff0f3f2b5bdffc838587"+"&q="+keyword+"&timeframe=24")
    news_data=news.json()
    today_str=""
    for i in range(0,10):
      news_data=news_data['results'][i]['description']
      today_str+=news_data
      today_str+="\n"
  
    today_news.append(today_str)
  today_news_str=""
  for news in today_news:
    today_news_str+=news
    today_news_str+="\n"


  for doc in predict_ref:
    
    predict_text = doc.to_dict()['text']
    chat = model.start_chat()
    response = chat.send_message('I am calling this from backend and i want only stra number form 1 to 10 as a  string in response. No other thing or introduction. Just the string. I am giving the text which user entered as prediction for today : '+predict_text+ '. Now I am giving you the set of todays news. Each new is separated by backslash n '+ today_news_str+' and you have to rate the prediction based on the news. ')
    rating = response.text
    predict_id = doc.id
    predict_ref = db.collection('predictions').document(predict_id).get()
    predict_ref.update({'rating': rating})
    user_id = predict_ref.to_dict()['userId']
    user_ref = db.collection('users').document(user_id).get()
    user_rating = user_ref.to_dict()['rating']
    user_predictions_no = user_ref.to_dict()['predictions_no']
    
    user_rating = (user_rating*user_predictions_no + rating) / (user_predictions_no+1)
    user_predictions_no += 1
    user_ref.update({'rating': user_rating, 'predictions_no': user_predictions_no})
    predict_ref=db.collection('predictions').document(doc.id).delete()
    news_ref=db.collection('news').document(doc.id).delete()


  return jsonify({"message": "Ratings updated successfully"})

@app.route('/getPredictions', methods=['GET'])
def get_predictions():
  user_id = request.args.get('userId')
  predictions_ref = db.collection('predictions')
  query = predictions_ref.where('userId', '==', user_id).stream()
  predictions_list = [{doc.id: doc.to_dict()} for doc in query]
  return jsonify(predictions_list)

@app.route('/getBookings', methods=['GET'])
def get_bookings():
  user_id = request.args.get('userId')
  bookings_ref = db.collection('bookings')
  query = bookings_ref.where('userId', '==', user_id).stream()
  bookings_list = [{doc.id: doc.to_dict()} for doc in query]
  return jsonify(bookings_list)

@app.route('/getUsers', methods=['GET'])
def get_users():
  users_ref = db.collection('users').stream()
  users_list = [{doc.id: doc.to_dict()} for doc in users_ref]
  return jsonify(users_list)

@app.route('/getUser', methods=['GET'])
def get_user():
  user_id = request.args.get('userId')
  user_ref = db.collection('users').document(user_id).get()
  return jsonify(user_ref.to_dict())

@app.route('/addUser', methods=['POST'])
def add_user():
  data = request.get_json()
  user_ref = db.collection('users').add(data)
  return jsonify({"message": "User added successfully", "id": user_ref[1].id})

@app.route('/updateUser', methods=['POST'])
def update_user():
  data = request.get_json()
  user_id = data['userId']
  user_ref = db.collection('users').document(user_id).get()
  if not user_ref.exists:
    return jsonify({"message": "User does not exist"})
  user_ref.update(data)
  return jsonify({"message": "User updated successfully"})

@app.route('/deleteUser', methods=['DELETE'])
def delete_user():
  user_id = request.args.get('userId')
  user_ref = db.collection('users').document(user_id).get()
  if not user_ref.exists:
    return jsonify({"message": "User does not exist"})
  user_ref.delete()
  return jsonify({"message": "User deleted successfully"})

@app.route('/deleteNews', methods=['DELETE'])
def delete_news():
  news_id = request.args.get('newsId')
  news_ref = db.collection('news').document(news_id).get()
  if not news_ref.exists:
    return jsonify({"message": "News does not exist"})
  news_ref.delete()
  return jsonify({"message": "News deleted successfully"})

@app.route('/deletePrediction', methods=['DELETE'])
def delete_prediction():
  prediction_id = request.args.get('predictionId')
  prediction_ref = db.collection('predictions').document(prediction_id).get()
  if not prediction_ref.exists:
    return jsonify({"message": "Prediction does not exist"})
  prediction_ref.delete()
  return jsonify({"message": "Prediction deleted successfully"})

@app.route('/deleteBooking', methods=['DELETE'])
def delete_booking():
  booking_id = request.args.get('bookingId')
  booking_ref = db.collection('bookings').document(booking_id).get()
  if not booking_ref.exists:
    return jsonify({"message": "Booking does not exist"})
  booking_ref.delete()
  return jsonify({"message": "Booking deleted successfully"})



  


  

      
  


if __name__ == '__main__':
  app.run(debug=True)
