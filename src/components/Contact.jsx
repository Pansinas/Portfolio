import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Briefcase, Phone } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      setStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    // Rate Limiting (60 seconds)
    const lastSub = localStorage.getItem('last-message-submission');
    const now = Date.now();
    if (lastSub && now - parseInt(lastSub, 10) < 60000) {
      const waitSecs = Math.ceil((60000 - (now - parseInt(lastSub, 10))) / 1000);
      setStatus({ type: 'warning', message: `Please wait ${waitSecs}s before sending another message.` });
      return;
    }
    
    setIsSubmitting(true);
    setStatus({ type: 'info', message: 'Sending message...' });
    
    try {
      await addDoc(collection(db, "messages"), {
        name,
        email,
        subject,
        message,
        createdAt: serverTimestamp()
      });

      setStatus({ type: 'success', message: 'Message securely saved to your database!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
      localStorage.setItem('last-message-submission', now.toString());
      
      // Clear success banner after 5 seconds
      setTimeout(() => {
        setStatus(prev => prev.type === 'success' ? { type: null, message: '' } : prev);
      }, 5000);
    } catch (error) {
      console.error("Error saving message: ", error);
      setStatus({ type: 'error', message: 'Something went wrong. Please check your Firebase rules or try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="section-header">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Get In Touch
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-subtitle"
        >
          Have a project in mind or want to discuss opportunities? Reach out below.
        </motion.p>
      </div>

      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '60px' }}>
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
        >
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(var(--primary-rgb), 0.1)', display: 'grid', placeItems: 'center', flexShrink: 0, color: 'var(--primary)' }}>
              <Mail size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '4px' }}>Email</h3>
              <a href="mailto:pansinaspg@gmail.com" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>pansinaspg@gmail.com</a>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(var(--primary-rgb), 0.1)', display: 'grid', placeItems: 'center', flexShrink: 0, color: 'var(--primary)' }}>
              <Phone size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '4px' }}>Phone</h3>
              <p style={{ color: 'var(--text-muted)' }}>+91 93849 85529</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(var(--primary-rgb), 0.1)', display: 'grid', placeItems: 'center', flexShrink: 0, color: 'var(--primary)' }}>
              <MapPin size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '4px' }}>Location</h3>
              <p style={{ color: 'var(--text-muted)' }}>Chennai, Tamil Nadu, India</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(var(--primary-rgb), 0.1)', display: 'grid', placeItems: 'center', flexShrink: 0, color: 'var(--primary)' }}>
              <Briefcase size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '4px' }}>Availability</h3>
              <p style={{ color: 'var(--text-muted)' }}>Open to internships and freelance projects</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel"
        >
          <form onSubmit={handleSubmit} style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="form-name" style={{ color: 'var(--text-main)', fontSize: '0.875rem', fontWeight: 500 }}>Full Name</label>
              <input id="form-name" type="text" name="name" required value={formData.name} onChange={handleChange} style={inputStyles} disabled={isSubmitting} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="form-email" style={{ color: 'var(--text-main)', fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
              <input id="form-email" type="email" name="email" required value={formData.email} onChange={handleChange} style={inputStyles} disabled={isSubmitting} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="form-subject" style={{ color: 'var(--text-main)', fontSize: '0.875rem', fontWeight: 500 }}>Subject</label>
              <input id="form-subject" type="text" name="subject" required value={formData.subject} onChange={handleChange} style={inputStyles} disabled={isSubmitting} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="form-message" style={{ color: 'var(--text-main)', fontSize: '0.875rem', fontWeight: 500 }}>Your Message</label>
              <textarea id="form-message" name="message" required value={formData.message} onChange={handleChange} style={{ ...inputStyles, minHeight: '120px', resize: 'vertical' }} disabled={isSubmitting} />
            </div>

            {/* Custom Inline Status Banner */}
            <AnimatePresence>
              {status.type && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textAlign: 'center',
                    background: status.type === 'success' 
                      ? 'rgba(16, 185, 129, 0.1)' 
                      : status.type === 'error'
                      ? 'rgba(239, 68, 68, 0.1)'
                      : status.type === 'warning'
                      ? 'rgba(245, 158, 11, 0.1)'
                      : 'rgba(59, 130, 246, 0.1)',
                    border: `1px solid ${
                      status.type === 'success' 
                        ? 'var(--primary)' 
                        : status.type === 'error'
                        ? '#EF4444'
                        : status.type === 'warning'
                        ? '#F59E0B'
                        : '#3B82F6'
                    }`,
                    color: status.type === 'success' 
                      ? 'var(--text-main)' 
                      : status.type === 'error'
                      ? '#FCA5A5'
                      : status.type === 'warning'
                      ? '#FDE047'
                      : '#93C5FD',
                    overflow: 'hidden'
                  }}
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px', opacity: isSubmitting ? 0.7 : 1 }} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const inputStyles = {
  width: '100%',
  padding: '12px 16px',
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid var(--border-light)',
  borderRadius: '8px',
  color: 'var(--text-main)',
  fontFamily: 'inherit',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.3s, background 0.3s'
};

export default Contact;
