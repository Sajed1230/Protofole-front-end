// Footer.jsx
import React from "react";
import styled, { keyframes } from "styled-components";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaInstagram } from "react-icons/fa";

// ===== Animations =====
const fadeInUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// ===== Styled Components =====
const FooterContainer = styled.footer`
  text-align: center;
  padding: 40px 50px;
  background: #0a0a0a;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }

  @media (max-width: 480px) {
    padding: 25px 15px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  animation: ${fadeInUp} 1s ease;

  a {
    color: #888;
    font-size: 24px;
    transition: 0.3s;

    &:hover {
      color: #667eea;
      transform: translateY(-3px);
    }

    @media (max-width: 480px) {
      font-size: 20px;
    }
  }
`;

const CopyRight = styled.p`
  color: #666;
  font-size: 14px;
`;

// ===== Footer Component =====
const Footer = () => {
  return (
    <FooterContainer>
      <SocialLinks>
        <a href="https://github.com/Sajed1230">
          <FaGithub />
        </a>
        <a href="#">
          <FaLinkedin />
        </a>
        <a href="#">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com/sajedfrontend_103/">
          <FaInstagram />
        </a>
      </SocialLinks>
      <CopyRight>&copy; 2025 Sajed Murtada. All rights reserved.</CopyRight>
    </FooterContainer>
  );
};

export default Footer;
