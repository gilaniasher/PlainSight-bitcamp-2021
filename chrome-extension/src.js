let popup = document.createElement('div')
popup.classList.add( 'aaa-popup' )

let overlay = document.createElement('div')
overlay.classList.add('aaa-overlay')

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if ( request.msg == 'animation'){
            
            document.body.appendChild(overlay)
            document.body.appendChild(popup)
            setTimeout(() => {
                popup.innerText="Analyzing Page ..."
                popup.classList.add( 'aaa-popup-active' )
            }, 10);
            setTimeout(()=>{
                overlay.classList.add('aaa-overlay-bright')
            },10)
            setTimeout(()=>{
                overlay.classList.remove('aaa-overlay-bright')
            },600)
        }
        if ( request.msg == 'results'){

            let results = request.results;
            results = [
                { x : 400, y : 100, width: 100, height: 100, label : "This is joe", body : "Joe Mama!", link: "google.com" }
            ]

            results.forEach( r => {
                let container = document.createElement('div')
                container.classList.add( 'aaa-container' )
                container.style.left = `${r.x}px`;
                container.style.top = `${r.y}px`;
                container.style.width = `${r.width}px`;
                container.style.height = `${r.height}px`;

                document.body.appendChild( container )

                setTimeout(()=>{
                    container.classList.add('aaa-container-flash')
                },10)
                setTimeout(()=>{
                    container.classList.remove('aaa-container-flash')
                },300)


                
            })


        }
    }
);