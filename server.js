require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')
const counterPath = path.join(__dirname, 'data/counter.json')
const testimonialsPath = path.join(__dirname, 'data/testimonials.json')


const app = express()

// --- Middleware ---
app.use(cors())
app.use(express.json())


// --- Email Transporter ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
})


// --- Routes ---

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio API is running! 🚀',
    version: '1.0.0',
  })
})

// About route
app.get('/about', (req, res) => {
  res.json({
    name: 'Gideon M.',
    role: 'Frontend Developer',
    location: 'Your City, Country',
    available: true,
  })
})

// Skills route
app.get('/skills', (req, res) => {
  res.json({
    skills: [
      { name: 'HTML', level: 90 },
      { name: 'CSS', level: 85 },
      { name: 'JavaScript', level: 75 },
      { name: 'React', level: 65 },
      { name: 'Node.js', level: 60 },
    ]
  })
})

// Contact route
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body

  // Validate all fields are present
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.'
    })
  }

  try {
    // Email that gets sent to me
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h2>New message from your portfolio!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    })

    // Auto reply email sent to the VISITOR
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <h2>Hi ${name}, thanks for your message!</h2>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>Gideon M.</strong></p>
      `
    })

    res.json({
      success: true,
      message: 'Message sent successfully!'
    })

  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.'
    })
  }
})

////////////////////////////////////////////////////////////////////////////////
// --- Visitor Counter Routes ---

// GET visitor count
app.get('/visitors', (req, res) => {
  const data = JSON.parse(fs.readFileSync(counterPath, 'utf-8'))
  res.json({ count: data.count })
})

// POST increment visitor count by 1
app.post('/visitors', (req, res) => {
  const data = JSON.parse(fs.readFileSync(counterPath, 'utf-8'))
  data.count += 1
  fs.writeFileSync(counterPath, JSON.stringify(data))
  res.json({ count: data.count })
})

//////////////////////////////////////////////////////////////////////////
// GET fetch all testimonials
app.get('/testimonials', (req, res) => {
  const data = JSON.parse(fs.readFileSync(testimonialsPath, 'utf-8'))
  res.json({ testimonials: data })
})

// POST add a new testimonial
app.post('/testimonials', (req, res) => {
  const { name, role, message } = req.body

  if (!name || !role || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, role and message are required.'
    })
  }

  const data = JSON.parse(fs.readFileSync(testimonialsPath, 'utf-8'))

  const newTestimonial = {
    id: data.length + 1,
    name,
    role,
    message,
    date: new Date().toISOString().split('T')[0],
  }

  data.push(newTestimonial)
  fs.writeFileSync(testimonialsPath, JSON.stringify(data, null, 2))

  res.json({
    success: true,
    message: 'Testimonial added!',
    testimonial: newTestimonial,
  })
})
///////////////////////////////////////////////////////////////////
// --- Start Server ---
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})