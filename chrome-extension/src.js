console.log('Running src.js')

let canvas = document.createElement('canvas');

let create_box = async (box) => {
    let child = document.createElement('img');
    child.style.position = 'absolute';
    child.style.left = `${box.left}px`;
    child.style.top = `${box.top}px`;
    child.style.width = `${box.width}px`;
    child.style.height = `${box.height}px`;
    child.src = '/dead.png'

    document.body.appendChild( child )
}

let faces = async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('https://bitcamp-2021.s3.us-east-2.amazonaws.com/models/')
    console.log('start')
    const detections = await faceapi.detectAllFaces(canvas)
    detections.forEach(d => {create_box(d.box)})
    console.log('stop')
}

// Request media
navigator.mediaDevices.getDisplayMedia().then(stream => {
	// Grab frame from stream
	let track = stream.getVideoTracks()[0];
    let capture = new ImageCapture(track);
    capture.grabFrame().then(bitmap => 
    {
        console.log(bitmap);
        // Stop sharing
        track.stop();
    
        // Draw the bitmap to canvas
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        canvas.getContext('2d').drawImage(bitmap, 0, 0);
        faces()
        
        // Grab blob from canvas
        canvas.toBlob(blob => {
                // Do things with blob here
            console.log('output blob:', blob);
        });
    });
})
.catch(e => console.log(e));