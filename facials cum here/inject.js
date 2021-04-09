(() => {
    let canvas = document.createElement('canvas');
    // Request media
    navigator.mediaDevices.getDisplayMedia().then(stream => 
    {
        // Grab frame from stream
        let track = stream.getVideoTracks()[0];
        let capture = new ImageCapture(track);
        capture.grabFrame().then(bitmap => 
        {
            // Stop sharing
            track.stop();
        
            // Draw the bitmap to canvas
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            canvas.getContext('2d').drawImage(bitmap, 0, 0);
            
            // Grab blob from canvas
            canvas.toBlob(blob => {
                    // Do things with blob here
                console.log('output blob:', blob);
            });
        });
    })
    .catch(e => console.log(e));

})()