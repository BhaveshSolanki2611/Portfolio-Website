import { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Create mailto link with form data
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(`Name: ${data.name}
Email: ${data.email}
Message: ${data.message}`);
    
    // Open email client
    window.location.href = `mailto:bhaveshsolanki26112004@gmail.com?subject=${subject}&body=${body}`;
    
    // Show success message
    const alertElement = document.querySelector('.contact-alert');
    alertElement.classList.add('success');
    alertElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg> Message prepared in your email client!';
    
    // Reset form
    e.target.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      alertElement.classList.remove('success');
    }, 5000);
  };

  return (
    <div className="app">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Bhavesh Solanki</h1>
            <h2>Web Developer & UI/UX Designer</h2>
            <p>Building scalable, user-centric web solutions</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn primary-btn">View Projects</a>
              <a href="#contact" className="btn secondary-btn">Contact Me</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-image">
              {/* Profile image */}
              <img src="/images/bhavesh image.jpg" alt="Bhavesh Solanki" className="profile-image" />
            </div>
            <div className="about-text">
              <p>
                Hello! I'm Bhavesh Solanki, a passionate web developer based in New Delhi, India.
                With expertise in React.js, Node.js, and modern web technologies, I specialize
                in building scalable, user-centric solutions.
              </p>
              <p>
                My approach to design and development focuses on creating intuitive user
                experiences that solve real problems. I believe in clean code, continuous
                learning, and pushing the boundaries of what's possible on the web.
              </p>
              <div className="personal-info">
                <div className="info-item">
                  <span className="info-title">Name:</span>
                  <span className="info-value">Bhavesh Solanki</span>
                </div>
                <div className="info-item">
                  <span className="info-title">Location:</span>
                  <span className="info-value">New Delhi, India</span>
                </div>
                <div className="info-item">
                  <span className="info-title">Email:</span>
                  <span className="info-value">bhaveshsolanki26112004@gmail.com</span>
                </div>
                <div className="info-item">
                  <span className="info-title">Education:</span>
                  <span className="info-value">B.Tech in Electronics and Communication Engineering (AI/ML Specialization), NSUT</span>
                </div>
              </div>
              <a href="#contact" className="btn primary-btn">Get In Touch</a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-container">
            <div className="skill-category">
              <h3>Programming Languages</h3>
              <div className="skills-grid">
                <div className="skill-item">Java</div>
                <div className="skill-item">Python</div>
                <div className="skill-item">C</div>
                <div className="skill-item">C++</div>
                <div className="skill-item">JavaScript</div>
              </div>
            </div>
            <div className="skill-category">
              <h3>Web Development</h3>
              <div className="skills-grid">
                <div className="skill-item">React.js</div>
                <div className="skill-item">Node.js</div>
                <div className="skill-item">Express.js</div>
                <div className="skill-item">HTML5</div>
                <div className="skill-item">CSS3</div>
              </div>
            </div>
            <div className="skill-category">
              <h3>Databases</h3>
              <div className="skills-grid">
                <div className="skill-item">MySQL</div>
                <div className="skill-item">MongoDB</div>
              </div>
            </div>
            <div className="skill-category">
              <h3>Tools & Technologies</h3>
              <div className="skills-grid">
                <div className="skill-item">Git</div>
                <div className="skill-item">Vite</div>
                <div className="skill-item">Postman</div>
                <div className="skill-item">MS Excel</div>
                <div className="skill-item">MS Office</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section">
        <div className="container">
          <h2 className="section-title">Professional Experience</h2>
          <div className="experience-timeline">
            <div className="experience-item">
              <div className="experience-info">
                <h3>Tech and Robotics Associate Intern</h3>
                <h4>Rancho Labs</h4>
                <p className="experience-duration">January 2024 - Present</p>
              </div>
              <div className="experience-content">
                <ul className="experience-responsibilities">
                  <li>Developing robotics prototypes and conducting technical workshops</li>
                  <li>Designing educational materials for technical training programs</li>
                  <li>Optimizing designs resulting in 30% performance improvement</li>
                  <li>Collaborating with cross-functional teams to deliver innovative solutions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <h2 className="section-title">Portfolio Projects</h2>
          <div className="projects-grid">
            {/* Project 1 */}
            <div className="project-card">
              <div className="project-image">
                <img 
                  src="/images/React movie web app image.png" 
                  alt="React Movie Web-App"
                  loading="lazy"
                  sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                />
              </div>
              <div className="project-content">
                <h3>React Movie Web-App</h3>
                <p>A movie discovery platform built with React.js and Vite, integrating the TMDB API for real-time data.</p>
                <div className="project-tech">
                  <span>React.js</span>
                  <span>Vite</span>
                  <span>API Integration</span>
                </div>
                <div className="project-links">
                  <a href="https://react-movie-web-app-opal.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn project-btn">Live Demo</a>
                  <a href="#" className="btn project-btn">View Code</a>
                </div>
              </div>
            </div>
            
            {/* Project 2 */}
            <div className="project-card">
              <div className="project-image">
                <img 
                  src="/images/CRM image.png" 
                  alt="CRM and Campaign Manager"
                  loading="lazy"
                  sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                />
              </div>
              <div className="project-content">
                <h3>CRM and Campaign Manager</h3>
                <p>A tool developed using Node.js, MySQL, and React.js to streamline marketing campaigns and customer relationship management.</p>
                <div className="project-tech">
                  <span>Node.js</span>
                  <span>MySQL</span>
                  <span>React.js</span>
                </div>
                <div className="project-links">
                  <a href="#" className="btn project-btn">View Code</a>
                </div>
              </div>
            </div>
            
            {/* Project 3 */}
            <div className="project-card">
              <div className="project-image">
                <img 
                  src="/images/Weather wave image.png" 
                  alt="WeatherWave App"
                  loading="lazy"
                  sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                />
              </div>
              <div className="project-content">
                <h3>WeatherWave App</h3>
                <p>A weather forecasting app featuring geolocation, dark mode, and a responsive interface using the OpenWeatherMap API.</p>
                <div className="project-tech">
                  <span>JavaScript</span>
                  <span>API Integration</span>
                  <span>Responsive Design</span>
                </div>
                <div className="project-links">
                  <a href="#" className="btn project-btn">View Code</a>
                </div>
              </div>
            </div>
            
            {/* Project 4 */}
            <div className="project-card">
              <div className="project-image">
                <img 
                  src="/images/Netflix UI IMAGE.png" 
                  alt="Netflix UI Clone"
                  loading="lazy"
                  sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                />
              </div>
              <div className="project-content">
                <h3>Netflix UI Clone with Anime Theme</h3>
                <p>A creative UI clone of Netflix with an anime theme, showcasing frontend development skills.</p>
                <div className="project-tech">
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                </div>
                <div className="project-links">
                  <a href="#" className="btn project-btn">View Code</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section id="education" className="section">
        <div className="container">
          <h2 className="section-title">Education & Certifications</h2>
          <div className="education-container">
            <div className="education-item">
              <h3>B.Tech in Electronics and Communication Engineering (AI/ML Specialization)</h3>
              <h4>Netaji Subhas University of Technology (NSUT), New Delhi</h4>
              <p>Expected Graduation: 2025</p>
            </div>
            
            <h3 className="cert-title">Certifications</h3>
            <div className="cert-grid">
              <div className="cert-item">
                <h4>PHP (Advanced)</h4>
                <p>Cutshort</p>
                <p>January 2025</p>
              </div>
              <div className="cert-item">
                <h4>Ethical Hacking</h4>
                <p>NPTEL</p>
                <p>July - October 2024</p>
              </div>
              <div className="cert-item">
                <h4>Blockchain and its Applications</h4>
                <p>NPTEL</p>
                <p>January - April 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-container">
            <div className="contact-info">
              <h3 className="contact-heading">Get in Touch</h3>
              <p className="contact-subtitle">Have a question or want to work together?</p>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <a href="mailto:bhaveshsolanki26112004@gmail.com" className="contact-link">
                    bhaveshsolanki26112004@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Location</h3>
                  <p>New Delhi, India</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Social Profiles</h3>
                  <div className="social-links">
                    <a href="https://www.linkedin.com/in/bhavesh-solanki-475628248/" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin /> LinkedIn
                    </a>
                    <a href="https://github.com/BhaveshSolanki2611" target="_blank" rel="noopener noreferrer">
                      <FaGithub /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <h3 className="form-heading">Send a Message</h3>
              <p className="form-subtitle">Got a question or proposal? Go ahead.</p>
              
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <div className="input-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c0-.001-0-.004-.006-.064-.001-.02-.015-.143-.14-.332C12.297 12.096 10.636 11 8 11c-2.637 0-4.3 1.096-4.855 2.6-0.123.189-.135.31-.137.33-.003.06-.006.064-.006.065v.003Z"/>
                      </svg>
                    </div>
                    <input type="text" id="name" name="name" placeholder="Your Name" required />
                    <label htmlFor="name">Your Name</label>
                  </div>
                  
                  <div className="form-group">
                    <div className="input-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                      </svg>
                    </div>
                    <input type="email" id="email" name="email" placeholder="Your Email" required />
                    <label htmlFor="email">Your Email</label>
                  </div>
                </div>
                
                <div className="form-group">
                  <div className="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM6.5 7.5A.5.5 0 0 1 7 7h3a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5Z"/>
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm3.5-4.5a.5.5 0 0 1-.5.5H7a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5Z"/>
                    </svg>
                  </div>
                  <input type="text" id="subject" name="subject" placeholder="Subject" required />
                  <label htmlFor="subject">Subject</label>
                </div>
                
                <div className="form-group">
                  <div className="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                      <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  </div>
                  <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
                  <label htmlFor="message">Your Message</label>
                </div>
                
                <div className="form-submit">
                  <button type="submit" className="btn primary-btn">
                    <span>Send Message</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                    </svg>
                  </button>
                </div>
                <div className="contact-alert"></div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <a href="#home">
                <span className="footer-logo-text">Bhavesh</span>
                <span className="footer-logo-dot"></span>
              </a>
            </div>
            
            <div className="footer-links">
              <div className="footer-nav">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#skills">Skills</a></li>
                  <li><a href="#projects">Projects</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
              
              <div className="footer-social">
                <h4>Connect</h4>
                <div className="social-icons">
                  <a href="https://www.linkedin.com/in/bhavesh-solanki-475628248/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                  <a href="https://github.com/BhaveshSolanki2611" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="footer-copyright">
              <p>&copy; 2024 Bhavesh Solanki. All Rights Reserved.</p>
              <p className="footer-credits">Made with ❤️ using React</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
