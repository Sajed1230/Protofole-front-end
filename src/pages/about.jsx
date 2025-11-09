import styled, { keyframes } from "styled-components";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { useState, useEffect } from "react";

// ====================== Animations ======================
const fadeInLeft = keyframes`
  from { transform: translateX(-50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const fadeInRight = keyframes`
  from { transform: translateX(50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const fadeInUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const shine = keyframes`
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
`;

// ====================== Styled Components ======================
const PageWrapper = styled.div`
  color: #fff;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
`;

// ---------- About Section ----------
const AboutSection = styled.section`
  min-height: 100vh;
  padding: 120px 20px 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const AboutImage = styled.div`
  animation: ${fadeInLeft} 1s ease;
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }

  &::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    animation: ${shine} 3s infinite;
  }
`;

const AboutContent = styled.div`
  animation: ${fadeInRight} 1s ease;
`;

// ✨ Typing animation styles
const TypingTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-right: 3px solid #667eea;
  white-space: nowrap;
  overflow: hidden;
  width: fit-content;
  animation: blink 0.7s infinite;

  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const AboutSubtitle = styled.p`
  font-size: 24px;
  color: #888;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const AboutDescription = styled.p`
  color: #b8b8b8;
  line-height: 1.8;
  font-size: 16px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Highlight = styled.span`
  color: #667eea;
  font-weight: 600;
`;

// ---------- Skills Section ----------
const SkillsSection = styled.section`
  padding: 80px 20px;
  background: #0f0f0f;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 48px;
  margin-bottom: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 40px;
  }
`;

const SkillsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const SkillItem = styled.div`
  margin-bottom: 40px;
  animation: ${fadeInUp} 1s ease both;
  animation-delay: ${(props) => props.delay}s;
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const SkillName = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const SkillPercentage = styled.span`
  color: #667eea;
  font-weight: 600;
`;

const SkillBar = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const SkillProgress = styled.div`
  height: 100%;
  width: ${(props) => props.width || "0"};
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
  animation: fillBar 1.5s ease-in-out forwards;

  @keyframes fillBar {
    from {
      width: 0;
    }
  }
`;

// ---------- Footer ----------
const Footer = styled.footer`
  text-align: center;
  padding: 40px 20px;
  background: #0a0a0a;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;

  a {
    color: #888;
    font-size: 24px;
    transition: all 0.3s ease;

    &:hover {
      color: #667eea;
      transform: translateY(-3px);
    }
  }
`;

// ====================== Component ======================
const About = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "About Me";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(timer);
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <PageWrapper>
      {/* About Section */}
      <AboutSection>
        <AboutContainer>
          <AboutImage>
            <ImageWrapper>
              <img src="imagesajed.jpeg" alt="About Me" />
            </ImageWrapper>
          </AboutImage>

          <AboutContent>
            <TypingTitle>{typedText}</TypingTitle>
            <AboutSubtitle>Web Designer & Developer</AboutSubtitle>
            <AboutDescription>
              Hello! I'm <Highlight>Sajed Murtada</Highlight>, a passionate web
              developer with a keen eye for design and a love for creating
              elegant digital experiences. With expertise in modern web
              technologies, I transform ideas into beautiful, functional
              websites that make a difference.
            </AboutDescription>
            <AboutDescription>
              I specialize in creating <Highlight>responsive</Highlight> and{" "}
              <Highlight>user-friendly</Highlight> web applications that not
              only look amazing but also deliver exceptional performance.
            </AboutDescription>
            <AboutDescription>
              When I'm not coding, I'm exploring the latest web technologies,
              contributing to open-source projects, and constantly learning.
            </AboutDescription>
          </AboutContent>
        </AboutContainer>
      </AboutSection>

      {/* Skills Section */}
      <SkillsSection>
        <SectionTitle>My Skills</SectionTitle>
        <SkillsContainer>
          {[
            ["HTML & CSS", "100%"],
            ["JavaScript", "95%"],
            ["React & Frontend Frameworks", "95%"],
            ["Backend Development", "89%"],
            ["UI/UX Design", "88%"],
            ["SEO & Performance Optimization", "82%"],
          ].map(([name, percent], i) => (
            <SkillItem key={i} delay={0.1 * (i + 1)}>
              <SkillHeader>
                <SkillName>{name}</SkillName>
                <SkillPercentage>{percent}</SkillPercentage>
              </SkillHeader>
              <SkillBar>
                <SkillProgress width={percent} />
              </SkillBar>
            </SkillItem>
          ))}
        </SkillsContainer>
      </SkillsSection>

      {/* Footer */}
      <Footer>
        <SocialLinks>
          <a href="#" title="GitHub">
            <FaGithub />
          </a>
          <a href="#" title="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="#" title="Twitter">
            <FaTwitter />
          </a>
          <a href="#" title="Email">
            <FaEnvelope />
          </a>
        </SocialLinks>
        <p>© 2025 Sajed Murtada. All rights reserved.</p>
      </Footer>
    </PageWrapper>
  );
};

export default About;
