# Melody Insights ✨

Melody Insights is an application for discovering artists, albums, music genres, and songs. The application utilizes Spotify authentication to retrieve a user's favorite artists, songs, and music genres. It provides rich, detailed pages for each song, artist, album, and genre, filled with relevant suggestions and data.

## Features

- **User Dashboard**: Displays user profile, favorite music genres, top artists, and current songs.
- **Song Page**: Presents detailed information about the song, including artist, album, and recommendations for similar songs.
- **Artist Page**: Contains artist profile and description, list of their albums, most popular songs, and suggestions of similar artists.
- **Genre Page**: Provides a description of the genre, including its history and key characteristics, along with artists and songs belonging to the genre.
- **Album Page**: Features a description of the album, the artists involved, associated music genres, and suggestions of similar albums.
- **User Profile Page**: Displays the user's profile information.

## Built With

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)

## APIs Used

- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Last.fm API](https://www.last.fm/fr/api)

## Getting Started

To get a local copy up and running, follow these steps:

Clone the repository:

```bash
git clone https://github.com/nina-alin/spotify-enhanced.git
```

Install NPM packages:

```bash
pnpm install
```

Create a .env.local file in the root directory and fill it with your API keys and other sensitive data (like Spotify Client ID and Client Secret).

Start the development server:

```bash
pnpm dev
```

Open http://localhost:3000 with your browser to see the result.

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/#)

## Contact

- Nina Alin - alin.nina28@gmail.com
- Project Link: https://github.com/nina-alin/spotify-enhanced.git
