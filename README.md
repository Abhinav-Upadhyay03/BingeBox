# 🎬 Binge Box

**Binge Box** is a modern, responsive movie listing web application that lets users explore and watch trailers of movies across multiple categories. With secure authentication and real-time search, it provides a seamless browsing experience powered by the TMDB API.

## 🚀 Features

- 🔐 **User Authentication** with Firebase (Email/Password & Google Sign-In)
- 🔒 **Protected Routes** – only accessible to signed-in users
- 🎞️ **Movie Categories**: Popular, Top Rated, Now Playing, Upcoming
- 🔍 **Real-time Search** to find movies instantly
- ▶️ **Watch Trailers & More** – click on any movie to open a modal showing available YouTube trailers, teasers, and behind-the-scenes videos
- 🔗 Users can choose a video and get redirected to the corresponding YouTube page
- 💾 **Session Persistence** – user data and login state are retained on refresh using Firebase
- 💡 **Clean State Management** using Zustand
- 📱 **Responsive UI** built with Tailwind CSS

## 🛠️ Tech Stack

- **React.js** – frontend UI framework
- **Tailwind CSS** – for fast and responsive styling
- **Zustand** – lightweight and scalable state management
- **Firebase** – authentication and hosting
- **TMDB API** – to fetch movie data, trailers, teasers, and more

## 🔐 Authentication

- Users can sign in using **email/password** or **Google Sign-In**
- All movie listing routes are protected and require login
- Firebase handles user session persistence across refreshes

## 🎥 Play Movie Feature

- Clicking the **"Play"** button on any movie card opens a **modal window**
- The modal lists all available **trailers**, **teasers**, and **behind-the-scenes videos** fetched from TMDB's video API
- Selecting a video **redirects users to YouTube** to watch the content

## 🌐 Live Demo

> binge-box-ivory.vercel.app

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

### 📬 Contact

For any feedback or queries:

- LinkedIn: [Abhinav Upadhyay](https://www.linkedin.com/in/abhinav-upadhyay-67973821b/)
- Email: abhi.u3131@gmail.com
