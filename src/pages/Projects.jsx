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

// ====================== Banter Loader Animations ======================
const moveBox1 = keyframes`
  9.0909090909% { transform: translate(-26px, 0); }
  18.1818181818% { transform: translate(0px, 0); }
  27.2727272727% { transform: translate(0px, 0); }
  36.3636363636% { transform: translate(26px, 0); }
  45.4545454545% { transform: translate(26px, 26px); }
  54.5454545455% { transform: translate(26px, 26px); }
  63.6363636364% { transform: translate(26px, 26px); }
  72.7272727273% { transform: translate(26px, 0px); }
  81.8181818182% { transform: translate(0px, 0px); }
  90.9090909091% { transform: translate(-26px, 0px); }
  100% { transform: translate(0px, 0px); }
`;

const moveBox2 = keyframes`
  9.0909090909% { transform: translate(0, 0); }
  18.1818181818% { transform: translate(26px, 0); }
  27.2727272727% { transform: translate(0px, 0); }
  36.3636363636% { transform: translate(26px, 0); }
  45.4545454545% { transform: translate(26px, 26px); }
  54.5454545455% { transform: translate(26px, 26px); }
  63.6363636364% { transform: translate(26px, 26px); }
  72.7272727273% { transform: translate(26px, 26px); }
  81.8181818182% { transform: translate(0px, 26px); }
  90.9090909091% { transform: translate(0px, 26px); }
  100% { transform: translate(0px, 0px); }
`;

const moveBox3 = keyframes`
  9.0909090909% { transform: translate(-26px, 0); }
  18.1818181818% { transform: translate(-26px, 0); }
  27.2727272727% { transform: translate(0px, 0); }
  36.3636363636% { transform: translate(-26px, 0); }
  45.4545454545% { transform: translate(-26px, 0); }
  54.5454545455% { transform: translate(-26px, 0); }
  63.6363636364% { transform: translate(-26px, 0); }
  72.7272727273% { transform: translate(-26px, 0); }
  81.8181818182% { transform: translate(-26px, -26px); }
  90.9090909091% { transform: translate(0px, -26px); }
  100% { transform: translate(0px, 0px); }
`;

const moveBox4 = keyframes`
  9.0909090909% { transform: translate(-26px, 0); }
  18.1818181818% { transform: translate(-26px, 0); }
  27.2727272727% { transform: translate(-26px, -26px); }
  36.3636363636% { transform: translate(0px, -26px); }
  45.4545454545% { transform: translate(0px, 0px); }
  54.5454545455% { transform: translate(0px, -26px); }
  63.6363636364% { transform: translate(0px, -26px); }
  72.7272727273% { transform: translate(0px, -26px); }
  81.8181818182% { transform: translate(-26px, -26px); }
  90.9090909091% { transform: translate(-26px, 0px); }
  100% { transform: translate(0px, 0px); }
`;

const moveBox5 = keyframes`
  9.0909090909% { transform: translate(0, 0); }
  18.1818181818% { transform: translate(0, 0); }
  27.2727272727% { transform: translate(0, 0); }
  36.3636363636% { transform: translate(26px, 0); }
  45.4545454545% { transform: translate(26px, 0); }
  54.5454545455% { transform: translate(26px, 0); }
  63.6363636364% { transform: translate(26px, 0); }
  72.7272727273% { transform: translate(26px, 0); }
  81.8181818182% { transform: translate(26px, -26px); }
  90.9090909091% { transform: translate(0px, -26px); }
  100% { transform: translate(0px, 0px); }
`;

const moveBox6 = keyframes`
  9.0909090909% { transform: translate(0, 0); }
  18.1818181818% { transform: translate(-26px, 0); }
  27.2727272727% { transform: translate(-26px, 0); }
  36.3636363636% { transform: translate(0px, 0); }
  45.4545454545% { transform: translate(0px, 0); }
  54.5454545455% { transform: translate(0px, 0); }
  63.6363636364% { transform: translate(0px, 0); }
  72.7272727273% { transform: translate(0px, 26px); }
  81.8181818182% { transform: translate(-26px, 26px); }
  90.9090909091% { transform: translate(-26px, 0px); }
  100% { transform: translate(0px, 0px); }
`;

const moveBox7 = keyframes`
  9.0909090909% { transform: translate(26px, 0); }
  18.1818181818% { transform: translate(26px, 0); }
  27.2727272727% { transform: translate(26px, 0); }
  36.3636363636% { transform: translate(0px, 0); }
  45.4545454545% { transform: translate(0px, -26px); }
  54.5454545455% { transform: translate(26px, -26px); }
  63.6363636364% { transform: translate(0px, -26px); }
  72.7272727273% { transform: translate(0px, -26px); }
  81.8181818182% { transform: translate(0px, 0px); }
  90.9090909091% { transform: translate(26px, 0px); }
  100% { transform: translate(0px, 0px); }
`;

const moveBox8 = keyframes`
  9.0909090909% { transform: translate(0, 0); }
  18.1818181818% { transform: translate(-26px, 0); }
  27.2727272727% { transform: translate(-26px, -26px); }
  36.3636363636% { transform: translate(0px, -26px); }
  45.4545454545% { transform: translate(0px, -26px); }
  54.5454545455% { transform: translate(0px, -26px); }
  63.6363636364% { transform: translate(0px, -26px); }
  72.7272727273% { transform: translate(0px, -26px); }
  81.8181818182% { transform: translate(26px, -26px); }
  90.9090909091% { transform: translate(26px, 0px); }
  100% { transform: translate(0px, 0px); }
`;

const moveBox9 = keyframes`
  9.0909090909% { transform: translate(-26px, 0); }
  18.1818181818% { transform: translate(-26px, 0); }
  27.2727272727% { transform: translate(0px, 0); }
  36.3636363636% { transform: translate(-26px, 0); }
  45.4545454545% { transform: translate(0px, 0); }
  54.5454545455% { transform: translate(0px, 0); }
  63.6363636364% { transform: translate(-26px, 0); }
  72.7272727273% { transform: translate(-26px, 0); }
  81.8181818182% { transform: translate(-52px, 0); }
  90.9090909091% { transform: translate(-26px, 0); }
  100% { transform: translate(0px, 0); }
`;

// ====================== Styled Components ======================
const Page = styled.div`
  font-family: "Poppins", sans-serif;
  color: #fff;
  min-height: 100vh;
  overflow-x: hidden;
  text-align: center;
  background: #0d0d1a;
  position: relative;
  width: 100%;
  margin-top: 3rem;
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
  contain: layout style paint;

  &:hover {
    transform: translateY(-8px) translateZ(0);
    border-color: rgba(102, 126, 234, 0.5);
    box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
  }

  @media (max-width: 600px) {
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
  max-width: 100%;
  overflow-x: auto;
  padding: 4px 0;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
  }
`;

const Tag = styled.span`
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
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
    transform: translateY(-2px) translateZ(0);
  }

  @media (max-width: 600px) {
    padding: 8px 16px;
  }
`;

// ====================== Banter Loader Styled Components ======================
const BanterLoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  width: 100%;
  padding: 40px 20px;

  @media (max-width: 600px) {
    min-height: 200px;
    padding: 30px 15px;
  }
`;

const BanterLoader = styled.div`
  position: relative;
  width: 72px;
  height: 72px;

  @media (max-width: 600px) {
    width: 60px;
    height: 60px;
    transform: scale(0.9);
  }

  @media (max-width: 400px) {
    width: 50px;
    height: 50px;
    transform: scale(0.8);
  }
`;

const BanterBox = styled.div`
  float: left;
  position: relative;
  width: 20px;
  height: 20px;
  margin-right: 6px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgb(81, 228, 220);
    border-radius: 6px;
    transform: rotate(45deg);
    opacity: 0.7;
  }

  &:nth-child(3n) {
    margin-right: 0;
    margin-bottom: 6px;
  }

  &:nth-child(1)::before,
  &:nth-child(4)::before {
    margin-left: 26px;
  }

  &:nth-child(3)::before {
    margin-top: 52px;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:nth-child(1) {
    animation: ${moveBox1} 4s infinite;
  }

  &:nth-child(2) {
    animation: ${moveBox2} 4s infinite;
  }

  &:nth-child(3) {
    animation: ${moveBox3} 4s infinite;
  }

  &:nth-child(4) {
    animation: ${moveBox4} 4s infinite;
  }

  &:nth-child(5) {
    animation: ${moveBox5} 4s infinite;
  }

  &:nth-child(6) {
    animation: ${moveBox6} 4s infinite;
  }

  &:nth-child(7) {
    animation: ${moveBox7} 4s infinite;
  }

  &:nth-child(8) {
    animation: ${moveBox8} 4s infinite;
  }

  &:nth-child(9) {
    animation: ${moveBox9} 4s infinite;
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
          timeout: 15000,
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

      if (err.code === "ECONNABORTED" || err.message.includes("timeout")) {
        setError({
          type: "timeout",
          message:
            "Request timed out. The server is taking too long to respond. Please try again.",
        });
      } else if (err.response) {
        setError({
          type: "server",
          message: `Server error (${err.response.status}). Please try again later.`,
        });
      } else if (err.request) {
        setError({
          type: "network",
          message:
            "Network error. Unable to reach the server. Please check your connection.",
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
    if (isOnline && error?.type === "offline") {
      fetchProjects();
    }
  }, [isOnline]);

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
        <BanterLoaderWrapper>
          <BanterLoader>
            <BanterBox />
            <BanterBox />
            <BanterBox />
            <BanterBox />
            <BanterBox />
            <BanterBox />
            <BanterBox />
            <BanterBox />
            <BanterBox />
          </BanterLoader>
        </BanterLoaderWrapper>
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
