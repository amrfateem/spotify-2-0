# Spotify 2.0

A small web wrapper for Spotify control for playlists

## Project Description

This project is a small web wrapper for Spotify control, built using Next.js, Next Middleware, Spotify API, Tailwind, NextAuth, and Recoil. It allows users to log in using their Spotify Premium accounts and provides them with access to their playlists. Users can control playback on their currently opened device, including play, pause, shuffle, and back to the start of the song. The project also displays the banner of the playlist and shows all the songs within the playlist.

## Technologies Used

List out the technologies that you used to create this project, like:

- [Next.js](https://nextjs.org/)
- [Next Middleware](https://github.com/hoangvvo/next-connect)
- [Spotify API](https://developer.spotify.com/documentation/web-api/)
- [Tailwind](https://tailwindcss.com/)
- [NextAuth](https://next-auth.js.org/)
- [Recoil](https://recoiljs.org/)

## Getting Started

To run this project on your local machine, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install` or `yarn install`
3. Create a `.env` file in the project root and add your Spotify API credentials. For example:
   ```
   SPOTIFY_CLIENT_ID=your-client-id
   SPOTIFY_CLIENT_SECRET=your-client-secret
   SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback/spotify
   ```
4. Start the development server: `npm run dev` or `yarn dev`
5. Open your browser and navigate to `http://localhost:3000`

## Deployment

This project is deployed using Vercel and can be accessed at [https://spotify-2-0.vercel.app/](https://spotify-2-0.vercel.app/).

## Features

- User authentication using Spotify Premium accounts.
- Access to user playlists.
- Control playback on the user's currently opened device.
- Play, pause, shuffle, and back to the start of the song.
- Display of the playlist banner.
- List all songs within the playlist.

## Usage

1. Open the web app in your browser by visiting [https://spotify-2-0.vercel.app/](https://spotify-2-0.vercel.app/).
2. Click on the "Login" button to authenticate with your Spotify Premium account.
3. Once authenticated, you will be able to see your playlists.
4. Click on a playlist to view its details and control playback.
5. Use the playback controls to play, pause, shuffle, and go back to the start of the current song.
6. The playlist banner will be displayed at the top of the page.
7. The songs within the playlist will be listed below the playback controls.

## Contributing

Thank you for considering contributing to this project! To contribute, please follow these guidelines:

1. Fork the repository and create your branch: `git checkout -b my-feature`
2. Make your changes and test them thoroughly.
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-feature`
5. Create a pull request detailing your changes.

## License

This project is licensed under the [MIT License](LICENSE).
