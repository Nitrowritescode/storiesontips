const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Create kids story on description for 5-8 Years kids, Educational story, and all images in Paper cut style: story of boy and Magic School, give me 5 chapters, With detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in JSON field format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "bookTitle": "Barnaby\'s Blueberry Bonanza",\n  "cover": {\n    "imagePrompt": "A whimsical illustration in a vibrant watercolor style. Barnaby, a cheerful bear cub with bright blue overalls, stands amidst a sprawling blueberry bush overflowing with plump, juicy blueberries.  Sunbeams dappled through leaves, creating a magical atmosphere. The title \'Barnaby\'s Blueberry Bonanza\' is written in a playful, handwritten font.",\n    "chapter": null,\n    "imageText": "Barnaby, a happy bear cub, surrounded by blueberries."\n  },\n  "chapters": [\n    {\n      "chapterNumber": 1,\n      "chapterTitle": "Barnaby\'s Big Discovery",\n      "storyText": "Barnaby the bear cub loved blueberries more than anything! One sunny morning, while exploring the woods near his home, he stumbled upon a secret clearing.  It was bursting with the biggest, juiciest blueberries he had ever seen!  A giant blueberry bush, taller than Barnaby himself, overflowed with delicious purple berries.",\n      "imagePrompt": "A watercolor illustration showing Barnaby, a small bear cub with surprised expression, discovering a giant blueberry bush overflowing with blueberries in a sunny forest clearing.",\n      "imageText": "Barnaby discovers a huge blueberry bush.",\n      "difficultWords": [\n        {\n          "word": "stumbled",\n          "meaning": "tripped or walked clumsily"\n        },\n        {\n          "word": "clearing",\n          "meaning": "an open space in a forest"\n        }\n      ]\n    },\n    {\n      "chapterNumber": 2,\n      "chapterTitle": "A Blueberry Feast!",\n      "storyText": "Barnaby couldn\'t believe his eyes! He started picking blueberries, filling his little basket in no time.  He ate some right there, their sweetness bursting in his mouth.  They were the most delicious blueberries he’d ever tasted!",\n      "imagePrompt": "Watercolor illustration of Barnaby happily picking blueberries and eating them, his basket overflowing.  He\'s surrounded by sunlight and the blueberry bush.",\n      "imageText": "Barnaby enjoys a blueberry feast.",\n      "difficultWords": []\n    },\n    {\n      "chapterNumber": 3,\n      "chapterTitle": "Sharing is Caring",\n      "storyText": "As Barnaby ate, he noticed his friends, Rosie the rabbit and Finley the fox, peering shyly from behind a tree.  He remembered his mama always said sharing is caring. Barnaby generously offered them some of his delicious bounty.",\n      "imagePrompt": "Watercolor illustration of Barnaby sharing blueberries with Rosie the rabbit and Finley the fox. They all look happy and content.",\n      "imageText": "Barnaby shares his blueberries with friends.",\n      "difficultWords": [\n        {\n          "word": "generously",\n          "meaning": "in a kind and giving way"\n        },\n        {\n          "word": "bounty",\n          "meaning": "a large amount of something good"\n        }\n      ]\n    },\n    {\n      "chapterNumber": 4,\n      "chapterTitle": "A Blueberry Pie Surprise!",\n      "storyText": "Rosie and Finley were overjoyed!  They helped Barnaby gather the rest of the blueberries.  Later, Barnaby’s mama made a delicious blueberry pie, big enough for everyone to share.",\n      "imagePrompt": "Watercolor illustration of Barnaby, Rosie, and Finley enjoying a large blueberry pie together.  Barnaby\'s mama is smiling in the background.",\n      "imageText": "Barnaby and friends enjoy a blueberry pie.",\n      "difficultWords": [\n        {\n          "word": "overjoyed",\n          "meaning": "very happy"\n        }\n      ]\n    },\n    {\n      "chapterNumber": 5,\n      "chapterTitle": "Sweet Memories",\n      "storyText": "That night, snuggled in his bed, Barnaby smiled.  The blueberries were delicious, but sharing them with his friends made the day even sweeter. He knew he would always remember his blueberry bonanza.",\n      "imagePrompt": "Watercolor illustration of Barnaby asleep in his bed, dreaming of blueberries and his friends. Soft, warm light fills the scene.",\n      "imageText": "Barnaby dreams of his blueberry adventure.",\n      "difficultWords": []\n    }\n  ],\n  "moralOfTheStory": {\n    "moral": "Sharing with others brings more joy than keeping things to yourself."\n  }\n}\n```\n',
        },
      ],
    },
  ],
});
