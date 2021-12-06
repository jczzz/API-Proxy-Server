const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()
const errorHandler = require('./middleware/error')

const PORT = process.env.PORT || 5000

const app = express()

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 Mins
  max: 100,
})
app.use(limiter)
app.set('trust proxy', 1)

// Enable cors   (cross-origin resource sharing). In order for your server to be accessible by other origins (domains)
// Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.
app.use(cors())

// Set static folder
app.use(express.static('public'))

// Routes
app.use('/api', require('./routes'))

// Error handler middleware
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
