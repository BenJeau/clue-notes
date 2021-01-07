export interface Section {
  title: string;
  data: string[];
}

export const sections: Section[] = [
  {
    title: "Suspects",
    data: [
      "Miss Scarlet",
      "Col. Mustard",
      "Mrs. White",
      "Mr. Green",
      "Mrs. Peacock",
      "Prof. Plum",
    ],
  },
  {
    title: "Weapons",
    data: ["Candlestick", "Knife", "Rope", "Revolver", "Lead Pipe", "Wrench"],
  },
  {
    title: "Rooms",
    data: [
      "Ball Room",
      "Billiard Room",
      "Conservatory",
      "Dinning Room",
      "Hall",
      "Kitchen",
      "Library",
      "Lounge",
      "Study",
    ],
  },
];

export const headerData = [
  {
    suspect: "Miss Scarlet",
    color: { dark: "#A5494F", light: "#ff595e" },
  },
  {
    suspect: "Col. Mustard",
    color: { dark: "#A7A15A", light: "#ffca3a" },
  },
  {
    suspect: "Mr. Green",
    color: { dark: "#48864D", light: "#8ac926" },
  },
  {
    suspect: "Mrs. Peacock",
    color: { dark: "#4A57BA", light: "#1982c4" },
  },
  {
    suspect: "Prof. Plum",
    color: { dark: "#5F388B", light: "#6a4c93" },
  },
  {
    suspect: "Mrs. White",
    color: { dark: "#BCBCBC", light: "#FFFFFF" },
  },
];

export const icons = [
  "check",
  "close",
  "exclamation",
  "comment-search-outline",
  "eye-outline",
  "eye-off-outline",
  "flash",
  "alien-outline",
  "arm-flex-outline",
];

export const sheet = [
  {
    title: "Numbers",
    data: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  },
  {
    title: "Letters",
    data: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
  },
];
