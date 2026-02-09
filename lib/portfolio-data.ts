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
    skills: ["Docker", "Vercel", "AWS EC2", "Telegram API", "Google APIs"],
    color: "text-terminal-red",
  },
];

export const projectsData = [
  {
    name: "Time The Market (FYP)",
    desc: "ML & sentiment analysis solution to predict stock market trends for Tiger Fund Management",
    tech: ["Python", "TensorFlow", "LSTM", "Vue.js", "Docker", "AWS EC2"],
    link: "#",
  },
  {
    name: "WFH System",
    desc: "Comprehensive work from home management system to apply, approve and track WFH status",
    tech: ["Python Flask", "Vue.js", "Supabase", "Vercel"],
    link: "#",
  },
  {
    name: "OOP Project x P&C Maintenance",
    desc: "Real-world client solution to manage worker jobs and admin schedule planning",
    tech: ["Java", "Spring Boot", "Vue.js", "Google Maps API"],
    link: "#",
  },
  {
    name: "Gym Daddy",
    desc: "Gym management system with virtual queuing, booking, and Telegram notifications",
    tech: ["Vue.js", "Python", "Docker", "Telegram API"],
    link: "#",
  },
  {
    name: "Solo Scholar",
    desc: "Study platform with pomodoro timer, to-do lists, notes, and speech-to-text",
    tech: ["JavaScript", "Vue.js", "HTML", "CSS"],
    link: "#",
  },
  {
    name: "Xiao Liu Ren Bot",
    desc: "Telegram bot automating Chinese Metaphysics quick prediction methods",
    tech: ["Python", "Telegram Bot API", "Flask"],
    link: "#",
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
