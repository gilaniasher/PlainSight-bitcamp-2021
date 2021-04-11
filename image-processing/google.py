import requests
from IPython.display import JSON
import base64
import cv2
import io 
from imageio import imread
import matplotlib.pyplot as plt
from PIL import Image
from io import BytesIO

def detection(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """

    key = "AIzaSyDgYpWvgsiE6Kw_Bjda03YsxzGWUcaKxZk"
    request_json = request.get_json()
    query = request_json["query"]
    
    response = requests.post( f"https://vision.googleapis.com/v1/images:annotate?key={key}", json={
      "requests": [
        {
          "image": { "content": query },
          "features": [ { "type": "FACE_DETECTION" } ]
        }
      ]
    })

    all_data = []

    for i in response.json()['responses'][0]['faceAnnotations']:
      points = i['fdBoundingPoly']['vertices']
      face = img[points[0]['y']:points[2]['y'],points[0]['x']:points[2]['x']]
      
      pil_img = Image.fromarray(face, 'RGB')
      buffered = BytesIO()
      pil_img.save(buffered, format="JPEG")
      img_str = base64.b64encode(buffered.getvalue()).decode("utf-8") 

      response = requests.post( f"https://vision.googleapis.com/v1/images:annotate?key={key}", json={
        "requests": [
          {
            "image": { "content": img_str },
            "features": [ { "type": "WEB_DETECTION" } ]
          }
        ]
      })

      all_data.append( {
        "position" : points,
        "recodnition" : response.json() 
      })

    return all_data