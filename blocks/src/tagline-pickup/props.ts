export interface BackgroundImage {
  id: number;
  url: string;
  alt: string;
  caption: string;
}

export interface TaglinePickupBlockAttributes {
  tagline: string;
  posts: number[];
  backgroundImages: BackgroundImage[];
  enableCarousel: boolean;
}