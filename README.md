# PropertyPulse 🏠

A modern, full-stack property rental platform built with Next.js. PropertyPulse allows users to browse, search, and manage property listings with an intuitive interface featuring interactive maps, image galleries, and seamless user authentication.

**Live Preview:** [flex-bnb-sigma.vercel.app](https://flex-bnb-sigma.vercel.app/)

---

## ✨ Features

### Property Management
- **Property Listings**: Browse and view detailed property listings with images, descriptions, and specifications
- **Property Search**: Advanced search functionality by location and property type
- **Featured Properties**: Highlight special properties on the homepage
- **Property Details**: Comprehensive property pages with:
  - High-quality image galleries with PhotoSwipe integration
  - Interactive Mapbox maps showing property locations
  - Detailed amenities, rates (nightly/weekly/monthly), and specifications
  - Seller contact information

### User Features
- **Google OAuth Authentication**: Secure login using Google accounts via NextAuth.js
- **User Profiles**: Personalized user profiles with bookmarks and property management
- **Bookmarking System**: Save favorite properties for quick access
- **Messaging System**: Direct messaging between property seekers and owners
- **Property Management**: Create, edit, and manage your own property listings
- **Social Sharing**: Share properties on Facebook, Twitter, WhatsApp, Telegram, and via Email

### Technical Features
- **Responsive Design**: Fully responsive UI built with Tailwind CSS
- **Image Upload**: Cloudinary integration for efficient image hosting and management
- **Interactive Maps**: Mapbox GL integration with geocoding for property locations
- **Real-time Updates**: Dynamic content updates with server-side rendering
- **Pagination**: Efficient property listing pagination
- **Toast Notifications**: User-friendly notifications using React Toastify

## 🛠️ Technologies Used

### Frontend
- **Next.js 16.0.7** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Icons** - Icon library
- **React Toastify** - Toast notification system
- **React Spinners** - Loading indicators

### Backend & Database
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB 7.0** - NoSQL database
- **Mongoose 9.0** - MongoDB object modeling

### Authentication & Authorization
- **NextAuth.js 4.24.13** - Authentication framework
- **Google OAuth** - Google sign-in provider

### Third-Party Services
- **Cloudinary 2.8.0** - Cloud-based image and video management
- **Mapbox GL 3.17.0** - Interactive maps
- **React Map GL 8.1.0** - React wrapper for Mapbox
- **React Geocode 2.0.1** - Geocoding service for address-to-coordinates conversion

### UI Components & Libraries
- **PhotoSwipe 5.4.4** - Touch-friendly image gallery
- **React Photoswipe Gallery 4.0.0** - React wrapper for PhotoSwipe
- **React Share 5.2.2** - Social media sharing components

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **MongoDB** database (local or cloud instance like MongoDB Atlas)
- Accounts and API keys for:
  - Google Cloud Console (for OAuth)
  - Cloudinary (for image hosting)
  - Mapbox (for maps)
  - Google Geocoding API (for address conversion)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd propertypulse
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
# Database Configuration
MONGODB_URI=your_mongodb_connection_string
MONGODB_DATABASE_NAME=your_database_name

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Mapbox Configuration
NEXT_PUBLIC_MAPBOX_API_KEY=your_mapbox_api_key

# Google Geocoding API
NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY=your_google_geocoding_api_key

# Application URLs
NEXT_PUBLIC_DOMAIN=http://localhost:3000
NEXT_PUBLIC_API_DOMAIN=http://localhost:3000
```

### 4. Setting Up Services

#### MongoDB Setup
1. Create a MongoDB database (local or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
2. Get your connection string and add it to `MONGODB_URI`
3. Set your database name in `MONGODB_DATABASE_NAME`

#### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to your `.env.local`

#### Cloudinary Setup
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add them to your `.env.local`

#### Mapbox Setup
1. Sign up at [Mapbox](https://www.mapbox.com/)
2. Get your access token from the account page
3. Add it to `NEXT_PUBLIC_MAPBOX_API_KEY`

#### Google Geocoding API Setup
1. In Google Cloud Console, enable Geocoding API
2. Create an API key
3. Add it to `NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY`

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 6. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
propertypulse/
├── app/                    # Next.js App Router directory
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── bookmarks/    # Bookmark management
│   │   ├── messages/     # Messaging system
│   │   ├── properties/   # Property CRUD operations
│   │   └── cloudinary/   # Image upload handling
│   ├── properties/       # Property pages
│   ├── profile/          # User profile page
│   ├── messages/        # Messages page
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── components/          # React components
├── config/             # Configuration files
├── context/            # React context providers
├── models/             # Mongoose models
├── assets/             # Static assets
└── public/             # Public files
```

## 🔑 Key API Endpoints

- `GET /api/properties` - Fetch paginated properties
- `POST /api/properties` - Create a new property
- `GET /api/properties/[id]` - Get property details
- `PUT /api/properties/[id]/edit` - Update property
- `GET /api/properties/search` - Search properties
- `GET /api/properties/featured` - Get featured properties
- `GET /api/bookmarks` - Get user bookmarks
- `POST /api/bookmarks` - Toggle bookmark
- `GET /api/messages` - Get user messages
- `POST /api/messages` - Send a message

## 🎨 Features in Detail

### Property Search
- Search by location (city, state, street, zipcode)
- Filter by property type
- Real-time search results

### Image Management
- Multiple image uploads per property
- Cloudinary integration for optimized image delivery
- PhotoSwipe gallery for immersive image viewing

### Interactive Maps
- Mapbox integration for property location visualization
- Geocoding to convert addresses to coordinates
- Custom markers for property locations

### User Authentication
- Secure Google OAuth integration
- Automatic user creation on first sign-in
- Session management with NextAuth.js

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- All the open-source library maintainers
- Mapbox for mapping services
- Cloudinary for image hosting

---

Built with ❤️ using Next.js and TypeScript
