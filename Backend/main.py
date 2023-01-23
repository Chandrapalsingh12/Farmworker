from flask import Flask,request,Response,jsonify
import cv2
from flask_cors import CORS,cross_origin
from PIL import Image
import numpy as np
import pickle
from keras.models import load_model
import pandas as pd
import pymongo

app = Flask(__name__)

disease_name = pickle.load(open("Types_of_Diseas.pkl","rb"))
model = load_model("model.h5")

CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/image', methods =["POST"])
def Home():
    if request.method == "POST":
        file = request.files["images"]
        # print(file)
        img = Image.open(file)
        img = np.array(img)
        c = cv2.resize(img,(70,70))
        c1 = cv2.cvtColor(np.array(c), cv2.COLOR_BGR2RGB)
        resh = c1.reshape(1,70,70,3)
        pred = model.predict(resh)
        val = []
        for i in pred:
            val.append(i)
        data_fram = pd.DataFrame([disease_name,val[0]]).T
        data_fram.columns = ["disease_name","Output"]
        op_final = data_fram.groupby('Output').max().tail(1).values[0][0]
        print(op_final)

        # FetchData
        client = pymongo.MongoClient("mongodb+srv://chatbot:chatbot@cluster0.nipxevo.mongodb.net/?retryWrites=true&w=majority")
        db = client['Plant_Disease']
        collection = db["Plant_Disease_Cure"]
        c = collection.find({},{"_id":0})
        q = []
        a = []
        for i in c:
            q.append(list(i.values())[0])
            a.append(list(i.values())[1])
        df = pd.DataFrame([q,a]).T
        df.columns = ["Diseases","Cure"]

        cure = []
        for i in df.Diseases:
            ids = df[df.Diseases==op_final].index[0]
            cure.append(df['Cure'].loc[df.index[ids]])
            break 
        return jsonify({"Disease": op_final, "Cure": cure})

    return jsonify({"msg": "Somthing Went Wrong", "success": False})



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)
