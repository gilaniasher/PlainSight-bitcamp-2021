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
            /*results = [
                { x : 400, y : 100, width: 100, height: 100, label : "This is joe", body : "A maternal insult, also referred to as a \"Yo mama\" joke, is a reference to a person's mother through the use of phrases such as \"your mother\" or other regional variants, frequently used to insult the target by way of their mother.[1] Used as an insult, \"your mother ...\" preys on widespread sentiments of filial piety,", link: "http://google.com" }
            ]*/
            popup.classList.remove( 'aaa-popup-active' )
            document.body.removeChild(overlay)
            results.data.forEach( r => {
                console.log(r)
                let label = r.recodnition.responses[0].webDetection.bestGuessLabels[0].label
                let width = r.position[2].x-r.position[0].x
                let height = r.position[2].y-r.position[0].y

                let container = document.createElement('div')
                container.classList.add( 'aaa-container' )
                container.style.left = `${r.position[0].x}px`;
                container.style.top = `${r.position[0].y}px`;
                container.style.width = `${r.position[2].x - r.position[0].x}px`;
                container.style.height = `${r.position[2].y-r.position[0].y}px`;
                container.onclick = function(){
                    window.location.href = r.wiki.link;
                }
                container.style.lineHeight=`${height * 2 - 20}px`
                container.innerText = label

                document.body.appendChild( container )

                setTimeout(()=>{
                    container.classList.add('aaa-container-flash')
                },10)
                setTimeout(()=>{
                    container.classList.remove('aaa-container-flash')
                },300)

                let infoBox = document.createElement('div')
                infoBox.classList.add('aaa-infobox')

                infoBox.style.left = `${width+10}px`
                infoBox.style.top = `0`
                infoBox.style.width = `250px`
                infoBox.innerText=r.wiki.text

                container.appendChild(infoBox)

                
            })

        }
    }
);