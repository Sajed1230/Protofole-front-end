import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./header";
import Footer from "./pages/footer";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  width: 100%;
  background: 
    linear-gradient(rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.85)),
    url('/undefined.jpeg') center/cover no-repeat fixed;
  
  @media (max-width: 768px) {
    background-attachment: scroll;
  }
`;

function Layout() {
  return (
    <LayoutWrapper>
      <Header />
      <Outlet />
      <Footer />
    </LayoutWrapper>
  );
}

export default Layout;