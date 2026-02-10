import { Github, Linkedin } from "lucide-react";

export const aboutData = {
  name: "Rianne Lim",
  role: "Software Engineer",
  company: "JP Morgan Chase",
  education: {
    school: "Singapore Management University",
    major: "Information Systems",
    specializations: ["Financial Technology", "Digitalisation & Cloud Solutions"],
  },
  description: [
    "A passionate developer with proficiency in Python, Java, JavaScript, TypeScript and SQL. I enjoy building games inspired by intellectual game shows and creating efficient solutions for real world applications.",
    "Aside from coding, I love watching dramas! I've seriously debated adding a whole section to this site for my reviews (stay tuned, it might actually happen).",
    "Recently I've picked up cardistry as a hobby and it's been a fun challenge learning new sleight of hand moves!",
  ],
  location: "Singapore",
  message: "Thanks for playing around with my website!",
};

export const skillsData = [
  {
    title: "Languages",
    skills: ["Python", "Java", "JavaScript", "HTML", "CSS", "SQL"],
    color: "text-terminal-green",
  },
  {
    title: "Frontend",
    skills: ["Vue.js", "Next.js"],
    color: "text-terminal-cyan",
  },
  {
    title: "Backend",
    skills: ["Fast API", "Flask", "Spring Boot", "Supabase"],
    color: "text-terminal-yellow",
  },
  {
    title: "Tools",
    skills: ["Docker", "Vercel", "AWS EC2", "Telegram API", "Google APIs", "Ollama"],
    color: "text-terminal-red",
  },
];

export const projectsData = [
  {
    name: "The Devil's Plan",
    desc: "Recreating the games from The Devil's Plan!",
    tech: ["Next.js", "Supabase"],
    link: "https://the-devils-plan.vercel.app/",
  },
  {
    name: "Can You Pi?",
    desc: "A game to test your knowledge on the digits of Pi",
    tech: ["Python", "Fast API", "Next.js", "Docker"],
    link: "",
  },
  {
    name: "CNY Motion Detector",
    desc: "Made for Chinese New Year - clench and open your fist to evoke fireworks and a lucky scroll!",
    tech: ["Three.js", "MediaPipe Hands", "WebGL", "Canvas API"],
    link: "https://cny-motion-detector.vercel.app/",
  },
  {
    name: "AI Portfolio and Recruitment Assistant",
    desc: "Comprehensive recruitment platform leveraging LLMs to reinvent how we apply as students and hire as recruiters",
    tech: ["Python", "FastAPI", "LLM", "RAG", "Supabase", "Ollama", "Next.js"],
    link: "https://github.com/riannelimje/IS469_G2_Group4",
  },
  {
    name: "A+ Alchemy / pinecone playground",
    desc: "Started out as a pinecone playground but evolved into a study assistant that helps you summarise and quiz yourself on your notes!",
    tech: ["Python", "FastAPI", "Next.js", "Pinecone", "SQLite"],
    link: "https://github.com/riannelimje/pinecone_playground",
  },
  {
    name: "Time The Market (FYP)",
    desc: "ML & sentiment analysis solution to predict stock market trends for Tiger Fund Management",
    tech: ["Python", "TensorFlow", "LSTM", "Vue.js", "Docker", "AWS EC2"],
    link: "",
  },
  {
    name: "WFH System",
    desc: "Comprehensive work from home management system to apply, approve and track WFH status",
    tech: ["Python Flask", "Vue.js", "Supabase", "Vercel"],
    link: "https://github.com/riannelimje/SCRUM",
  },
  {
    name: "OOP Project x P&C Maintenance",
    desc: "Real-world client solution to manage worker jobs and admin schedule planning",
    tech: ["Java", "Spring Boot", "Vue.js", "Google Maps API"],
    link: "",
  },
  {
    name: "Gym Daddy",
    desc: "Gym management system with virtual queuing, booking, and Telegram notifications",
    tech: ["Vue.js", "Python", "Docker", "Telegram API"],
    link: "https://github.com/riannelimje/gym-daddy-app",
  },
  {
    name: "Solo Scholar",
    desc: "Study platform with pomodoro timer, to-do lists, notes, and speech-to-text",
    tech: ["JavaScript", "Vue.js", "HTML", "CSS"],
    link: "https://github.com/riannelimje/study-with-me",
  },
  {
    name: "Xiao Liu Ren Bot",
    desc: "Telegram bot automating Chinese Metaphysics quick prediction methods",
    tech: ["Python", "Telegram Bot API", "Flask", "LLM", "AWS"],
    link: "https://t.me/xiaoliurenbot",
  },
];

export const contactsData = [
  {
    label: "GitHub",
    value: "github.com/riannelimje",
    href: "https://github.com/riannelimje",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/rianne-lim/",
    href: "https://www.linkedin.com/in/rianne-lim/",
  },
];
