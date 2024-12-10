"use client"

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GithubIcon, LinkedinIcon } from 'lucide-react'

export default function Portfolio() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 200])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  const [mounted, setMounted] = useState(false)

  const projects = [
    {
      id: 1, 
      title: 'Solo Scholar', 
      description: 'A platform to assist users in their study journey, with pomodoro timer, to-do lists, notetaking features and speech to text conversion.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Vue.js']
    },
    {
      id: 2, 
      title: 'Gym Daddy', 
      description: 'A gym management system, offering a virtual queuing and booking system with telegram personalised notifications.',
      technologies: ['Vue.js', 'Python', 'Docker', 'Telegram API']
    },
    {
      id: 3, 
      title: 'Xiao Liu Ren Telegram Bot', 
      description: 'Automating a quick prediction method from Chinese Metaphysics with the use of telegram bots.',
      technologies: ['Python', 'Telegram Bot API', 'Python Flask']
    },
    {
      id: 4, 
      title: 'WFH SYSTEM', 
      description: 'A comprehensive work from home management system to apply, approve and track employees WFH status.',
      technologies: ['Python', 'Python Flask', 'Vue.js', 'Supabase', 'Vercel']
    },
    {
      id: 5, 
      title: 'OOP Project x P&C Maintenance Services', 
      description: 'Worked with real world client to create a solution to manage worker jobs and admin schedule planning',
      technologies: ['Java', 'Spring Boot', 'Vue.js', 'Google Maps API', 'Gmail API']
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-blue-300 to-purple-300 text-gray-800">
      <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-white bg-opacity-10 backdrop-blur-md">
        <nav className="flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-pink-600"
          >
            Rianne Lim
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex space-x-4"
          >
            <a href="#about" className="hover:text-pink-600 transition-colors">About</a>
            <a href="#projects" className="hover:text-pink-600 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-pink-600 transition-colors">Contact</a>
          </motion.div>
        </nav>
      </header>

      <main className="pt-16">
        <section id="hero" className="h-screen flex items-center justify-center relative overflow-hidden">
          <motion.div 
            style={{ y: y1 }}
            className="text-center z-10"
          >
            <h2 className="text-5xl font-bold mb-4">Welcome to Rianne&apos;s World</h2>
            <p className="text-xl">Explore my digital universe</p>
          </motion.div>
          <motion.div 
            style={{ y: y2 }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-blue-500 opacity-20 filter blur-3xl"></div>
            <div className="absolute inset-0 bg-pink-500 opacity-20 filter blur-3xl transform translate-x-full"></div>
          </motion.div>
        </section>

        <section id="about" className="min-h-screen flex items-center justify-center p-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl font-bold mb-4 text-center">About Me</h2>
            <p className="text-lg mb-4">
              I am a penultimate Information Systems student from Singapore Management University, specialising in Financial Technology & Digitalisation and Cloud Solutions. 
            </p>

            <p className="text-lg mb-4">
            A passionate developer with proficiency in Python, Java, JavaScript, CSS, HTML and SQL, I build dynamic solutions, particularly using frameworks like Vue.js. Currently, I&apos;m expanding my skillset with Next.js while developing this website.
            </p>

            <p className="text-lg">
              When I&apos;m not coding, you can find me exploring new technologies, finding new investment opportunities, watching dramas or playing games.
            </p>

          </motion.div>
        </section>

      <section id="projects" className="min-h-screen p-8 flex flex-col items-center justify-start pt-20">
        <h2 className="text-4xl font-bold mb-8 text-center">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-pink-200 text-pink-800 px-2 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>


        <section id="contact" className="min-h-screen flex items-center justify-center p-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg mb-8">I&apos;m always open to new opportunities and collaborations.</p>
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/riannelimje" className="text-gray-800 hover:text-pink-600 transition-colors">
                <GithubIcon size={32} />
              </a>
              <a href="https://www.linkedin.com/in/rianne-lim/" className="text-gray-800 hover:text-pink-600 transition-colors">
                <LinkedinIcon size={32} />
              </a>
              
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="bg-white bg-opacity-10 backdrop-blur-md text-center p-4">
        <p>&copy; {new Date().getFullYear()} Rianne Lim. All rights reserved.</p>
      </footer>
    </div>
  )
}