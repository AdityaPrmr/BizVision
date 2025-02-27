import { Link } from "react-router-dom";
import "./Home.css";
import logo from "../Assets/logo.png";
import '../Assets/bootstrap-icons.css';
import '../Assets/fontstyle.css';
import '../Assets/layout.css';
import '../Assets/animation.css';
import '../Assets/style.css';
import hero1 from '../Assets/hero1.webp';
import hero2 from '../Assets/hero2.webp';
import blob from '../Assets/blob.svg';
import team from '../Assets/team.webp';
import work1 from '../Assets/work1.webp';
import work2 from '../Assets/work2.webp';
import work3 from '../Assets/work3.webp';
import overlay from '../Assets/overlay.webp';
import favicon from '../Assets/favicon.png';
const Home = () => {

    localStorage.removeItem("user");

    const Mid = (
        <>
        <span className="fade"></span>
        <main>
            <section className="hero-banner">
                <div className="hero-contained">
                    <div className="hero-title fc-white">
                        <h1 className="ff-damion">BizVision</h1>
                        <p className="fs-h4 fw-normal">
                            A comprehensive business management platform designed to streamline operations, enhance productivity, and drive growth. 
                            Whether you're a startup or an established enterprise, BizVision empowers your business to achieve its full potential.
                        </p>
                        <a href="#about" className="btn-bg2 border-round mt-20">
                            Learn More <i className="bi bi-chevron-compact-right"></i>
                        </a>
                    </div>
                </div>
                <div className="hero-socials">
                    <a href="#" className="mt-a icon-link" aria-label="Follow us on facebook">
                        <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="icon-link mt-10" aria-label="Follow us on instagram">
                        <i className="bi bi-instagram"></i>
                    </a>
                    <a href="#" className="icon-link mt-10" aria-label="Follow us on twitter">
                        <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="icon-link mt-10" aria-label="Follow us on youtube">
                        <i className="bi bi-youtube"></i>
                    </a>
                </div>
            </section>
    
            <nav>
                <div className="contained">
                    <a href="index.html" className="logo fc-primary ff-damion row flex-alig-center">
                        <span className="fs-h2">BizVision</span>
                    </a>
                    <input type="checkbox" name="tablet-mobile-menu" className="tab-mob-menu" aria-label="tablet and mobile menu" />
                    <div className="navigation-container">
                    </div>
                </div>
            </nav>
            <a href="#" className="btn-back-to-top" aria-label="Back to top button">
                <i className="bi bi-chevron-up"></i>
            </a>
    
            <section className="contained row" id="about">
                <h2 className="section-title ff-damion">About us</h2>
                <div className="col-balance">
                    <span className="fc-primary fs-h2">
                        At BizVision, we specialize in transforming businesses through innovative management solutions. 
                        Our mission is to help you achieve operational excellence and sustainable growth.
                    </span>
                    <p>
                        BizVision is a leading provider of business management tools and services. 
                        We are committed to delivering tailored solutions that address your unique challenges and opportunities. 
                        Our team of experts works tirelessly to ensure your business thrives in today's competitive landscape.
                    </p>
                    <p>
                        Our vision is to empower businesses of all sizes to reach their full potential. 
                        We believe in the power of innovation, collaboration, and strategic planning to drive success. 
                        With BizVision, you can turn your business goals into reality.
                    </p>
                    <p>
                        We offer a wide range of services, including strategic consulting, process optimization, 
                        and technology integration. Our goal is to provide you with the tools and insights needed to make informed decisions 
                        and achieve long-term success.
                    </p>
                </div>
                <div className="col-balance">
                    <div className="sticky-img-dual">
                        <img src={hero1} alt="Hero 1" />
                        <img src={blob} alt="Blob" className="blob" />
                        <img src={hero2} alt="Hero 2" />
                    </div>
                </div>
                <div className="sticky-img-dual-spacer"></div>
            </section>
    
            <section className="contained">
                <h2 className="section-title ff-damion">Our team</h2>
                <p className="col-wide mlmr-a ta-center">
                    Our team is composed of experienced professionals dedicated to helping your business succeed. 
                    With expertise in various industries, we bring a wealth of knowledge and a passion for innovation to every project.
                </p>
                <div className="row flex-just-center">
                    <div className="col-tri">
                        <article className="card-team">
                            <img src={team} alt="Team Member" />
                            <h3 className="title ff-damion">John Smith</h3>
                            <div className="info">
                                <h3 className="ff-damion">Business Strategist</h3>
                                <p>
                                    With over a decade of experience in business strategy, John specializes in helping companies 
                                    identify growth opportunities and implement effective solutions.
                                </p>
                            </div>
                        </article>
                    </div>
                    <div className="col-tri">
                        <article className="card-team">
                            <img src={team} alt="Team Member" />
                            <h3 className="title ff-damion">Jane Doe</h3>
                            <div className="info">
                                <h3 className="ff-damion">Operations Manager</h3>
                                <p>
                                    Jane is an expert in process optimization and operational efficiency. 
                                    She works closely with clients to streamline workflows and improve productivity.
                                </p>
                            </div>
                        </article>
                    </div>
                    <div className="col-tri">
                        <article className="card-team">
                            <img src={team} alt="Team Member" />
                            <h3 className="title ff-damion">Michael Lee</h3>
                            <div className="info">
                                <h3 className="ff-damion">Technology Consultant</h3>
                                <p>
                                    Michael specializes in integrating cutting-edge technology into business operations. 
                                    He helps clients leverage technology to achieve their strategic goals.
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
                <br />
            </section>
    
            <section className="bg-primary-foot ta-center">
                <h2 className="section-title ff-damion bg-primary-foot">Service</h2>
                <div className="contained">
                    <p className="col-wide mlmr-a">
                        Our services are designed to meet the diverse needs of modern businesses. 
                        From strategic planning to technology integration, we provide solutions that drive growth and efficiency.
                    </p>
                </div>
                <div className="contained row flex-just-center">
                    <div className="col-full">
                        <hr />
                    </div>
                    <div className="col-tri">
                        <i className="bi bi-stars fs-h2"></i>
                        <h3 className="mt-10 ff-damion">Strategic Consulting</h3>
                        <p>
                            We help businesses develop and implement strategies that align with their goals and drive sustainable growth.
                        </p>
                    </div>
                    <div className="col-tri">
                        <i className="bi bi-diagram-3 fs-h2"></i>
                        <h3 className="mt-10 ff-damion">Process Optimization</h3>
                        <p>
                            Our team identifies inefficiencies and implements solutions to streamline operations and improve productivity.
                        </p>
                    </div>
                    <div className="col-tri">
                        <i className="bi bi-code-slash fs-h2"></i>
                        <h3 className="mt-10 ff-damion">Technology Integration</h3>
                        <p>
                            We integrate the latest technologies into your business to enhance efficiency and drive innovation.
                        </p>
                    </div>
                </div>
                <a href="service.html" className="btn-bg2 border-round mt-25">
                    View our services
                </a>
            </section>
    
            <section className="contained">
                <h2 className="section-title ff-damion">Blogs</h2>
                <p className="ta-center col-wide mlmr-a">
                    Stay updated with the latest trends and insights in business management. 
                    Our blog covers a wide range of topics, from leadership strategies to technological advancements.
                </p>
                <div className="row flex-just-center">
                    <div className="col-tri">
                        <article className="card-blog">
                            <img src={work1} alt="Work 1" />
                            <div className="info">
                                <h3 className="mt-5 mb-5 ff-damion fc-primary">Leadership in the Digital Age</h3>
                                <p className="ml-a mt-5">09/26/2023</p>
                            </div>
                            <p className="ml-10 mt-5 mb-20">
                                Explore how leadership strategies are evolving in the digital era.
                            </p>
                            <a href="blog/blog-1.html" className="ml-10">
                                Read blog <i className="bi bi-box-arrow-up-right"></i>
                            </a>
                        </article>
                    </div>
                    <div className="col-tri">
                        <article className="card-blog">
                            <img src={work2} alt="Work 2" />
                            <div className="info">
                                <h3 className="mt-5 mb-5 ff-damion fc-primary">The Future of Work</h3>
                                <p className="ml-a mt-5">09/26/2023</p>
                            </div>
                            <p className="ml-10 mt-5 mb-20">
                                Discover how technology is reshaping the workplace.
                            </p>
                            <a href="blog/blog-1.html" className="ml-10">
                                Read blog <i className="bi bi-box-arrow-up-right"></i>
                            </a>
                        </article>
                    </div>
                    <div className="col-tri">
                        <article className="card-blog">
                            <img src={work3} alt="Work 3" />
                            <div className="info">
                                <h3 className="mt-5 mb-5 ff-damion fc-primary">Sustainable Business Practices</h3>
                                <p className="ml-a mt-5">09/26/2023</p>
                            </div>
                            <p className="ml-10 mt-5 mb-20">
                                Learn how to integrate sustainability into your business strategy.
                            </p>
                            <a href="blog/blog-1.html" className="ml-10">
                                Read blog <i className="bi bi-box-arrow-up-right"></i>
                            </a>
                        </article>
                    </div>
                </div>
            </section>
    
            <section className="subscribe bg-primary-foot" style={{ backgroundImage: `url(${overlay})` }}>
                <div className="contained row ta-center">
                    <div className="col-balance fc-white">
                        <h3 className="mb-a ff-damion mt-a">Subscribe to our newsletter:</h3>
                    </div>
                    <div className="col-balance">
                        <form action="#">
                            <input type="email" id="subscribe-email" aria-label="Subscribe to our email news" placeholder="Email" required />
                            <button className="btn-bg2">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
    
            <section className="contained ta-center">
                <h2 className="section-title ff-damion">Reach us</h2>
                <p className="col-wide mlmr-a">
                    Ready to take your business to the next level? Contact us today to learn how BizVision can help you achieve your goals.
                </p>
                <a href="contact.html" className="btn-bg1 border-round mt-25">
                    Get in touch
                </a>
            </section>
        </main>
    
        <footer className="fc-white">
            <div className="contained row flex-just-center">
                <div className="col-quad">
                    <h3 className="ff-damion">BizVision</h3>
                    <p>
                        Empowering businesses through innovative management solutions. 
                        Our mission is to help you achieve operational excellence and sustainable growth.
                    </p>
                </div>
    
                <div className="col-quad">
                    <h3 className="ff-damion">Get in touch</h3>
                    <a href="#" className="display-block fc-white icon-link mt-10 mb-10">
                        <i className="bi bi-envelope-fill"></i>
                        info@bizvision.com
                    </a>
                    <a href="#" className="display-block fc-white icon-link mt-10 mb-10">
                        <i className="bi bi-telephone-fill"></i>
                        +1 (123) 456-7890
                    </a>
                    <a href="#" className="display-block fc-white icon-link mt-10 mb-10">
                        <i className="bi bi-geo-alt-fill"></i>
                        123 Business St, Suite 456
                    </a>
                    <a href="#" className="display-inblock fc-white icon-link mt-20" aria-label="Follow on facebook">
                        <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="display-inblock fc-white icon-link" aria-label="Follow on instagram">
                        <i className="bi bi-instagram"></i>
                    </a>
                    <a href="#" className="display-inblock fc-white icon-link" aria-label="Follow on twitter">
                        <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="display-inblock fc-white icon-link" aria-label="Follow on youtube">
                        <i className="bi bi-youtube"></i>
                    </a>
                </div>
    
                <div className="col-quad">
                    <h3 className="ff-damion">Opening hours</h3>
                    <p className="mt-10 mb-10 fw-bold">
                        Monday - Friday:
                        <span className="fw-normal display-block">9:00 AM - 6:00 PM</span>
                    </p>
                    <p className="mt-10 mb-10 fw-bold">
                        Saturday:
                        <span className="fw-normal display-block">10:00 AM - 4:00 PM</span>
                    </p>
                    <p className="mt-10 mb-10 fw-bold">
                        Sunday:
                        <span className="fw-normal display-block">Closed</span>
                    </p>
                </div>
    
                <div className="col-quad">
                    <h3 className="ff-damion">Useful Links</h3>
                </div>
            </div>
        </footer>
        </>
    );



    return (
        <div className="home">
            <nav className="n">
                <ul>
                    <li><img src={logo} alt="Logo" /></li>
                    <li><h1>Biz Vision</h1></li>
                    <li><a href="#">Home</a></li>
                </ul>
                <div className="right">
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/Register">Register</Link></li>
                    </ul>
                </div>
            </nav>
            <div>
                {Mid}
            </div>
            <footer className="f">
                <p>&copy; 2025 Business Management. All rights reserved.</p>
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Contact Us</a>
                </div>
            </footer>
        </div>
    );
};

export default Home;
