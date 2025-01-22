const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
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
          text: '```json\n{\n  "bookTitle": "The Whispering Walls of Wonderwood",\n  "cover": {\n    "imagePrompt": "A vibrant, paper-cut style illustration showing a young boy with bright, curious eyes standing in front of a tall, whimsical school building made of colorful stacked blocks, with glowing windows and a giant smiling book as the door. Stars twinkle in the twilight sky above, and playful paper-cut trees with smiling faces surround the school. The title \'The Whispering Walls of Wonderwood\' is prominently displayed in a playful, chunky font at the top.",\n      "chapter": null,\n    "imageText": ""\n  },\n   "chapters": [\n    {\n      "chapterNumber": 1,\n      "chapterTitle": "The Discovery",\n      "storyText": "Once upon a time, in a cozy little town, lived a boy named Leo. Leo loved exploring! One sunny afternoon, while chasing a bright blue butterfly, he stumbled upon a hidden path. The path was lined with giggling flowers and whispering leaves. It led him to a place he’d never seen before – a school made of giant, colorful blocks!",\n      "imagePrompt": "A paper-cut illustration of a young boy with spiky brown hair, wearing a bright blue t-shirt and yellow shorts, following a blue butterfly down a winding path. The path is surrounded by paper-cut flowers with smiling faces and trees with leafy, textured branches. In the background, partially hidden behind the trees, is a whimsical school building made of colorful stacked blocks.",\n         "imageText": "Leo followed the butterfly to a secret path.",\n\n    },\n    {\n      "chapterNumber": 2,\n      "chapterTitle": "The Talking Book Door",\n      "storyText": "The school looked magical! It had windows that glowed with warm light and a huge, smiling book for a door. Leo, being brave and curious, knocked gently on the book. Suddenly, a voice boomed, “Welcome, little explorer! Are you ready for an adventure?” The book winked a giant, paper-cut eye!",\n      "imagePrompt": "A paper-cut style illustration showing a close up of the school’s entrance. The entrance is a large, smiling book made of textured paper, with a huge eye in the centre, winking.  Leo, from the previous chapter,  is seen knocking on the book door with a slightly surprised expression. The school\'s colourful, blocky structure is visible behind the book.",\n        "imageText":"The book door spoke to Leo and winked its eye."\n    },\n    {\n      "chapterNumber": 3,\n      "chapterTitle": "The Magical Classroom",\n      "storyText": "Leo stepped inside and found himself in a classroom unlike any he’d ever seen! The desks were floating in the air, and the walls were covered in maps that changed with a gentle whoosh. His teacher, a friendly owl with spectacles, greeted him with a warm smile. “Welcome to Wonderwood School!” she hooted.",\n      "imagePrompt": "A paper-cut illustration of a whimsical classroom inside the school. Floating desks with paper-cut pens and notebooks drift gently in the air. The walls are adorned with changing paper-cut maps of various landscapes, and a friendly owl with large spectacles is perched on a stack of paper-cut books, smiling warmly at Leo.",\n       "imageText": "The classroom had floating desks and magical changing maps."\n    },\n    {\n      "chapterNumber": 4,\n      "chapterTitle": "The Learning Adventures",\n      "storyText": "At Wonderwood, learning was an adventure! Leo learned about stars by riding on paper-cut comets, explored jungles by following paper-cut monkeys, and discovered hidden sea creatures by diving into a giant paper-cut aquarium. He even learned to make music with colorful, singing flowers!",\n      "imagePrompt": "A vibrant paper-cut collage depicting various scenes from Leo\'s learning adventures. A paper-cut Leo is shown riding a comet with stars around, another Leo is exploring a paper-cut jungle with monkeys and a third Leo is diving into a colourful paper-cut aquarium looking at fish. A group of colorful paper cut flowers are also visible, seemingly making music.",\n        "imageText": "Leo learned about stars, jungles and sea creatures."\n    },\n    {\n      "chapterNumber": 5,\n      "chapterTitle": "The Magic Within",\n      "storyText": "Leo loved Wonderwood School. He learned that magic wasn\'t just in the school, it was inside him too. He realized that curiosity and kindness were the most important magic of all. When it was time to leave, the book-door winked one last time, and Leo promised to visit again, always remembering the whispers of wonder from his magical school.",\n      "imagePrompt": "A paper-cut illustration of Leo waving goodbye to the smiling book-door of the school. The school is surrounded by twinkling stars, and the playful trees from the first scene are waving with their leafy branches. Leo has a bright smile, holding a paper-cut flower he picked from the magical classroom. The background is a soft, warm sunset colour.",\n       "imageText": "Leo waved goodbye to Wonderwood School, promising to visit again."\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});
