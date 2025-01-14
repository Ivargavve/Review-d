import mongoose from "mongoose";

// just some temporary data to test the API
// this will be removed later when  

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: "Emelie",
    lastName: "jackson",
    email: "emelie@mail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.jpeg",
    friends: [],
    viewedProfile: 14561,
    impressions: 888822,
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Steve",
    lastName: "Ralph",
    email: "steve@mail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpeg",
    friends: [],
    viewedProfile: 12351,
    impressions: 55555,
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    firstName: "Tech",
    lastName: "Enthusiast42",
    email: "tech@mail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "p4.jpeg",
    friends: [],
    viewedProfile: 45468,
    impressions: 19986,
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    firstName: "Nerd",
    lastName: "Alert42",
    email: "nerd@mail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p6.jpeg",
    friends: [],
    viewedProfile: 41024,
    impressions: 55316,
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  },
  {
    _id: userIds[4],
    firstName: "Bobbi",
    lastName: "Marley99",
    email: "bobbi@mail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p5.jpeg",
    friends: [],
    viewedProfile: 40212,
    impressions: 7758,
    createdAt: 1493463661,
    updatedAt: 1493463661,
    __v: 0,
  },
  {
    _id: userIds[5],
    firstName: "Harvey",
    lastName: "Dunn",
    email: "harvey@mail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p7.jpeg",
    friends: [],
    viewedProfile: 976,
    impressions: 4658,
    createdAt: 1381326073,
    updatedAt: 1381326073,
    __v: 0,
  },
  {
    _id: userIds[6],
    firstName: "Carley",
    lastName: "Vowel",
    email: "carley@mail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p8.jpeg",
    friends: [],
    viewedProfile: 1510,
    impressions: 77579,
    createdAt: 1714704324,
    updatedAt: 1642716557,
    __v: 0,
  },
  {
    _id: userIds[7],
    firstName: "Jessica",
    lastName: "Dunn",
    email: "jessica@mail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p9.jpeg",
    friends: [],
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    firstName: "Steve",
    lastName: "Ralph",
    course: "TNM111 - Introduction to Data Science",
    description: "This course provides a comprehensive introduction to the fundamentals of data science, covering topics such as data manipulation, visualization, and basic machine learning algorithms. The hands-on projects were particularly helpful in reinforcing the concepts learned in lectures.",
    picturePath: "data.png",
    userPicturePath: "p3.jpeg",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
    ]),
    comments: [
      {
        name: "Carley Vowel",
        comment: "I found the Introduction to Data Science course to be a bit too basic for my liking. It would have been better if they delved into more advanced machine learning concepts."
      },
      {
        name: "Jessica Dunn",
        comment: "While I understand the sentiment, I think the simplicity of the course was its strength. It laid a solid foundation for beginners without overwhelming them with complex algorithms."
      }
    ],
    timestamp: "Apr 9, 2024, 2:20:01 PM",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3],
    firstName: "Tech",
    lastName: "Enthusiast42",
    course: "TDDD27 - Advanced Python Programming",
    description:
      "As someone with prior Python experience, this course was an excellent opportunity to deepen my understanding of the language. The instructor's explanations were clear, and the assignments pushed me to explore advanced topics like decorators and generators.",
    picturePath: "python.png",
    userPicturePath: "p6.jpeg",
    likes: new Map([
      [userIds[7], true],
      [userIds[4], true],
      [userIds[1], true],
      [userIds[2], true],
    ]),
    comments: [
      {
        name: "Bobbi Marley99",
        comment: "I totally agree with the review of the Advanced Python Programming course. It's perfect for someone who wants to take their Python skills to the next level."
      },
      {
        name: "Emelie Jackson",
        comment: "Absolutely! The course structure was well-planned, and the projects were challenging enough to keep me engaged throughout. Plus, the instructor's expertise was evident in every lecture."
      }
    ],
    timestamp: "Apr 4, 2024, 1:50:49 AM",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4],
    firstName: "Harvey",
    lastName: "Dunn",
    course: "TNM222 - Digital Marketing Strategies",
    description:
      "This course offered valuable insights into the world of digital marketing, covering topics such as SEO, social media marketing, and email campaigns. The real-world examples provided a practical understanding of how to implement these strategies effectively.",
    picturePath: "marketing.jpeg",
    userPicturePath: "p5.jpeg",
    likes: new Map([
      [userIds[1], true],
      [userIds[6], true],
      [userIds[3], true],
      [userIds[5], true],
    ]),
    comments: [
      {
        name: "Ivar Gavelin",
        comment: "Digital Marketing Strategies was a game-changer for me. The instructor's expertise and the hands-on approach really helped me level up my marketing skills. Highly recommend it to anyone in the field."
      },
      {
        name: "Steve Ralph",
        comment: "I couldn't agree more! The course not only covered the theoretical aspects but also provided actionable insights that I could immediately apply to my social media campaigns. Definitely worth the investment."
      }
    ],
    timestamp: "Mar 27, 2024, 5:19:01 PM",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[5],
    firstName: "Carley",
    lastName: "Vowel",
    course: "TNM333 - Web Development Fundamentals",
    description:
      "This course offers a comprehensive introduction to web development, covering HTML, CSS, and JavaScript from scratch. The interactive tutorials and guided projects provide a hands-on learning experience, making it suitable for beginners looking to start a career in web development.",
    picturePath: "code.jpeg",
    userPicturePath: "p7.jpeg",
    likes: new Map([
      [userIds[1], true],
      [userIds[6], true],
      [userIds[3], true],
    ]),
    comments: [
      {
        name: "Steve Ralph",
        comment: "Introduction to Web Development was my gateway into the world of coding. The step-by-step guidance and practical exercises helped me build my first website within weeks. Highly recommend it to anyone wanting to learn web development from scratch."
      },
      {
        name: "Harvey Dunn",
        comment: "While the course covers the basics well, I wish there was more emphasis on modern design principles and frameworks. It felt a bit outdated in terms of the design aspect, but overall, still a solid foundation for beginners."
      },
      {
        name: "Nerd Alert42",
        comment: "As someone who already had some coding experience, I found this course to be a bit slow-paced. However, the thorough explanations and clear examples made it a good refresher for consolidating my knowledge."
      }
    ],
    timestamp: "Jan 1, 2024, 1:10:01 AM",
  },
];