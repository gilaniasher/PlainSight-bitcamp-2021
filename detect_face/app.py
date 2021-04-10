import json
import cv2
import numpy as np

def lambda_handler(event, context):
    im_b64 = event['body']
    im_bytes = base64.b64decode(im_b64)
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
    image = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)
    
    # Create the haar cascade
    cascPath = 'haarcascade_frontalface_default.xml'
    faceCascade = cv2.CascadeClassifier(cascPath)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Detect faces in the image
    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30)
        #flags = cv2.CV_HAAR_SCALE_IMAGE
    )
    
    # print("Found {0} faces!".format(len(faces)))
    
    # Draw a rectangle around the faces
    for (x, y, w, h) in faces:
        cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)
    
    # cv2.imshow("Faces found", image)
    # cv2.waitKey(0)
    
    return {
        'statusCode': 200,
        'body': json.dumps(str(x, y, w, h))
    }
