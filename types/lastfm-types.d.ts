import { Image } from "lastfm-types";

export declare module LastfmTypes {
  interface Image {
    "#text": string;
    size: string;
  }
  interface ArtistResponse {
    name: string;
    mbid: string;
    url: string;
    image: Image[];
    streamable: string;
    ontour: string;
    stats: {
      listeners: string;
      playcount: string;
    };
    similar: {
      artist: Array<{
        name: string;
        url: string;
        image: Image[];
      }>;
    };
    tags: {
      tag: Array<{
        name: string;
        url: string;
      }>;
    };
    bio: {
      links: {
        link: {
          "#text": string;
          rel: string;
          href: string;
        };
      };
      published: string;
      summary: string;
      content: string;
    };
  }
  interface Error {
    error: number;
    message: string;
    links: string[];
  }
}
