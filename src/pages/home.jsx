import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaPaintBrush,
  FaLaptopCode,
  FaRocket,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// ===== Animations =====
const slideDown = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const fadeInUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const float = keyframes`
  0%,100% { transform: translate(0,0) scale(1); opacity: 0; }
  50% { opacity: 1; }
`;

// ===== Styled Components =====
const Container = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #fff;
  overflow-x: hidden;
`;

// ---- Hero Section ----
const Hero = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 50px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  animation: ${fadeInUp} 1s ease;
`;

const HeroTitle = styled.h1`
  font-size: 72px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 1024px) {
    font-size: 60px;
  }

  @media (max-width: 768px) {
    font-size: 48px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 32px;
  font-weight: 300;
  color: #b8b8b8;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const HeroDescription = styled.p`
  font-size: 18px;
  color: #888;
  max-width: 600px;
  margin: 0 auto 40px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 16px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 15px 40px;
  border-radius: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  transition: 0.3s;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
  }

  @media (max-width: 768px) {
    padding: 12px 30px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 10px 25px;
    font-size: 14px;
  }
`;

const BgAnimation = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.1;
  z-index: 1;

  span {
    position: absolute;
    width: 3px;
    height: 3px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 50%;
    animation: ${float} 8s infinite ease-in-out;
  }

  ${Array.from({ length: 9 })
    .map(
      (_, i) => `
        span:nth-child(${i + 1}) {
          left: ${10 * (i + 1)}%;
          animation-delay: ${i * 0.5}s;
          animation-duration: ${6 + (i % 3)}s;
        }
      `
    )
    .join("")}
`;

// ---- Services ----
const Services = styled.section`
  background: #0f0f0f;
  padding: 100px 50px;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }

  @media (max-width: 480px) {
    padding: 60px 15px;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 48px;
  margin-bottom: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  padding: 40px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-10px);
    background: rgba(102, 126, 234, 0.1);
    border-color: rgba(102, 126, 234, 0.3);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
  }

  h3 {
    margin: 15px 0;
    font-size: 24px;

    @media (max-width: 768px) {
      font-size: 20px;
    }

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }

  p {
    color: #888;
    font-size: 16px;
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 14px;
    }

    @media (max-width: 480px) {
      font-size: 13px;
    }
  }

  svg {
    font-size: 48px;
    color: #667eea;
    margin-bottom: 10px;

    @media (max-width: 768px) {
      font-size: 40px;
    }

    @media (max-width: 480px) {
      font-size: 32px;
    }
  }
`;

// ---- Footer ----
const Footer = styled.footer`
  text-align: center;
  padding: 40px 50px;

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

// ===== Component =====
const Home = () => {
  return (
    <Container>
      <Hero>
        <BgAnimation>
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i}></span>
          ))}
        </BgAnimation>

        <HeroContent>
          <HeroTitle>Web Designer & Developer</HeroTitle>
          <HeroSubtitle>Hi, I'm Sajed Murtada</HeroSubtitle>
          <HeroDescription>
            Premium web design, development, and SEO services to help your
            business stand out. Let's create something amazing together.
          </HeroDescription>
          <CTAButton to="/projects">VIEW MY WORK</CTAButton>
        </HeroContent>
      </Hero>

      <Services>
        <SectionTitle>What I Do</SectionTitle>
        <ServicesGrid>
          <ServiceCard whileHover={{ scale: 1.03 }}>
            <FaPaintBrush />
            <h3>Web Design</h3>
            <p>
              Creating modern and user-friendly interfaces that engage and
              captivate your audience.
            </p>
          </ServiceCard>

          <ServiceCard whileHover={{ scale: 1.03 }}>
            <FaLaptopCode />
            <h3>Development</h3>
            <p>
              Building scalable web apps with clean, efficient code and
              performance in mind.
            </p>
          </ServiceCard>

          <ServiceCard whileHover={{ scale: 1.03 }}>
            <FaRocket />
            <h3>Content & SEO</h3>
            <p>
              Optimizing your site for search engines and crafting content that
              drives traffic.
            </p>
          </ServiceCard>
        </ServicesGrid>
      </Services>

      <Footer>
        <SocialLinks>
          <a href="#">
            <FaGithub />
          </a>
          <a href="#">
            <FaLinkedin />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaEnvelope />
          </a>
        </SocialLinks>
        <p>&copy; 2025 Sajed Murtada. All rights reserved.</p>
      </Footer>
    </Container>
  );
};

export default Home;
