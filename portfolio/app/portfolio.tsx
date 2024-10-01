"use client"

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react'

export default function Portfolio() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 200])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  const [mounted, setMounted] = useState(false)

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
            Rianne
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

      <main className="pt-20">
        <section id="hero" className="h-screen flex items-center justify-center relative overflow-hidden">
          <motion.div 
            style={{ y: y1 }}
            className="text-center z-10"
          >
            <h2 className="text-5xl font-bold mb-4">Welcome to Rianne's World</h2>
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
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <p className="text-lg mb-4">
              I'm a penultimate Information Systems student from Singapore Management University, specialising in Financial Technology & Digitalisation and Cloud Solutions. 
            </p>

            <p className="text-lg mb-4">
            I am a passionate developer and an advocate for leveraging technology to drive meaningful social impacts.
            With proficiency in Python, Java, JavaScript, CSS, HTML and SQL, I build dynamic solutions, particularly using frameworks like Vue.js. Currently, I'm expanding my skillset with Next.js while developing this website.
            </p>

            <p className="text-lg">
              When I'm not coding, you can find me exploring new technologies, finding new investment opportunities, watching dramas or playing games.
            </p>

          </motion.div>
        </section>

        <section id="projects" className="min-h-screen p-8 flex items-center">
        <h2 className="text-4xl font-bold mb-8 text-center">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { id: 1, title: 'Solo Scholar', description: 'A platform to assist users in their study journey, with pomodoro timer, to-do lists, notetaking features and speech to text conversion.' },
              { id: 2, title: 'Gym Daddy', description: 'A gym management system, offering a virtual queuing and booking system with telegram personalised notifications.' },
              { id: 3, title: 'Xiao Liu Ren Telegram Bot', description: 'Automating a quick prediction method from Chinese Metaphysics with the use of telegram bots.' },
            ].map((project) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p>{project.description}</p>
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
            <p className="text-lg mb-8">I'm always open to new opportunities and collaborations.</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-800 hover:text-pink-600 transition-colors">
                <GithubIcon size={32} />
              </a>
              <a href="#" className="text-gray-800 hover:text-pink-600 transition-colors">
                <LinkedinIcon size={32} />
              </a>
              <a href="#" className="text-gray-800 hover:text-pink-600 transition-colors">
                <MailIcon size={32} />
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