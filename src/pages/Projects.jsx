import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaFacebook } from "react-icons/fa";
import axios from "axios";

// ====================== Animations ======================
const fadeInUp = keyframes`
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 0px rgba(102, 126, 234, 0.1); }
  50% { box-shadow: 0 0 25px rgba(102, 126, 234, 0.3); }
  100% { box-shadow: 0 0 0px rgba(102, 126, 234, 0.1); }
`;

// ====================== Styled Components ======================
const Page = styled.div`
  font-family: "Poppins", sans-serif;
  color: #fff;
  min-height: 100vh;
  overflow-x: hidden;
  text-align: center;
  background: #0d0d1a; /* ✅ Added for visibility on mobile */
`;

const Header = styled.header`
  padding: 100px 20px 40px;
  animation: ${fadeInUp} 1s ease both;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #aaa;
  max-width: 500px;
  margin: 15px auto 0;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const ProjectsGrid = styled(motion.div)`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px 80px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  width: 100%; /* ✅ Added */
  box-sizing: border-box; /* ✅ Added */
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;
  animation: ${glowPulse} 4s infinite ease-in-out;

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(102, 126, 234, 0.5);
    box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  width: 100%;
  overflow: hidden;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  padding: 20px;
  text-align: left;
`;

const Category = styled.span`
  font-size: 0.75rem;
  color: #667eea;
  background: rgba(102, 126, 234, 0.15);
  padding: 4px 10px;
  border-radius: 12px;
  text-transform: uppercase;
  font-weight: 600;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  margin: 10px 0 5px;
`;

const Description = styled.p`
  color: #bbb;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 15px 0;
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.07);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  color: #ccc;
`;

const LinkButton = styled.a`
  display: inline-block;
  background: rgba(102, 126, 234, 0.15);
  color: #667eea;
  padding: 8px 20px;
  border-radius: 25px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    transform: translateY(-2px);
  }
`;

const Footer = styled.footer`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;

  a {
    color: #aaa;
    font-size: 22px;
    transition: all 0.3s ease;

    &:hover {
      color: #667eea;
      transform: translateY(-4px);
    }
  }
`;

// ====================== Loader Animations ======================
const textAnim = keyframes`
  0% { letter-spacing: 1px; transform: translateX(0px); }
  40% { letter-spacing: 2px; transform: translateX(26px); }
  80% { letter-spacing: 1px; transform: translateX(32px); }
  90% { letter-spacing: 2px; transform: translateX(0px); }
  100% { letter-spacing: 1px; transform: translateX(0px); }
`;

const loadAnim = keyframes`
  0% { width: 16px; transform: translateX(0px); }
  40% { width: 100%; transform: translateX(0px); }
  80% { width: 16px; transform: translateX(64px); }
  90% { width: 100%; transform: translateX(0px); }
  100% { width: 16px; transform: translateX(0px); }
`;

const loadAnim2 = keyframes`
  0% { transform: translateX(0px); width: 16px; }
  40% { transform: translateX(0%); width: 80%; }
  80% { width: 100%; transform: translateX(0px); }
  90% { width: 80%; transform: translateX(15px); }
  100% { transform: translateX(0px); width: 16px; }
`;

const LoaderWrapper = styled.div`
  width: 80px;
  height: 50px;
  position: relative;
  margin: 100px auto;
`;

const LoaderText = styled.span`
  position: absolute;
  top: 0;
  color: #c8b6ff;
  font-size: 0.8rem;
  letter-spacing: 1px;
  animation: ${textAnim} 3.5s ease both infinite;
`;

const Load = styled.span`
  background-color: #9a79ff;
  border-radius: 50px;
  display: block;
  height: 16px;
  width: 16px;
  bottom: 0;
  position: absolute;
  transform: translateX(64px);
  animation: ${loadAnim} 3.5s ease both infinite;

  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: #d1c2ff;
    border-radius: inherit;
    animation: ${loadAnim2} 3.5s ease both infinite;
  }
`;

// ====================== Component ======================
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "https://protofole-back-end.onrender.com/user/api/projects"
      );
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Page>
      <Header>
        <Title>✨ My Projects</Title>
        <Subtitle>
          Modern designs, smooth animations, and powerful performance
        </Subtitle>
      </Header>

      {loading ? (
        <LoaderWrapper>
          <LoaderText>loading</LoaderText>
          <Load />
        </LoaderWrapper>
      ) : projects.length > 0 ? (
        <ProjectsGrid
          initial="visible" /* ✅ Changed for mobile visibility */
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {projects.map((p) => (
            <Card
              key={p._id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: "easeOut" },
                },
              }}
              whileHover={{ scale: 1.03 }}
            >
              <ProjectImage>
                <img
                  src={
                    p.image ||
                    "https://via.placeholder.com/400x200?text=No+Image"
                  }
                  alt={p.appName}
                />
              </ProjectImage>
              <Content>
                <Category>{p.applicationType}</Category>
                <ProjectTitle>{p.appName}</ProjectTitle>
                <Description>{p.description}</Description>
                <Tags>
                  {Array.isArray(p.tools) &&
                    p.tools.map((t, j) => <Tag key={j}>{t}</Tag>)}
                </Tags>
                {p.projectLink && (
                  <LinkButton
                    href={p.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project →
                  </LinkButton>
                )}
              </Content>
            </Card>
          ))}
        </ProjectsGrid>
      ) : (
        <p>No projects found 😢</p>
      )}

      <Footer>
        <SocialLinks>
          <a href="#">
            <FaGithub />
          </a>
          <a href="#">
            <FaLinkedin />
          </a>
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaEnvelope />
          </a>
        </SocialLinks>
        <p>© 2025 Sajed Murtada. All rights reserved.</p>
      </Footer>
    </Page>
  );
};

export default Projects;
