import type { BookDto } from "../dto/types";

export const narutoVol1: BookDto = {
  _id: "1",
  title: "Naruto Vol. 1",
  author: "Masashi Kishimoto",
  saga: { name: "Naruto", bookNumber: 1 },
  description:
    "Naruto Uzumaki dreams of becoming the greatest ninja in the village, but he harbors a powerful secret.",
  genres: ["Action", "Adventure", "Shounen"],
  pages: 187,
  firstPublished: "1999-03-01",
  coverImageUrlSmall: "https://example.com/naruto1-small.jpg",
  coverImageUrlBig: "https://example.com/naruto1-big.jpg",
  imageAlt: "Naruto Volume 1 Cover",
  state: "read",
  yourRating: 4,
  readDates: {
    dateStarted: "2021-05-10",
    dateFinished: "2021-05-15",
    readYear: 2021,
  },
};

export const onePieceVol1: BookDto = {
  _id: "2",
  title: "One Piece Vol. 1",
  author: "Eiichiro Oda",
  saga: { name: "One Piece", bookNumber: 1 },
  description:
    "Monkey D. Luffy sets sail to become the King of the Pirates with a crew of unlikely companions.",
  genres: ["Adventure", "Fantasy", "Shounen"],
  pages: 208,
  firstPublished: "1997-07-22",
  coverImageUrlSmall: "https://example.com/onepiece1-small.jpg",
  coverImageUrlBig: "https://example.com/onepiece1-big.jpg",
  imageAlt: "One Piece Volume 1 Cover",
  state: "to read",
  yourRating: 5,
  readDates: {
    dateStarted: "2020-08-01",
    dateFinished: "2020-08-05",
    readYear: 2020,
  },
};

const attackOnTitanVol1: BookDto = {
  _id: "3",
  title: "Attack on Titan Vol. 1",
  author: "Hajime Isayama",
  saga: { name: "Attack on Titan", bookNumber: 1 },
  description:
    "Humanity fights for survival behind walls, but when Titans breach the gates, chaos ensues.",
  genres: ["Action", "Horror", "Drama"],
  pages: 193,
  firstPublished: "2009-10-07",
  coverImageUrlSmall: "https://example.com/aot1-small.jpg",
  coverImageUrlBig: "https://example.com/aot1-big.jpg",
  imageAlt: "Attack on Titan Volume 1 Cover",
  state: "read",
  yourRating: 4,
  readDates: {
    dateStarted: "2019-11-12",
    dateFinished: "2019-11-13",
    readYear: 2019,
  },
};

const deathNoteVol1: BookDto = {
  _id: "4",
  title: "Death Note Vol. 1",
  author: "Tsugumi Ohba",
  saga: { name: "Death Note", bookNumber: 1 },
  description:
    "A high school student discovers a notebook that grants him the power to kill anyone by writing their name.",
  genres: ["Mystery", "Thriller", "Supernatural"],
  pages: 195,
  firstPublished: "2003-12-01",
  coverImageUrlSmall: "https://example.com/deathnote1-small.jpg",
  coverImageUrlBig: "https://example.com/deathnote1-big.jpg",
  imageAlt: "Death Note Volume 1 Cover",
  state: "read",
  yourRating: 5,
  readDates: {
    dateStarted: "2022-01-03",
    dateFinished: "2022-01-05",
    readYear: 2022,
  },
};

const fullmetalAlchemistVol1: BookDto = {
  _id: "5",
  title: "Fullmetal Alchemist Vol. 1",
  author: "Hiromu Arakawa",
  saga: { name: "Fullmetal Alchemist", bookNumber: 1 },
  description:
    "The Elric brothers use alchemy to try to resurrect their mother, but pay a terrible price.",
  genres: ["Adventure", "Fantasy", "Drama"],
  pages: 192,
  firstPublished: "2001-07-12",
  coverImageUrlSmall: "https://example.com/fma1-small.jpg",
  coverImageUrlBig: "https://example.com/fma1-big.jpg",
  imageAlt: "Fullmetal Alchemist Volume 1 Cover",
  state: "read",
  yourRating: 4,
  readDates: {
    dateStarted: "2021-03-15",
    dateFinished: "2021-03-17",
    readYear: 2021,
  },
};

const bleachVol1: BookDto = {
  _id: "6",
  title: "Bleach Vol. 1",
  author: "Tite Kubo",
  saga: { name: "Bleach", bookNumber: 1 },
  description:
    "Ichigo Kurosaki becomes a Soul Reaper and must protect the living from evil spirits.",
  genres: ["Action", "Supernatural", "Shounen"],
  pages: 192,
  firstPublished: "2001-08-07",
  coverImageUrlSmall: "https://example.com/bleach1-small.jpg",
  coverImageUrlBig: "https://example.com/bleach1-big.jpg",
  imageAlt: "Bleach Volume 1 Cover",
  state: "read",
  yourRating: 4,
  readDates: {
    dateStarted: "2020-10-10",
    dateFinished: "2020-10-12",
    readYear: 2020,
  },
};

const chainsawManVol1: BookDto = {
  _id: "7",
  title: "Chainsaw Man Vol. 1",
  author: "Tatsuki Fujimoto",
  saga: { name: "Chainsaw Man", bookNumber: 1 },
  description:
    "Denji becomes a devil hunter to repay his debts and merges with his chainsaw demon companion.",
  genres: ["Action", "Horror", "Dark Fantasy"],
  pages: 192,
  firstPublished: "2019-03-03",
  coverImageUrlSmall: "https://example.com/chainsawman1-small.jpg",
  coverImageUrlBig: "https://example.com/chainsawman1-big.jpg",
  imageAlt: "Chainsaw Man Volume 1 Cover",
  state: "read",
  yourRating: 4,
  readDates: {
    dateStarted: "2023-02-01",
    dateFinished: "2023-02-02",
    readYear: 2023,
  },
};

const tokyoGhoulVol1: BookDto = {
  _id: "8",
  title: "Tokyo Ghoul Vol. 1",
  author: "Sui Ishida",
  saga: { name: "Tokyo Ghoul", bookNumber: 1 },
  description:
    "Ken Kaneki’s life changes forever after a deadly encounter with a flesh-eating ghoul.",
  genres: ["Horror", "Supernatural", "Seinen"],
  pages: 224,
  firstPublished: "2011-09-08",
  coverImageUrlSmall: "https://example.com/tokyoghoul1-small.jpg",
  coverImageUrlBig: "https://example.com/tokyoghoul1-big.jpg",
  imageAlt: "Tokyo Ghoul Volume 1 Cover",
  state: "to read",
};

const myHeroAcademiaVol1: BookDto = {
  _id: "9",
  title: "My Hero Academia Vol. 1",
  author: "Kohei Horikoshi",
  saga: { name: "My Hero Academia", bookNumber: 1 },
  description:
    "Izuku Midoriya wants to become a hero in a world where superpowers are the norm.",
  genres: ["Superhero", "Action", "Shounen"],
  pages: 192,
  firstPublished: "2014-07-07",
  coverImageUrlSmall: "https://example.com/mha1-small.jpg",
  coverImageUrlBig: "https://example.com/mha1-big.jpg",
  imageAlt: "My Hero Academia Volume 1 Cover",
  state: "to read",
};

const spyXFamilyVol1: BookDto = {
  _id: "10",
  title: "Spy x Family Vol. 1",
  author: "Tatsuya Endo",
  saga: { name: "Spy x Family", bookNumber: 1 },
  description:
    "A spy, an assassin, and a telepath form a fake family to fulfill their secret missions.",
  genres: ["Comedy", "Action", "Slice of Life"],
  pages: 216,
  firstPublished: "2019-03-25",
  coverImageUrlSmall: "https://example.com/spyxfamily1-small.jpg",
  coverImageUrlBig: "https://example.com/spyxfamily1-big.jpg",
  imageAlt: "Spy x Family Volume 1 Cover",
  state: "to read",
};

const vinlandSagaVol1: BookDto = {
  _id: "11",
  title: "Vinland Saga Vol. 1",
  author: "Makoto Yukimura",
  saga: { name: "Vinland Saga", bookNumber: 1 },
  description:
    "Set in the Viking era, a young warrior seeks revenge while exploring themes of war and peace.",
  genres: ["Historical", "Action", "Seinen"],
  pages: 464,
  firstPublished: "2005-10-14",
  coverImageUrlSmall: "https://example.com/vinlandsaga1-small.jpg",
  coverImageUrlBig: "https://example.com/vinlandsaga1-big.jpg",
  imageAlt: "Vinland Saga Volume 1 Cover",
  state: "to read",
};

const demonSlayerVol1: BookDto = {
  _id: "12",
  title: "Demon Slayer: Kimetsu no Yaiba Vol. 1",
  author: "Koyoharu Gotouge",
  saga: { name: "Demon Slayer", bookNumber: 1 },
  description:
    "Tanjiro Kamado's peaceful life is shattered when demons attack his family, leading him on a quest to save his sister and hunt demons.",
  genres: ["Action", "Supernatural", "Adventure"],
  pages: 192,
  firstPublished: "2016-06-03",
  coverImageUrlSmall: "https://example.com/demonslayer1-small.jpg",
  coverImageUrlBig: "https://example.com/demonslayer1-big.jpg",
  imageAlt: "Demon Slayer Volume 1 Cover",
  state: "to read",
};

export const shonenFixturesDto: BookDto[] = [
  narutoVol1,
  onePieceVol1,
  bleachVol1,
];

export const dragonBallReadDto: BookDto = {
  _id: "1234567890dragonball5555",
  title: "Dragon Ball, Vol. 1",
  author: "Akira Toriyama",
  saga: {
    name: "Dragon Ball",
    bookNumber: 1,
  },
  description:
    "Follow the adventures of a young monkey-tailed boy named Goku as he embarks on a journey to collect the seven mystical Dragon Balls. Along the way, he meets Bulma, Master Roshi, and other unforgettable characters in the beginning of this legendary manga series.",
  genres: ["Manga", "Action", "Adventure", "Comedy"],
  pages: 192,
  firstPublished: "2003-05-06",
  state: "read",
  yourRating: 5,
  readDates: {
    dateStarted: "2021-03-15",
    dateFinished: "2021-03-17",
    readYear: 2021,
  },
  coverImageUrlSmall:
    "https://images-na.ssl-images-amazon.com/images/I/51Ypye1bxBL._SX331_BO1,204,203,200_.jpg",
  coverImageUrlBig:
    "https://images-na.ssl-images-amazon.com/images/I/51Ypye1bxBL.jpg",
  imageAlt: "Dragon Ball Volume 1 cover featuring young Goku riding a cloud",
};

export const dragonBallToReadDto: BookDto = {
  _id: "1234567890dragonball5555",
  title: "Dragon Ball, Vol. 1",
  author: "Akira Toriyama",
  saga: {
    name: "Dragon Ball",
    bookNumber: 1,
  },
  description:
    "Follow the adventures of a young monkey-tailed boy named Goku as he embarks on a journey to collect the seven mystical Dragon Balls. Along the way, he meets Bulma, Master Roshi, and other unforgettable characters in the beginning of this legendary manga series.",
  genres: ["Manga", "Action", "Adventure", "Comedy"],
  pages: 192,
  firstPublished: "2003-05-06",
  state: "to read",
  coverImageUrlSmall:
    "https://images-na.ssl-images-amazon.com/images/I/51Ypye1bxBL._SX331_BO1,204,203,200_.jpg",
  coverImageUrlBig:
    "https://images-na.ssl-images-amazon.com/images/I/51Ypye1bxBL.jpg",
  imageAlt: "Dragon Ball Volume 1 cover featuring young Goku riding a cloud",
};

export const mangaFixtures: BookDto[] = [
  narutoVol1,
  onePieceVol1,
  attackOnTitanVol1,
  deathNoteVol1,
  fullmetalAlchemistVol1,
  bleachVol1,
  chainsawManVol1,
  tokyoGhoulVol1,
  myHeroAcademiaVol1,
  spyXFamilyVol1,
  vinlandSagaVol1,
  demonSlayerVol1,
  dragonBallToReadDto,
];
