

import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Layout from "./layout";
import About from './pages/about';
import Projects from './pages/Projects';
import Contact from './pages/contact';

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
