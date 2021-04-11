import React from 'react';

import Header from '../partials/Header';
import HeroHome from '../partials/HeroHome';
import Newsletter from '../partials/Newsletter';
import Footer from '../partials/Footer';

function About() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <HeroHome />
        <Newsletter />
      </main>
      <Footer />

    </div>
  );
}

export default About;