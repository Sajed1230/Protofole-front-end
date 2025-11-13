import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaFacebook,
  FaExclamationTriangle,
  FaWifi,
} from "react-icons/fa";
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

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
`;

// ====================== Styled Components ======================
const Page = styled.div`
  font-family: "Poppins", sans-serif;
  color: #fff;
  min-height: 100vh;
  padding-top: 5rem;
  overflow-x: hidden;
  text-align: center;
  background: #0d0d1a;
  position: relative;
  width: 100%;
`;

const Header = styled.header`
  padding: 80px 20px 40px;
  animation: ${fadeInUp} 1s ease both;

  @media (max-width: 600px) {
    padding: 60px 15px 30px;
  }
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  padding: 0 10px;
  word-wrap: break-word;
`;

const Subtitle = styled.p`
  font-size: clamp(0.85rem, 2.5vw, 1rem);
  color: #aaa;
  max-width: 90%;
  margin: 15px auto 0;
  padding: 0 15px;
  line-height: 1.6;

  @media (min-width: 600px) {
    max-width: 500px;
  }
`;

const ProjectsGrid = styled(motion.div)`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 15px 60px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: clamp(20px, 3vw, 30px);
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 0 10px 40px;
  }
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
  width: 100%;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(102, 126, 234, 0.5);
    box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
  }

  @media (max-width: 600px) {
    border-radius: 15px;

    &:hover {
      transform: translateY(-4px);
    }
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  width: 100%;
  overflow: hidden;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  position: relative;

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

  @media (max-width: 600px) {
    height: 180px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
`;

const Content = styled.div`
  padding: 20px;
  text-align: left;

  @media (max-width: 600px) {
    padding: 15px;
  }
`;

const Category = styled.span`
  font-size: clamp(0.7rem, 2vw, 0.75rem);
  color: #667eea;
  background: rgba(102, 126, 234, 0.15);
  padding: 4px 10px;
  border-radius: 12px;
  text-transform: uppercase;
  font-weight: 600;
  display: inline-block;
`;

const ProjectTitle = styled.h3`
  font-size: clamp(1.1rem, 3vw, 1.3rem);
  margin: 10px 0 5px;
  word-wrap: break-word;
  line-height: 1.3;
`;

const Description = styled.p`
  color: #bbb;
  font-size: clamp(0.85rem, 2vw, 0.9rem);
  line-height: 1.6;
  word-wrap: break-word;
  margin: 8px 0;
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
  font-size: clamp(0.7rem, 1.8vw, 0.75rem);
  color: #ccc;
  white-space: nowrap;
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
  font-size: clamp(0.85rem, 2vw, 0.9rem);
  margin-top: 10px;

  &:hover {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    padding: 8px 16px;
  }
`;

const Footer = styled.footer`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px 20px;

  @media (max-width: 600px) {
    padding: 30px 15px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 15px;

  a {
    color: #aaa;
    font-size: clamp(20px, 4vw, 22px);
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

  @media (max-width: 600px) {
    margin: 60px auto;
  }
`;

const LoaderText = styled.span`
  position: absolute;
  top: 0;
  color: #c8b6ff;
  font-size: clamp(0.7rem, 2vw, 0.8rem);
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

// ====================== Error Message Component ======================
const ErrorContainer = styled.div`
  max-width: 500px;
  margin: 60px auto;
  padding: 30px 20px;
  background: rgba(255, 59, 48, 0.1);
  border: 1px solid rgba(255, 59, 48, 0.3);
  border-radius: 20px;
  animation: ${shake} 0.5s ease;

  @media (max-width: 600px) {
    margin: 40px 15px;
    padding: 25px 15px;
  }
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  color: #ff3b30;
  margin-bottom: 15px;

  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

const ErrorTitle = styled.h2`
  font-size: clamp(1.3rem, 4vw, 1.5rem);
  color: #ff3b30;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.p`
  color: #bbb;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  line-height: 1.6;
  margin-bottom: 20px;
  padding: 0 10px;
`;

const RetryButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Poppins", sans-serif;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    padding: 10px 25px;
  }
`;

const NetworkStatus = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${(props) =>
    props.$isOnline ? "rgba(52, 199, 89, 0.2)" : "rgba(255, 59, 48, 0.2)"};
  border: 1px solid
    ${(props) =>
      props.$isOnline ? "rgba(52, 199, 89, 0.5)" : "rgba(255, 59, 48, 0.5)"};
  color: ${(props) => (props.$isOnline ? "#34c759" : "#ff3b30")};
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1000;
  animation: ${fadeInUp} 0.5s ease;

  @media (max-width: 600px) {
    top: 10px;
    right: 10px;
    font-size: 0.75rem;
    padding: 6px 12px;
  }
`;

const EmptyState = styled.div`
  padding: 60px 20px;
  color: #aaa;
  font-size: clamp(1rem, 2.5vw, 1.1rem);

  @media (max-width: 600px) {
    padding: 40px 15px;
  }
`;

// ====================== Component ======================
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [retrying, setRetrying] = useState(false);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const fetchProjects = async () => {
    // Check network connectivity first
    if (!navigator.onLine) {
      setError({
        type: "offline",
        message:
          "No internet connection. Please check your network and try again.",
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        "https://protofole-back-end.onrender.com/user/api/projects",
        {
          timeout: 15000, // 15 second timeout
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data && Array.isArray(res.data)) {
        setProjects(res.data);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);

      // Detailed error handling
      if (err.code === "ECONNABORTED" || err.message.includes("timeout")) {
        setError({
          type: "timeout",
          message:
            "Request timed out. The server is taking too long to respond. Please try again.",
        });
      } else if (err.response) {
        // Server responded with error status
        setError({
          type: "server",
          message: `Server error (${err.response.status}). Please try again later.`,
        });
      } else if (err.request) {
        // Request made but no response received
        setError({
          type: "network",
          message:
            "Network error. Unable to reach the server. Please check your connection.",
        });
      } else {
        // Something else went wrong
        setError({
          type: "unknown",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  };

  const handleRetry = () => {
    setRetrying(true);
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Auto-retry when coming back online
  useEffect(() => {
    if (isOnline && error?.type === "offline") {
      fetchProjects();
    }
  }, [isOnline]);

  return (
    <Page>
      {/* Network Status Indicator */}
      {!isOnline && (
        <NetworkStatus $isOnline={false}>
          <FaWifi />
          Offline
        </NetworkStatus>
      )}

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
      ) : error ? (
        <ErrorContainer>
          <ErrorIcon>
            {error.type === "offline" ? <FaWifi /> : <FaExclamationTriangle />}
          </ErrorIcon>
          <ErrorTitle>
            {error.type === "offline"
              ? "No Internet Connection"
              : error.type === "timeout"
              ? "Connection Timeout"
              : error.type === "server"
              ? "Server Error"
              : "Connection Error"}
          </ErrorTitle>
          <ErrorMessage>{error.message}</ErrorMessage>
          <RetryButton onClick={handleRetry} disabled={retrying}>
            {retrying ? "Retrying..." : "Try Again"}
          </RetryButton>
        </ErrorContainer>
      ) : projects.length > 0 ? (
        <ProjectsGrid
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {projects.map((p) => (
            <Card
              key={p._id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <ProjectImage>
                <img
                  src={
                    p.image ||
                    "https://via.placeholder.com/400x200?text=No+Image"
                  }
                  alt={p.appName || "Project"}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x200?text=Image+Not+Available";
                  }}
                />
              </ProjectImage>
              <Content>
                <Category>{p.applicationType || "General"}</Category>
                <ProjectTitle>{p.appName || "Untitled Project"}</ProjectTitle>
                <Description>
                  {p.description || "No description available"}
                </Description>
                <Tags>
                  {Array.isArray(p.tools) && p.tools.length > 0 ? (
                    p.tools.map((t, j) => <Tag key={j}>{t}</Tag>)
                  ) : (
                    <Tag>No tags</Tag>
                  )}
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
        <EmptyState>
          <p>No projects found 😢</p>
          <p style={{ fontSize: "0.9rem", marginTop: "10px" }}>
            Check back later for updates!
          </p>
        </EmptyState>
      )}
    </Page>
  );
};

export default Projects;
