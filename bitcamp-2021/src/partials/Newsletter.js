import React from 'react';

function Newsletter() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:py-16">
        <div className="pb-12 md:pb-20">
          <div className="relative bg-white-900 rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl overflow-hidden" data-aos="zoom-y-out">
          <div className=" flex flex-col lg:flex-row justify-between items-center">
              <div className="relative md:px-12  text-center lg:text-left lg:max-w-xl" align="left">
                <h3 className="h3 text-black mb-2">The <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Process.</span></h3>
                <p className="text-black text-lg mb-6" >                  
                PlainSight is implemented as a Google Chrome extension that captures an image of the current page and sends this to a Google Cloud Function. 
                This function uses OpenCV to identify the faces in the image and their relative location. Then it sends these individual faces to the Google Reverse Image Search API which labels these faces with the corresponding name. 
                The Google Cloud Function takes these names and queries the Wikipedia API to get summarized information regarding the well-known figure. This is then presented to the user through the Chrome Extension.

                </p>
              </div>
              <img className="mx-auto shadow-2xl mb-6" src={require('../images/Bitcamp_Project_Design.png')} width="500" height="340"/>
            </div>

            <div className="relative md:px-12  text-center">
                <h3 className="h3 text-black mb-2 lg:text-left lg:max-w-xl">Stay <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">informed.</span></h3>
                <p className="text-black text-lg lg:text-left" >                  
                So much information on the internet such as news articles or YouTube videos are gated by domain-specific knowledge which can make it difficult to follow. 
                While users can always Google search for well-known figures, it can be exhausting to constantly be searching for reliable, unbiased information. 
                This is especially true for users trying to get into politics, sports, or other communities with a high barrier of domain-knowledge.
                We wanted to use computer vision to save our users Google searches by showing relevant information regarding political figures or celebrities as users browse the internet.
                Our extension scans the page, identifies well-known figures, and provides relevant information in real-time.
                </p>
              </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Newsletter;
