from flask import Flask
from flask import request
app = Flask(__name__)

import cv2
import base64
import numpy as np
import binascii

from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import service_pb2, resources_pb2, service_pb2_grpc
from clarifai_grpc.grpc.api.status import status_code_pb2

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/FaceDetect', methods=['POST'])
def face_detect():
    # get image from base64
    im_b64 = request.get_data()
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
    )

    return str(faces)

@app.route('/clarifai', methods=['POST'])
def call_clarifai():
    metadata = (('authorization', 'Key c3d43fa39c9f4847bad88bdda14e65b7'),)

    channel = ClarifaiChannel.get_grpc_channel()
    stub = service_pb2_grpc.V2Stub(channel)

    '''
    with open("./obama.jpg", "rb") as f:
        file_bytes = f.read()
    '''        

    file_bytes = binascii.a2b_base64(request.get_data())

    req = service_pb2.PostModelOutputsRequest(
        model_id='cfbb105cb8f54907bb8d553d68d9fe20',
        inputs=[resources_pb2.Input(data=resources_pb2.Data(image=resources_pb2.Image(base64=file_bytes)))]
    )

    response = stub.PostModelOutputs(req, metadata=metadata)

    if response.status.code != status_code_pb2.SUCCESS:
        raise Exception("Request failed, status code: " + str(response.status.code))

    for concept in response.outputs[0].data.concepts:
        print('%12s: %.2f' % (concept.name, concept.value))

    return 'worked'