import React from 'react';

import Header from '../partials/Header';
import FeaturesHome from '../partials/Features';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import Footer from '../partials/Footer';

function About() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        <FeaturesHome />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default About;