export interface Hero {
  id: number;
  name: string;
  image: string;
  profile: {
    str: number;
    int: number;
    agi: number;
    luk: number;
  }
}

export default Hero;
