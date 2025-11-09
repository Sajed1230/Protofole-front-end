import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

// ====================== Animations ======================
const moveLight = keyframes`
  0% { background-position: 0% 0%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 0%; }
`;

const blinkCaret = keyframes`
  0%, 100% { border-color: transparent; }
  50% { border-color: #667eea; }
`;

const slideDown = keyframes`
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const slideUp = keyframes`
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-20px); }
`;

// ====================== Styled Components ======================
const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1000;
  transition: all 0.4s ease;
  background: ${({ scrolled }) =>
    scrolled ? "rgba(10, 10, 10, 0.9)" : "transparent"};
  backdrop-filter: ${({ scrolled }) => (scrolled ? "blur(10px)" : "none")};
  box-shadow: ${({ scrolled }) =>
    scrolled ? "0 4px 15px rgba(0, 0, 0, 0.3)" : "none"};
`;

const HeaderContainer = styled.header`
  margin-top: 1rem;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  position: relative;
  border-radius: 16px;
  padding: 1rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 2px;
    border-radius: 16px;
    background: linear-gradient(90deg, #667eea, #764ba2, #05b3a4, #667eea);
    background-size: 300% 300%;
    animation: ${moveLight} 6s linear infinite;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: destination-out;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 1rem 2rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid #667eea; /* caret */
  animation: ${blinkCaret} 0.7s step-end infinite;
`;

const Nav = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px; /* below header */
    left: 0;
    width: 100%;
    background: rgba(10, 10, 10, 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    max-height: ${({ open }) => (open ? "500px" : "0")};
    animation: ${({ open }) => (open ? slideDown : slideUp)} 0.4s forwards;
    transition: max-height 0.4s ease-in-out;
    z-index: 999;
    padding: ${({ open }) => (open ? "1rem 0" : "0")};
  }
`;

const NavItem = styled.li``;

const NavLinkStyled = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: ${({ active }) => (active ? "100%" : "0%")};
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }

  color: ${({ active }) => (active ? "#667eea" : "#fff")};

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 1rem 2rem;
    width: 100%;
    text-align: center;
  }
`;

const Hamburger = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #fff;

  @media (max-width: 768px) {
    display: block;
  }
`;

// ====================== Component ======================
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [displayedText, setDisplayedText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const fullName = "SA/MR/AB";

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Infinite typing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        if (!deleting) {
          if (prev.length < fullName.length)
            return fullName.slice(0, prev.length + 1);
          setDeleting(true);
          return prev;
        } else {
          if (prev.length > 0) return prev.slice(0, prev.length - 1);
          setDeleting(false);
          return "";
        }
      });
    }, 200);
    return () => clearInterval(interval);
  }, [deleting]);

  const links = [
    { to: "/", label: "HOME" },
    { to: "/about", label: "ABOUT" },
    { to: "/projects", label: "PROJECTS" },
    { to: "/contact", label: "CONTACT" },
  ];

  return (
    <HeaderWrapper scrolled={scrolled}>
      <HeaderContainer>
        <Logo to="/">{displayedText}</Logo>

        <Hamburger onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </Hamburger>

        <Nav open={menuOpen}>
          {links.map(({ to, label }) => (
            <NavItem key={to}>
              <NavLinkStyled
                to={to}
                active={location.pathname === to}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLinkStyled>
            </NavItem>
          ))}
        </Nav>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
