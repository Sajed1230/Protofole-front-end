import React from "react";
import styled, { keyframes } from "styled-components";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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

// ====================== Styled Components ======================
// ====================== Styled Components ======================
const PageContainer = styled.div`
  color: #fff;
  min-height: 100vh;
  overflow-x: hidden;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: 
    linear-gradient(rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.85)),
    url('/undefined.jpeg') center/cover no-repeat fixed;
  
  @media (max-width: 768px) {
    background-attachment: scroll;
  }
`;

const ContactSection = styled.section`
  padding: clamp(80px, 10vw, 150px) clamp(20px, 5vw, 50px) clamp(50px, 8vw, 100px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(40px, 6vw, 80px);
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  @media (max-width: 480px) {
    gap: 30px;
  }
`;

const ContactInfo = styled.div`
  animation: ${fadeInLeft} 1s ease;
`;

const ContactTitle = styled.h1`
  font-size: clamp(32px, 6vw, 56px);
  margin-bottom: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
`;

const ContactSubtitle = styled.p`
  font-size: clamp(16px, 2vw, 20px);
  color: #888;
  margin-bottom: clamp(20px, 3vw, 40px);
  line-height: 1.6;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 3vw, 30px);
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(15px, 2vw, 20px);
  padding: clamp(15px, 2vw, 20px);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
    border-color: rgba(102, 126, 234, 0.3);
    transform: translateX(5px);
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const IconBox = styled.div`
  font-size: clamp(20px, 4vw, 28px);
  width: clamp(50px, 10vw, 60px);
  height: clamp(50px, 10vw, 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  flex-shrink: 0;
`;

const ContactItemContent = styled.div`
  h3 {
    font-size: clamp(16px, 2vw, 18px);
    margin-bottom: 5px;
  }

  p,
  a {
    color: #888;
    text-decoration: none;
    transition: 0.3s ease;
    font-size: clamp(14px, 1.8vw, 16px);
  }

  a:hover {
    color: #764ba2;
  }
`;

const FormWrapper = styled.div`
  animation: ${fadeInRight} 1s ease;
`;

const ContactForm = styled.form`
  background: rgba(255, 255, 255, 0.03);
  padding: clamp(30px, 4vw, 50px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: clamp(15px, 2.5vw, 25px);

  label {
    display: block;
    margin-bottom: 10px;
    color: #b8b8b8;
    font-size: clamp(12px, 2vw, 14px);
    font-weight: 600;
    letter-spacing: 1px;
  }

  input,
  textarea {
    width: 100%;
    padding: clamp(12px, 2vw, 15px);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: #fff;
    font-size: clamp(14px, 2vw, 16px);
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.1);
      box-shadow: 0 0 20px rgba(102, 126, 234, 0.2);
    }
  }

  textarea {
    min-height: clamp(100px, 15vw, 150px);
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: clamp(14px, 2vw, 18px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: clamp(16px, 2vw, 18px);
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
  text-transform: uppercase;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
  }
`;

const SocialSection = styled.section`
  text-align: center;
  padding: clamp(40px, 6vw, 80px) clamp(20px, 5vw, 50px);
  background: #0f0f0f;
`;

const SocialTitle = styled.h2`
  font-size: clamp(24px, 5vw, 36px);
  margin-bottom: 30px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: clamp(15px, 4vw, 30px);
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(60px, 15vw, 80px);
  height: clamp(60px, 15vw, 80px);
  font-size: clamp(24px, 5vw, 32px);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  text-decoration: none;
  transition: 0.4s ease;
  animation: ${fadeInUp} 1s ease both;

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transform: translateY(-10px) rotate(5deg);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: clamp(20px, 3vw, 40px) clamp(20px, 5vw, 50px);
  background: #0a0a0a;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  p {
    color: #666;
    font-size: clamp(12px, 2vw, 14px);
  }
`;

const Spinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #fff;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-left: 10px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;


// ====================== Component ======================
const Contact = () => {
  const [loading, setLoading] = React.useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); // start spinner

  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    subject: e.target.subject.value,
    message: e.target.message.value,
  };

  try {
    const response = await axios.post(
      "https://protofole-back-end.onrender.com/user/contact",
      formData
    );

    if (response.status === 200) {
      toast.success(`Thank you ${formData.name}! Your message has been sent.`, {
        duration: 4000,
        icon: "🚀",
        style: {
          borderRadius: "12px",
          background: "#7a6086",
          color: "#fff",
          fontWeight: "500",
          fontSize: "16px",
          padding: "14px 18px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#886a96",
        },
      });
      e.target.reset();
    }
  } catch (error) {
    console.error("❌ Error sending message:", error);
    const errorMessage = error.response?.data?.error || error.message || "Something went wrong while sending your message. Please try again.";
    toast.error(errorMessage, {
      duration: 5000,
      style: {
        borderRadius: "12px",
        background: "#ff3b30",
        color: "#fff",
        fontWeight: "500",
        fontSize: "16px",
        padding: "14px 18px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      },
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <PageContainer>
      <Toaster position="top-right" reverseOrder={false} />
      <ContactSection>
        <ContactContainer>
          <ContactInfo>
            <ContactTitle>
              Let's Work
              <br />
              Together
            </ContactTitle>
            <ContactSubtitle>
              Have a project in mind? I'd love to hear about it. Let's chat and
              bring your ideas to life!
            </ContactSubtitle>

            <ContactDetails>
              <ContactItem>
                <IconBox>
                  <FaEnvelope />
                </IconBox>
                <ContactItemContent>
                  <h3>Email</h3>
                  <a href="mailto:jokersajed11@gmail.com">jokersajed11@gmail.com</a>
                </ContactItemContent>
              </ContactItem>

              <ContactItem>
                <IconBox>
                  <FaPhone />
                </IconBox>
                <ContactItemContent>
                  <h3>Phone</h3>
                  <a href="tel:+250794098366">+250 794098366</a>
                </ContactItemContent>
              </ContactItem>

              <ContactItem>
                <IconBox>
                  <FaMapMarkerAlt />
                </IconBox>
                <ContactItemContent>
                  <h3>Location</h3>
                  <p>Available for remote work worldwide</p>
                </ContactItemContent>
              </ContactItem>

              <ContactItem>
                <IconBox>
                  <FaClock />
                </IconBox>
                <ContactItemContent>
                  <h3>Working Hours</h3>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                </ContactItemContent>
              </ContactItem>
            </ContactDetails>
          </ContactInfo>

          <FormWrapper>
            <ContactForm onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Project Inquiry"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </FormGroup>

              <SubmitButton type="submit" disabled={loading}>
                {loading ? (
                  <>
                    Sending
                    <Spinner />
                  </>
                ) : (
                  "Send Message"
                )}
              </SubmitButton>
            </ContactForm>
          </FormWrapper>
        </ContactContainer>
      </ContactSection>


    </PageContainer>
  );
};

export default Contact;