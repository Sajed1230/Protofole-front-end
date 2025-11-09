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
} from "react-icons/fa";

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
const PageContainer = styled.div`
  //background: #0a0a0a;
  color: #fff;
  min-height: 100vh;
  overflow-x: hidden;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const ContactSection = styled.section`
  padding: 150px 50px 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
`;

const ContactInfo = styled.div`
  animation: ${fadeInLeft} 1s ease;
`;

const ContactTitle = styled.h1`
  font-size: 56px;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const ContactSubtitle = styled.p`
  font-size: 20px;
  color: #888;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
    border-color: rgba(102, 126, 234, 0.3);
    transform: translateX(10px);
  }
`;

const IconBox = styled.div`
  font-size: 28px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  flex-shrink: 0;
`;

const ContactItemContent = styled.div`
  h3 {
    font-size: 18px;
    margin-bottom: 5px;
  }

  p,
  a {
    color: #888;
    text-decoration: none;
    transition: 0.3s ease;
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
  padding: 50px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  label {
    display: block;
    margin-bottom: 10px;
    color: #b8b8b8;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
  }

  input,
  textarea {
    width: 100%;
    padding: 15px 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.1);
      box-shadow: 0 0 20px rgba(102, 126, 234, 0.2);
    }
  }

  textarea {
    min-height: 150px;
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 18px;
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
  padding: 80px 50px;
  background: #0f0f0f;
`;

const SocialTitle = styled.h2`
  font-size: 36px;
  margin-bottom: 30px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  font-size: 32px;
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
  padding: 40px 50px;
  background: #0a0a0a;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  p {
    color: #666;
    font-size: 14px;
  }
`;

// ====================== Component ======================
const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    alert(
      `Thank you ${name}! Your message has been sent. I'll get back to you soon at ${email}.`
    );
    e.target.reset();
  };

  return (
    <PageContainer>
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
                  <a href="mailto:sajed@example.com">sajed@example.com</a>
                </ContactItemContent>
              </ContactItem>

              <ContactItem>
                <IconBox>
                  <FaPhone />
                </IconBox>
                <ContactItemContent>
                  <h3>Phone</h3>
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
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

              <SubmitButton type="submit">Send Message</SubmitButton>
            </ContactForm>
          </FormWrapper>
        </ContactContainer>
      </ContactSection>

      <SocialSection>
        <SocialTitle>Connect With Me</SocialTitle>
        <SocialLinks>
          <SocialLink href="#">
            <FaGithub />
          </SocialLink>
          <SocialLink href="#">
            <FaLinkedin />
          </SocialLink>
          <SocialLink href="#">
            <FaTwitter />
          </SocialLink>
          <SocialLink href="#">
            <FaInstagram />
          </SocialLink>
        </SocialLinks>
      </SocialSection>

      <Footer>
        <p>© 2025 Sajed Murtada. All rights reserved.</p>
      </Footer>
    </PageContainer>
  );
};

export default Contact;
