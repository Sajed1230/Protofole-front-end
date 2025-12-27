import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaExclamationTriangle, FaWifi } from "react-icons/fa";
import axios from "axios";

// ====================== Animations ======================
const fadeInUp = keyframes`
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
`;

// ====================== Binary Loader Animations ======================
const binaryAnimationA = keyframes`
  0% {
    transform: translate(30px, 0) rotate(30deg);
    opacity: 0;
  }
  100% {
    transform: translate(30px, 150px) rotate(-50deg);
    opacity: 1;
  }
`;

const binaryAnimationB = keyframes`
  0% {
    transform: translate(50px, 0) rotate(-40deg);
    opacity: 0;
  }
  100% {
    transform: translate(40px, 150px) rotate(80deg);
    opacity: 1;
  }
`;

const binaryAnimationC = keyframes`
  0% {
    transform: translate(70px, 0) rotate(10deg);
    opacity: 0;
  }
  100% {
    transform: translate(60px, 150px) rotate(70deg);
    opacity: 1;
  }
`;

const binaryAnimationD = keyframes`
  0% {
    transform: translate(30px, 0) rotate(-50deg);
    opacity: 0;
  }
  100% {
    transform: translate(45px, 150px) rotate(30deg);
    opacity: 1;
  }
`;

// ====================== Styled Components ======================
const Page = styled.div`
  font-family: "Poppins", sans-serif;
  color: #fff;
  min-height: 100vh;
  overflow-x: hidden;
  text-align: center;
  background: 
    linear-gradient(rgba(13, 13, 26, 0.9), rgba(13, 13, 26, 0.9)),
    url('/undefined.jpeg') center/cover no-repeat fixed;
  position: relative;
  width: 100%;
  padding-top: 100px;

  @media (max-width: 768px) {
    padding-top: 80px;
    background-attachment: scroll;
  }
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

const ProjectsGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px 80px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  width: 100%;
  box-sizing: border-box;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
    padding: 30px 20px 60px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 30px 15px 50px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px 15px 40px;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  will-change: transform;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 450px;

  &:hover {
    transform: translateY(-8px) translateZ(0);
    border-color: rgba(102, 126, 234, 0.5);
    box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
  }

  @media (max-width: 768px) {
    min-height: 420px;
    border-radius: 18px;
  }

  @media (max-width: 600px) {
    min-height: auto;
    border-radius: 15px;

    &:hover {
      transform: translateY(-4px) translateZ(0);
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
    will-change: transform;
  }

  ${Card}:hover & img {
    transform: scale(1.05) translateZ(0);
  }

  @media (max-width: 600px) {
    height: 180px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
`;

const Content = styled.div`
  padding: 24px;
  text-align: left;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 12px;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 10px;
  }

  @media (max-width: 600px) {
    padding: 18px;
    gap: 8px;
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
  margin: 0;
  word-wrap: break-word;
  line-height: 1.4;
  font-weight: 600;
`;

const Description = styled.p`
  color: #bbb;
  font-size: clamp(0.85rem, 2vw, 0.9rem);
  line-height: 1.6;
  word-wrap: break-word;
  margin: 0;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 100%;
  margin: 4px 0;

  @media (max-width: 600px) {
    gap: 6px;
  }
`;

const Tag = styled.span`
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.3);
  }

  @media (max-width: 600px) {
    padding: 5px 10px;
    font-size: 0.8rem;
  }
`;

const LinkButton = styled.a`
  display: inline-block;
  background: rgba(102, 126, 234, 0.15);
  color: #667eea;
  padding: 10px 24px;
  border-radius: 25px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: clamp(0.85rem, 2vw, 0.9rem);
  margin-top: auto;
  text-align: center;
  align-self: flex-start;
  border: 1px solid rgba(102, 126, 234, 0.3);

  &:hover {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    transform: translateY(-2px) translateZ(0);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    border-color: transparent;
  }

  @media (max-width: 600px) {
    padding: 9px 20px;
    width: 100%;
    align-self: stretch;
    text-align: center;
  }
`;

// ====================== Binary Loader Styled Components ======================
const BinaryLoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  width: 100%;
  padding: 40px 20px;

  @media (max-width: 600px) {
    min-height: 250px;
    padding: 30px 15px;
  }
`;

const BinaryLoader = styled.div`
  width: 130px;
  height: 170px;
  position: relative;
  font-family: inherit;

  &::before,
  &::after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    bottom: 30px;
    left: 15px;
    z-index: 1;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 20px solid #1b2a33;
    transform: scale(1);
    transition: all 0.2s ease;
  }

  &::after {
    border-right: 15px solid transparent;
    border-bottom: 20px solid #162229;
  }

  @media (max-width: 600px) {
    width: 110px;
    height: 150px;
    transform: scale(0.9);

    &::before,
    &::after {
      left: 10px;
      bottom: 25px;
      border-left-width: 40px;
      border-right-width: 40px;
      border-bottom-width: 18px;
    }

    &::after {
      border-right-width: 12px;
    }
  }
`;

const GettingThere = styled.span`
  width: 120%;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: -7%;
  font-size: 12px;
  letter-spacing: 2px;
  color: white;
  font-family: "Poppins", sans-serif;

  @media (max-width: 600px) {
    font-size: 10px;
    letter-spacing: 1.5px;
  }
`;

const Binary = styled.span`
  width: 100%;
  height: 140px;
  display: block;
  color: white;
  position: absolute;
  top: 0;
  left: 15px;
  z-index: 2;
  overflow: hidden;

  &::before,
  &::after {
    font-family: "Poppins", sans-serif;
    font-size: 24px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  @media (max-width: 600px) {
    left: 10px;
    height: 120px;

    &::before,
    &::after {
      font-size: 20px;
    }
  }

  &:nth-child(1)::before {
    content: "0";
    animation: ${binaryAnimationA} 1.1s linear infinite;
  }

  &:nth-child(1)::after {
    content: "0";
    animation: ${binaryAnimationB} 1.3s linear infinite;
  }

  &:nth-child(2)::before {
    content: "1";
    animation: ${binaryAnimationC} 0.9s linear infinite;
  }

  &:nth-child(2)::after {
    content: "1";
    animation: ${binaryAnimationD} 0.7s linear infinite;
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
  background: rgba(255, 59, 48, 0.9);
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  transform: translateZ(0);

  @media (max-width: 600px) {
    top: 10px;
    right: 10px;
    padding: 8px 15px;
    font-size: 0.9rem;
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
    // Don't rely solely on navigator.onLine as it's not always accurate on mobile
    try {
      setLoading(true);
      setError(null);

      // Use a longer timeout for mobile networks (30 seconds)
      const res = await axios.get(
        "https://protofole-back-end.onrender.com/user/api/projects",
        {
          timeout: 30000, // Increased from 15s to 30s for mobile networks
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

      // Check if it's actually a network error or just a slow connection
      if (err.code === "ECONNABORTED" || err.message.includes("timeout")) {
        // Check if navigator.onLine is actually false before showing timeout
        if (!navigator.onLine) {
          setError({
            type: "offline",
            message:
              "No internet connection detected. Please check your network and try again.",
          });
        } else {
          setError({
            type: "timeout",
            message:
              "The request is taking longer than expected. This might be due to a slow connection. Please try again.",
          });
        }
      } else if (err.response) {
        setError({
          type: "server",
          message: `Server error (${err.response.status}). Please try again later.`,
        });
      } else if (err.request && !navigator.onLine) {
        // Only show offline error if navigator.onLine confirms it
        setError({
          type: "offline",
          message:
            "No internet connection. Please check your network and try again.",
        });
      } else if (err.request) {
        // Network error but might be temporary
        setError({
          type: "network",
          message:
            "Unable to connect to the server. Please check your internet connection and try again.",
        });
      } else {
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

  useEffect(() => {
    // Retry when coming back online
    if (isOnline && error?.type === "offline") {
      fetchProjects();
    }
  }, [isOnline, error?.type]);

  return (
    <Page>
      {!isOnline && (
        <NetworkStatus>
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
        <BinaryLoaderWrapper>
          <BinaryLoader>
            <Binary />
            <Binary />
            <GettingThere>LOADING PROJECTS...</GettingThere>
          </BinaryLoader>
        </BinaryLoaderWrapper>
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
        <ProjectsGrid>
          {projects.map((p) => (
            <Card key={p._id}>
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
                    p.tools.slice(0, 5).map((t, j) => <Tag key={j}>{t}</Tag>)
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
