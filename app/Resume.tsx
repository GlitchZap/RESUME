'use client'

import React, { useRef, ReactNode, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calendar, Briefcase, Book, Award, Code, Globe, Mail, Linkedin, GitBranch, Dribbble, Phone, MapPin } from 'lucide-react'

interface SectionProps {
  title: string;
  icon: React.ElementType;
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon: Icon, children }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="mb-12 bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-blur-sm relative overflow-hidden transition-all duration-300 ease-in-out hover:bg-opacity-70"
    >
      <Icon className="absolute top-4 right-4 w-6 h-6 text-indigo-400 opacity-20" />
      <h2 className="text-2xl font-semibold mb-4 text-indigo-400 border-b border-indigo-400 pb-2">{title}</h2>
      {children}
    </motion.div>
  )
}

const IconLink: React.FC<{ href: string; icon: React.ElementType; text: string }> = ({ href, icon: Icon, text }) => (
  <a href={href} className="flex items-center mr-4 mb-2 text-gray-400 hover:text-indigo-400 transition-colors duration-200">
    <Icon className="w-4 h-4 mr-2" />
    <span>{text}</span>
  </a>
)

const Skill: React.FC<{ name: string }> = ({ name }) => (
  <span className="bg-indigo-600 text-white px-2 py-1 rounded-full text-sm mr-2 mb-2">{name}</span>
)

const ExperienceItem: React.FC<{ title: string; company: string; date: string; duties: string[] }> = ({ title, company, date, duties }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-indigo-400">{title}</h3>
    <p className="text-sm text-gray-400">{company} | {date}</p>
    <ul className="list-disc list-inside mt-2 text-gray-300">
      {duties.map((duty, index) => (
        <li key={index}>{duty}</li>
      ))}
    </ul>
  </div>
)

export default function Resume() {
  useEffect(() => {
    document.body.style.background = '#0f172a'
    document.body.style.color = '#e2e8f0'
    return () => {
      document.body.style.background = ''
      document.body.style.color = ''
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 p-8 font-sans relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
          alt="Space background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900 bg-opacity-70"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <h1 className="text-4xl font-bold mb-2 text-indigo-400">Aayush Kumar</h1>
          <div className="flex flex-wrap justify-between text-sm text-gray-400">
            <IconLink href="#" icon={MapPin} text="Chennai, India 603203" />
            <IconLink href="tel:9311826989" icon={Phone} text="9311826989" />
            <IconLink href="mailto:aayushkripl@gmail.com" icon={Mail} text="aayushkripl@gmail.com" />
            <IconLink href="https://www.linkedin.com/in/aayush-kumar-30019728a" icon={Linkedin} text="LinkedIn Profile" />
          </div>
        </motion.header>

        <Section title="Portfolio and Socials" icon={Globe}>
          <div className="flex">
            <IconLink href="https://dribbble.com/GlitchZap" icon={Dribbble} text="Dribbble" />
            <IconLink href="https://github.com/GlitchZap" icon={GitBranch} text="GitHub" />
          </div>
        </Section>

        <Section title="Summary" icon={Book}>
          <p className="text-gray-300">
            Enthusiastic web developer and graphics designer with a strong foundation in key web technologies. 
            Passionate about creative design and committed to continuous learning. 
            Seeking opportunities to utilize skills and contribute to company mission.
          </p>
        </Section>

        <Section title="Skills" icon={Code}>
          <div className="flex flex-wrap">
            {['Python', 'C programming', 'Object-Oriented Programming', 'HTML and CSS', 'Critical thinking', 
              'Web development', 'Web design', 'Coding', 'Programming', 'Performance monitoring'].map((skill, index) => (
              <Skill key={index} name={skill} />
            ))}
          </div>
        </Section>

        <Section title="Experience" icon={Briefcase}>
          <ExperienceItem
            title="Product Design Virtual Experience Participant"
            company="Forage - Remote"
            date="August 2023 - December 2023"
            duties={[
              "Completed a simulation focused on how the Product Design team can transform a user's experience",
              "Added a new feature and iterated on an existing product screen",
              "Communicated the decisions made for the feature design",
              "Participated in Accenture North America Product Design virtual experience program"
            ]}
          />
          <ExperienceItem
            title="Marketing Associate"
            company="Winzera Pvt. Ltd."
            date="Core Team Member at a Startup"
            duties={[
              "Took part in various events to improve soft skills",
              "Delved deep into LLMs, B2B, B2C, and various Business transactions",
              "Worked with professionals to gain a clear understanding of industries and startup operations"
            ]}
          />
          <ExperienceItem
            title="Creatives Team Lead"
            company="TPHxSRMIST - Chennai, IN"
            date="March 2024 - Current"
            duties={[
              "Led creative direction for projects involving graphic design",
              "Contributed to seamless operational processes through effective teamwork",
              "Ensured punctuality and superior quality in task execution through effective leadership",
              "Tracked team achievements and adjusted strategies as needed"
            ]}
          />
          <ExperienceItem
            title="Web Developer"
            company="IEEE Computer Society, SRMIST - Chennai, IN"
            date="January 2024 - Current"
            duties={[
              "Collaborated with other developers on coding projects",
              "Developed web applications using HTML, CSS, JavaScript, and React",
              "Integrated design specifications into the development process for accurate execution",
              "Developed wireframes and prototypes to validate user interactions with UI elements"
            ]}
          />
        </Section>

        <Section title="Education" icon={Book}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <h3 className="text-lg font-semibold text-indigo-400">B.Tech Computer Science And Technology</h3>
            <p className="text-sm text-gray-400">SRM INSTITUTE OF SCIENCE AND TECHNOLOGY | October 2024</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-indigo-400">Schooling</h3>
            <p className="text-sm text-gray-400">GYAN MANDIR PUBLIC SCHOOL | October 2024</p>
          </motion.div>
        </Section>

        <Section title="Certifications" icon={Award}>
          <ul className="list-disc list-inside text-gray-300">
            {[
              "Cascading Style Sheet (CSS), HackerRank, 06/01/24",
              "Beginning C++ Programming - From Beginner to Beyond, Udemy, 05/01/24",
              "Python (Basic), HackerRank, 02/01/24",
              "IBM Python for Data Science & AI Development, COURSERA, 01/01/24",
              "C, C++, Python and Ruby Programming, Udemy, 10/01/23"
            ].map((cert, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {cert}
              </motion.li>
            ))}
          </ul>
        </Section>

        <Section title="Hobbies and Interests" icon={Calendar}>
          <p className="text-gray-300">
            Coding, Watching Movies, Web Series and Anime, Web Development, Graphics Designing, Sports
          </p>
        </Section>

        <Section title="Languages" icon={Globe}>
          <ul className="list-disc list-inside text-gray-300">
            {[
              "Hindi (First Language)",
              "English (Advanced - C1)",
              "German (Elementary - A2)"
            ].map((lang, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {lang}
              </motion.li>
            ))}
          </ul>
        </Section>

        <Section title="Competitions" icon={Award}>
          <ul className="list-disc list-inside text-gray-300">
            {[
              "Won internal rounds of RedBull Basement Hackathon, a 36-hour Ideathon+Hackathon",
              "Got selected for the external rounds for the Smart India Hackathon"
            ].map((comp, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {comp}
              </motion.li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  )
}