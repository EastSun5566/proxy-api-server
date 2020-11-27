export interface HeroProfile {
  str: number;
  int: number;
  agi: number;
  luk: number;
}

export interface Hero {
  id: string;
  name: string;
  image: string;
  profile?: HeroProfile
}

export default Hero;
