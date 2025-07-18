# ImageLab - AI-Powered SaaS Image Processing Platform

<div align="center">
  <img src="public/logo.png" alt="ImageLab Logo" width="200" height="60" />
  
  <p align="center">
    Transform your images with cutting-edge AI technology
  </p>
  
  <p align="center">
    <a href="#features">Features</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#api-documentation">API</a> •
    <a href="#deployment">Deployment</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## 🚀 Overview

ImageLab is a modern, full-stack SaaS application built with Next.js 14 that leverages AI for advanced image processing and transformations. Our platform offers professional-grade image editing capabilities powered by Cloudinary's AI technology, integrated with secure authentication, payment processing, and cloud storage.

## ✨ Features

### 🎨 AI-Powered Image Transformations
- **Image Restore** - Enhance and restore old, damaged, or low-quality images
- **Generative Fill** - Fill missing parts of images with AI-generated content
- **Object Remove** - Intelligently remove unwanted objects while preserving background
- **Object Recolor** - Precisely change colors of specific objects in images
- **Background Remove** - Remove backgrounds with professional precision

### 🏗️ Platform Features
- 🔐 **Secure Authentication** - Powered by Clerk with social login support
- 💳 **Credit System** - Stripe-powered payment integration with flexible pricing
- ☁️ **Cloud Storage** - Seamless Cloudinary integration for image management
- 📱 **Responsive Design** - Mobile-first approach with modern UI/UX
- 🔍 **Advanced Search** - Filter and search through transformation history
- 👤 **User Dashboard** - Personal profiles with detailed analytics
- 🚀 **Real-time Processing** - Fast image transformations with progress tracking

## 🛠️ Tech Stack

### Frontend
```
Next.js 14.2.24      - React framework with App Router
TypeScript           - Type-safe development
Tailwind CSS         - Utility-first CSS framework
shadcn/ui            - Modern component library
React Hook Form      - Form management with validation
Sonner              - Beautiful toast notifications
```

### Backend & Services
```
MongoDB + Mongoose   - Database with ODM
Clerk               - Authentication & user management
Stripe              - Payment processing
Cloudinary          - AI image processing
Svix                - Webhook security
```

### Development & Deployment
```
ESLint              - Code linting
Vercel              - Deployment platform
TypeScript          - Static typing
PostCSS             - CSS processing
```

## 📋 Prerequisites

- **Node.js** 18.0 or later
- **npm/yarn** package manager
- **Git** version control
- **MongoDB** database (local or Atlas)
- Active accounts for:
  - [Clerk](https://clerk.com) (Authentication)
  - [Cloudinary](https://cloudinary.com) (Image processing)
  - [Stripe](https://stripe.com) (Payments)

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/imagelab.git
cd imagelab
npm install
```

### 2. Environment Configuration
Create `.env.local` in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
SIGNING_SECRET=whsec_...

# Database
MONGODB_URL=mongodb+srv://...

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Database Setup
The application will automatically create necessary collections. Ensure your MongoDB connection is active.

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 🔧 Service Configuration

### Clerk Authentication Setup
1. Create account at [clerk.com](https://clerk.com)
2. Create new application
3. Configure authentication methods (Email, Google, GitHub)
4. Setup webhook endpoint: `https://yourdomain.com/api/webhooks/clerk`
5. Copy API keys to environment variables

### Cloudinary Setup
1. Register at [cloudinary.com](https://cloudinary.com)
2. Navigate to Dashboard → Settings
3. Enable AI features and auto-upload
4. Copy Cloud Name, API Key, and API Secret
5. Configure upload presets for optimized processing

### Stripe Payment Setup
1. Create account at [stripe.com](https://stripe.com)
2. Enable payment methods (cards, wallets)
3. Create webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
4. Configure products matching the pricing plans:
   - **Free Plan**: 20 credits - $0
   - **Pro Package**: 120 credits - $40
   - **Premium Package**: 2000 credits - $199

### MongoDB Database
```javascript
// Collections created automatically:
users: {
  clerkId: String,
  email: String,
  username: String,
  photo: String,
  firstName: String,
  lastName: String,
  planId: Number,
  creditBalance: Number
}

images: {
  title: String,
  transformationType: String,
  publicId: String,
  secureURL: String,
  width: Number,
  height: Number,
  config: Object,
  transformationUrl: String,
  aspectRatio: String,
  color: String,
  prompt: String,
  author: ObjectId,
  createdAt: Date,
  updatedAt: Date
}

transactions: {
  stripeId: String,
  amount: Number,
  plan: String,
  credits: Number,
  buyer: ObjectId,
  createdAt: Date
}
```

## 🎯 API Documentation

### Webhooks

#### Clerk User Events
```http
POST /api/webhooks/clerk
Content-Type: application/json
Svix-Signature: <signature>

Events: user.created, user.updated, user.deleted
```

#### Stripe Payment Events
```http
POST /api/webhooks/stripe
Content-Type: application/json
Stripe-Signature: <signature>

Events: checkout.session.completed, invoice.payment_succeeded
```

### Image Transformations

The application supports these transformation types:
- `restore` - Image restoration and enhancement
- `removeBackground` - Background removal
- `fill` - Generative fill for missing areas
- `remove` - Object removal
- `recolor` - Object recoloring

### Credit System

| Plan | Price | Credits | Features |
|------|-------|---------|----------|
| Free | $0 | 20 | Basic access to all services |
| Pro | $40 | 120 | Full access + priority support |
| Premium | $199 | 2000 | Full access + priority support + updates |

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   ```bash
   # Push to GitHub
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy automatically

3. **Environment Variables**
   Add all environment variables from `.env.local` to Vercel dashboard:
   - Settings → Environment Variables
   - Add each variable for Production, Preview, and Development

4. **Webhook Configuration**
   Update webhook URLs in service dashboards:
   - Clerk: `https://yourdomain.vercel.app/api/webhooks/clerk`
   - Stripe: `https://yourdomain.vercel.app/api/webhooks/stripe`

### Custom Deployment

For other platforms, ensure:
- Node.js 18+ runtime
- Environment variables configured
- MongoDB connection accessible
- HTTPS enabled for webhooks

## 🔒 Security Features

- **Authentication**: Clerk handles secure user authentication
- **Webhook Security**: Svix signature verification for all webhooks
- **Data Protection**: Environment variables for sensitive data
- **HTTPS Enforcement**: Required for production webhooks
- **Rate Limiting**: Built-in protection for API endpoints
- **Input Validation**: Zod schemas for form validation

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript validation
```

### Code Quality
```bash
# Linting
npm run lint

# Type checking
npx tsc --noEmit

# Format code
npx prettier --write .
```

## 🐛 Troubleshooting

### Common Issues

**Webhook 404 Errors**
```bash
# Check middleware.ts excludes webhook routes
# Verify environment variable names (SIGNING_SECRET not WEBHOOK_SECRET)
```

**Image Upload Failures**
```bash
# Verify Cloudinary credentials
# Check upload preset configuration
# Ensure file size limits
```

**Authentication Issues**
```bash
# Verify Clerk environment variables
# Check redirect URLs configuration
# Ensure webhook endpoint is accessible
```

**Database Connection**
```bash
# Verify MongoDB URL format
# Check network access in MongoDB Atlas
# Ensure database user permissions
```

## 🤝 Contributing

1. **Fork & Clone**
   ```bash
   git clone https://github.com/yourusername/imagelab.git
   cd imagelab
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Development Setup**
   ```bash
   npm install
   cp .env.example .env.local
   # Configure your environment variables
   npm run dev
   ```

4. **Code Standards**
   - Follow TypeScript best practices
   - Use ESLint and Prettier
   - Write meaningful commit messages
   - Add tests for new features

5. **Submit PR**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   git push origin feature/amazing-feature
   ```

## 📈 Performance

- **Image Optimization**: Automatic WebP conversion via Cloudinary
- **Code Splitting**: Next.js automatic route-based splitting
- **Caching**: Aggressive caching for transformed images
- **CDN**: Global delivery via Vercel Edge Network
- **Database**: Optimized queries with proper indexing

## 🔄 Updates & Maintenance

### Dependency Updates
```bash
# Check outdated packages
npm outdated

# Update packages
npm update

# Security audit
npm audit fix
```

### Database Maintenance
- Regular backup of MongoDB data
- Monitor collection growth
- Optimize queries with proper indexes
- Clean up unused transformations

## 📊 Analytics & Monitoring

Track key metrics:
- User registrations and authentication
- Image transformation usage
- Credit consumption patterns
- Payment conversion rates
- Error rates and performance


## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Clerk](https://clerk.com/) - Authentication and user management platform
- [Cloudinary](https://cloudinary.com/) - Intelligent image and video management
- [Stripe](https://stripe.com/) - Online payment processing platform
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vercel](https://vercel.com/) - Platform for frontend frameworks and static sites

---

<div align="center">
  <p>Made with ❤️ by the ImageLab Team</p>
  <p>
    <a href="https://github.com/yourusername/imagelab">⭐ Star on GitHub</a> •
    <a href="https://imagelab.vercel.app">🚀 Live Demo</a> •
    <a href="mailto:support@imagelab.com">📧 Contact</a>
  </p>
</div>
