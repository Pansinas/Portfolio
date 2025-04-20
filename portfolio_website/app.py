import streamlit as st
import base64
import json
from pathlib import Path

# --- PAGE CONFIG ---
st.set_page_config(
    page_title="Pansin | AI & Data Science Portfolio",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load custom CSS with enhanced fallback
def load_css():
    try:
        with open('assets/style.css') as f:
            st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)
        with open('assets/additional.css') as f:
            st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)
    except FileNotFoundError:
        st.markdown("""
        <style>
        .stApp { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            background: #ffffff;
            color: #000000;
            min-height: 100vh;
        }
        .project-card, .blog-card {
            padding: 1.5rem;
            margin: 1rem 0;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.2s;
            background: #ffffff;
        }
        .project-card:hover { transform: translateY(-3px); }
        .tech-tag {
            background: #e0f2fe;
            color: #0369a1;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.85em;
            margin: 0.25rem;
            display: inline-block;
        }
        .social-links a {
            margin: 0 1rem;
            color: #2563eb !important;
            text-decoration: none;
        }
        </style>
        """, unsafe_allow_html=True)

load_css()

# --- LOAD DATA WITH VALIDATION ---
def load_data(file_path, default_data):
    try:
        with open(file_path) as f:
            data = json.load(f)
            if not isinstance(data, list):  # Ensure data is a list
                raise ValueError("Invalid data format")
            return data
    except (FileNotFoundError, json.JSONDecodeError, ValueError) as e:
        st.warning(f"Error loading {file_path}: {str(e)}. Using sample data.")
        return default_data

projects = load_data("data/projects.json", [{
    "title": "Sample Project",
    "description": "A placeholder project description showing the expected format.",
    "tech": "Python, Streamlit, Machine Learning",
    "link": "#"
}])

blog_posts = load_data("data/blog_posts.json", [{
    "title": "Sample Blog Post",
    "date": "2024-01-01",
    "summary": "Example blog post structure with date and summary.",
    "read_link": "#"
}])

# --- SIDEBAR ---
def sidebar_profile():
    try:
        st.sidebar.image("assets/profile.jpg", use_container_width=True)
    except Exception as e:
        st.sidebar.markdown("""
        <div style="text-align:center">
            <div style="font-size:4em; margin-bottom:0.5rem">👨💻</div>
            <p style="color:#666">Profile Image</p>
        </div>
        """, unsafe_allow_html=True)
    
    st.sidebar.title("Pansin A S")
    st.sidebar.subheader("AI & Data Science Student")
    st.sidebar.markdown("""
    ---
    🎓 **Hindustan Institute of Technology and Science**  
    📍 Chennai, India
    """)

sidebar_profile()
page = st.sidebar.radio("Navigation", [
    "🏠 Home", 
    "🧠 About Me", 
    "💼 Portfolio", 
    "🏆 Achievements",
    "📢 Announcements",
    "✍️ Blog",
    "📄 Resume",
    "📬 Contact"
])

# --- PAGE CONTENT ---
if page == "🏠 Home":
    st.title("Welcome to My AI Journey")
    st.markdown("""
    <div class="hero-section">
        <h2 style="color: #1e3a8a">Transforming Data into Intelligent Solutions</h2>
        <p class="lead">
        Passionate about leveraging AI and data science to solve real-world problems. 
        Currently exploring machine learning, natural language processing, and data visualization.
        </p>
    </div>
    
    <div class="social-links" style="margin-top: 2rem">
        <a href='https://github.com/Pansinas' target='_blank'>🐙 GitHub</a>
        <a href='https://www.linkedin.com/in/pansin-a-s-944a0b27b/' target='_blank'>💼 LinkedIn</a>
        <a href='https://www.instagram.com/pansin_as_offi/' target='_blank'>📸 Instagram</a>
    </div>
    """, unsafe_allow_html=True)
    st.markdown("---")

elif page == "🧠 About Me":
    st.header("About Me")
    col1, col2 = st.columns([1, 2])
    with col1:
        st.markdown("""
        <div style="text-align: center">
            <div style="font-size: 4em">👨🔬</div>
            <h3>Pansin A S</h3>
            <p>AI Developer & Data Enthusiast</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        **🌟 Passionate About**  
        - Machine Learning & Deep Learning  
        - Natural Language Processing  
        - Data Visualization & Analytics  
        
        **🔧 Technical Toolkit**  
        - Python (TensorFlow, PyTorch, Scikit-learn)  
        - Data Processing (Pandas, NumPy)  
        - Visualization (Matplotlib, Seaborn, Plotly)  
        
        **🎯 Career Goals**  
        Developing AI solutions for social good, particularly in education and 
        environmental sustainability. Aiming to bridge technology and public service.
        """)

elif page == "💼 Portfolio":
    st.header("My Projects")
    cols = st.columns(2)
    for idx, project in enumerate(projects):
        with cols[idx % 2]:
            st.markdown(f"""
            <div class="project-card">
                <h3>{project['title']}</h3>
                <p>{project['description']}</p>
                <div class="tech-stack">
                    <small>Tech Stack:</small><br>
                    {''.join([f'<span class="tech-tag">{tech.strip()}</span>' 
                    for tech in project["tech"].split(",")])}
                </div>
                <div style="margin-top: 1rem">
                    <a href="{project['link']}" target="_blank" 
                    class="project-link">View Project →</a>
                </div>
            </div>
            """, unsafe_allow_html=True)

elif page == "🏆 Achievements":
    st.header("My Achievements")
    st.markdown("""
    <div class="project-card">
        <h3>Website Released</h3>
        <p>Website released on 20/04/2025 by Pansin A S</p>
    </div>
    """, unsafe_allow_html=True)

elif page == "📄 Resume":
    st.header("Professional Resume")
    try:
        with open("assets/resume.pdf", "rb") as f:
            pdf_bytes = f.read()
            b64 = base64.b64encode(pdf_bytes).decode()
            href = f'<a href="data:application/pdf;base64,{b64}" download="Pansin_Resume.pdf">📥 Download Full Resume</a>'
            st.markdown(href, unsafe_allow_html=True)
        st.markdown("---")
        st.markdown("""
        ### Key Qualifications
        - B.Tech in Computer Science (AI & Data Science)
        - 2+ years of hands-on ML experience
        - Certified Python Developer
        - Fluent in English, Hindi, and Tamil
        
        ### Core Competencies
        - Machine Learning Model Development
        - Data Analysis & Visualization
        - Natural Language Processing
        - Cloud Computing Basics
        """)
    except FileNotFoundError:
        st.error("Resume currently unavailable. Please contact via email.")

elif page == "📬 Contact":
    st.header("Get in Touch")
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Direct Contact")
        st.markdown("""
        📧 **Email:** [business.pansin@gmail.com](mailto:business.pansin@gmail.com)  
        📱 **Phone:** +91 9384985529  
        📍 **Location:** Chennai, India
        """)
        
elif page == "📢 Announcements":
    st.header("Announcements")
    st.markdown("""
    <div class="announcement-card">
        <h3>Upcoming Webinar</h3>
        <p>Join us for an exciting webinar on AI advancements scheduled for 25/05/2025.</p>
    </div>
    """, unsafe_allow_html=True)
    st.markdown("""
    <div class="announcement-card">
        <h3>Website Released</h3>
        <p>Website released on 20/04/2025 by Pansin A S</p>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("---")

# Other pages (Achievements, Blog, Announcements) follow similar enhancements

# Floating Message Me Button
st.markdown('<a href="https://docs.google.com/forms/d/1bVOUGoO3ww9aSfJnrGLkCxzBJnf96VrUis6qDOxIZEQ/edit?usp=forms_home&ths=true" class="floating-button">Message Me</a>', unsafe_allow_html=True)

if __name__ == "__main__":
    pass