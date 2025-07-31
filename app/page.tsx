"use client"
import type React from "react"
import { useState, useEffect, createContext, useContext } from "react"
import {
  Menu,
  X,
  ChevronRight,
  Mail,
  Github,
  Linkedin,
  Code,
  Database,
  Bot,
  Shield,
  Zap,
  MapPin,
  MessageSquare,
  Server,
  Sun,
  Moon,
  Sparkles,
  Languages,
  Download,
  Send,
} from "lucide-react"
import emailjs from "@emailjs/browser"

// Theme Context
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
})

// Language Context
const LanguageContext = createContext({
  language: "fr",
  toggleLanguage: () => {},
  t: (key: string) => key,
})

const useTheme = () => useContext(ThemeContext)
const useLanguage = () => useContext(LanguageContext)

// Translations
const translations = {
  fr: {
    // Navigation
    home: "Accueil",
    projects: "Projets",
    about: "À Propos",
    contact: "Contact",
    // Hero Section
    heroTitle: "NYEMECK DJOUOKOUO James Romaric",
    heroSubtitle:
      "Se spécialise depuis plus de 3 ans dans la conception et l'implémentation des systèmes robustes et évolutifs avec Python et son framework Django ainsi que les technologies d'agents intelligents.",
    discoverProjects: "Découvrir mes projets",
    contactMe: "Me contacter",
    downloadCV: "Télécharger mon CV",
    backendEngineer: "Ingénieur Backend & IA",
    // Featured Projects
    featuredProjects: "Mes Projets Phares",
    featuredProjectsSubtitle: "Une sélection de réalisations qui illustrent mon expertise",
    seeProject: "Voir le projet",
    // Technologies
    technologiesTitle: "Technologies et Concepts Clés",
    technologiesSubtitle: "Les outils et frameworks que je maîtrise",
    // Projects Page
    myRealizations: "Mes Réalisations",
    projectsDescription:
      "Voici une sélection de projets qui illustrent mon expertise en architecture logicielle, développement backend et intégration de l'intelligence artificielle.",
    recentProject: "Projet Récent",
    backendEngineering: "Ingénierie Backend",
    context: "Contexte",
    myRole: "Mon Rôle",
    technicalSolution: "La Solution Technique",
    techStack: "Stack Technique",
    // About Page
    myStory: "Mon Histoire",
    workPhilosophy: "Ma Philosophie de Travail",
    philosophySubtitle: "Les principes qui guident mon approche du développement",
    architecturalRigor: "La Rigueur Architecturale comme Fondation",
    architecturalRigorText:
      "Je crois fermement qu'une application de qualité repose sur des fondations solides. C'est pourquoi j'accorde une importance capitale à la modélisation et à l'application rigoureuse des Design Patterns. Concevoir des systèmes maintenables et évolutifs n'est pas une option, c'est une exigence.",
    aiLeverage: "L'IA comme Levier Stratégique",
    aiLeverageText:
      "Au-delà du code traditionnel, je suis passionné par le potentiel des agents intelligents pour créer des applications véritablement interactives et autonomes. Je vois l'IA non seulement comme un outil pour l'utilisateur final, mais aussi comme un puissant accélérateur pour le développeur.",
    // Contact Page
    discussProject: "Discutons de votre projet",
    contactDescription:
      "Je suis toujours ouvert à de nouvelles opportunités et collaborations. N'hésitez pas à me contacter.",
    sendMessage: "Envoyez-moi un message",
    fullName: "Nom complet",
    email: "Email",
    message: "Message",
    yourName: "Votre nom",
    yourEmail: "votre@email.com",
    describeProject: "Décrivez votre projet...",
    sendMessageBtn: "Envoyer le message",
    sending: "Envoi en cours...",
    messageSent: "Message envoyé avec succès !",
    messageError: "Erreur lors de l'envoi du message. Veuillez réessayer.",
    // Footer
    allRightsReserved: "Tous droits réservés",
  },
  en: {
    // Navigation
    home: "Home",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    // Hero Section
    heroTitle: "NYEMECK DJOUOKOUO James Romaric",
    heroSubtitle:
      "Specializing for over 3 years in designing and implementing robust, scalable systems with Python, Django, and intelligent agent technologies.",
    discoverProjects: "Discover my projects",
    contactMe: "Contact me",
    downloadCV: "Download my CV",
    backendEngineer: "Backend Engineer & AI",
    // Featured Projects
    featuredProjects: "Featured Projects",
    featuredProjectsSubtitle: "A selection of achievements that illustrate my expertise",
    seeProject: "View project",
    // Technologies
    technologiesTitle: "Key Technologies and Concepts",
    technologiesSubtitle: "The tools and frameworks I master",
    // Projects Page
    myRealizations: "My Achievements",
    projectsDescription:
      "Here is a selection of projects that illustrate my expertise in software architecture, backend development and artificial intelligence integration.",
    recentProject: "Recent Project",
    backendEngineering: "Backend Engineering",
    context: "Context",
    myRole: "My Role",
    technicalSolution: "The Technical Solution",
    techStack: "Tech Stack",
    // About Page
    myStory: "My Story",
    workPhilosophy: "My Work Philosophy",
    philosophySubtitle: "The principles that guide my development approach",
    architecturalRigor: "Architectural Rigor as Foundation",
    architecturalRigorText:
      "I firmly believe that a quality application rests on solid foundations. That's why I attach paramount importance to modeling and rigorous application of Design Patterns. Designing maintainable and scalable systems is not an option, it's a requirement.",
    aiLeverage: "AI as Strategic Leverage",
    aiLeverageText:
      "Beyond traditional code, I am passionate about the potential of intelligent agents to create truly interactive and autonomous applications. I see AI not only as a tool for the end user, but also as a powerful accelerator for the developer.",
    // Contact Page
    discussProject: "Let's discuss your project",
    contactDescription: "I am always open to new opportunities and collaborations. Feel free to contact me.",
    sendMessage: "Send me a message",
    fullName: "Full name",
    email: "Email",
    message: "Message",
    yourName: "Your name",
    yourEmail: "your@email.com",
    describeProject: "Describe your project...",
    sendMessageBtn: "Send message",
    sending: "Sending...",
    messageSent: "Message sent successfully!",
    messageError: "Error sending message. Please try again.",
    // Footer
    allRightsReserved: "All rights reserved",
  },
}

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"
    setTheme(savedTheme)
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(newTheme)
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState("fr")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "fr"
    setLanguage(savedLanguage)
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === "fr" ? "en" : "fr"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const t = (key: string) => {
    return translations[language as keyof typeof translations][key as keyof typeof translations.fr] || key
  }

  return <LanguageContext.Provider value={{ language, toggleLanguage, t }}>{children}</LanguageContext.Provider>
}

const Portfolio = () => {
  const [currentPage, setCurrentPage] = useState("accueil")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [targetProjectId, setTargetProjectId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()

  const navigation = [
    { name: t("home"), id: "accueil" },
    { name: t("projects"), id: "projets" },
    { name: t("about"), id: "a-propos" },
    { name: t("contact"), id: "contact" },
  ]

  const technologies = [
    { name: "Python", icon: <Code className="w-8 h-8" /> },
    { name: "Django", icon: <Server className="w-8 h-8" /> },
    { name: "PostgreSQL", icon: <Database className="w-8 h-8" /> },
    { name: "PostGIS", icon: <MapPin className="w-8 h-8" /> },
    { name: "PGVector", icon: <Database className="w-8 h-8" /> },
    { name: "CrewAI", icon: <Bot className="w-8 h-8" /> },
    { name: "Celery", icon: <Zap className="w-8 h-8" /> },
    { name: "Docker", icon: <Database className="w-8 h-8" /> },
    { name: "Redis", icon: <Database className="w-8 h-8" /> },
    { name: "WebSockets", icon: <MessageSquare className="w-8 h-8" /> },
    { name: "Architecture Logicielle", icon: <Server className="w-8 h-8" /> },
  ]

  const projects = [
    {
      id: "multi-agent-btp",
      title:
        language === "fr"
          ? "Module intelligent pour l'optimisation du suivi de Chantiers BTP"
          : "Intelligent module for optimizing monitoring of civil engineering and construction projects",
      icon: <Bot className="w-10 h-10 mx-auto" />,
      accroche:
        language === "fr"
          ? "Un module IA complémentaire d'aide à la décision qui fournit des recommandations contextualisées pour optimiser les chantiers."
          : "A complementary AI-powered decision support module that provides contextualized recommendations to optimize construction projects.",
      contexte:
        language === "fr"
          ? "Le secteur du BTP au Cameroun, comme ailleurs, est confronté à des dépassements de budget et des retards récurrents. Les plateformes de suivi numérique existantes, bien qu'utiles pour centraliser les données, manquent cruellement d'outils d'aide à la décision capables de fournir des recommandations rapides, contextualisées et basées sur les réalités du marché local."
          : "The construction sector in Cameroon, like elsewhere, faces recurring budget overruns and delays. Existing digital monitoring platforms, while useful for centralizing data, sorely lack decision support tools capable of providing rapid, contextualized recommendations based on local market realities.",
      role:
        language === "fr"
          ? "En tant qu'Ingénieur Backend & IA, j'ai piloté la conception de l'architecture et le développement complet de ce système. J'ai proposé et mis en œuvre une approche orientée agent pour répartir intelligemment les tâches d'analyse (planning, budget, expertise technique) entre des entités autonomes et spécialisées, capables de collaborer pour résoudre des problèmes complexes."
          : "As a Backend & AI Engineer, I led the architecture design and complete development of this system. I proposed and implemented an agent-oriented approach to intelligently distribute analysis tasks (planning, budget, technical expertise) among autonomous and specialized entities, capable of collaborating to solve complex problems.",
      solution:
        language === "fr"
          ? [
              "Architecture d'Agents Intelligents: Système orchestré par un agent coordinateur qui délègue les tâches à des agents spécialisés (Budget, Planning, Expert BTP).",
              "Intelligence et Contextualisation: Utilisation de Retrieval-Augmented Generation (RAG) avec une base de connaissances vectorielle (PGVector) pour fournir des réponses pertinentes au contexte local.",
              "Scalabilité, évolutivité et robustesse : architecture découplée avec un bus de communication asynchrone (Celery et Redis), permettant une évolutivité exceptionnelle. Les agents écoutent et communiquent uniquement via les canaux du bus asynchrone, ce qui permet d’ajouter ou de retirer des agents sans refonte majeure. ",
              "Communication Temps Réel: Interaction fluide via WebSockets pour des notifications et un dialogue en temps réel.",
            ]
          : [
              "Intelligent Agent Architecture: System orchestrated by a coordinator agent that delegates tasks to specialized agents (Budget, Planning, Construction Expert).",
              "Intelligence and Contextualization: Use of Retrieval-Augmented Generation (RAG) with a vector knowledge base (PGVector) to provide relevant responses to local context.",
              "Scalability, extensibility, and robustness: a decoupled architecture using an asynchronous communication bus (Celery and Redis), delivering exceptional scalability. Agents listen and interact exclusively through the asynchronous bus channels, allowing agents to be added or removed without major refactoring.",
              "Real-Time Communication: Smooth interaction via WebSockets for notifications and real-time dialogue.",
            ],
      stack: ["Django", "CrewAI", "Celery", "Redis", "PostgreSQL", "PGVector", "Django-channels"],
    },
    {
      id: "suivi-chantiers",
      title:
        language === "fr" ? "Plateforme numérique de suivi de Chantiers BTP" : "Construction Site Monitoring Platform",
      icon: <Server className="w-10 h-10 mx-auto" />,
      accroche:
        language === "fr"
          ? "Une source de vérité unique et fiable pour centraliser et structurer les données de chantier."
          : "A single, reliable source of truth to centralize and structure construction site data.",
      contexte:
        language === "fr"
          ? "Le secteur du BTP au Cameroun, moteur clé de l’économie soutenu par la diaspora, est confronté à de sérieux défis : insécurité foncière, difficultés de financement, mauvaise gestion à distance et manque de transparence. Ces problèmes provoquent retards, dérives budgétaires et pertes de confiance. D'où la nécessité d’une solution technologique locale pour un meilleur suivi des chantiers, la sécurisation des transactions foncières et l’accès facilité au financement."
          : "The construction sector in Cameroon, a key driver of the economy supported by the diaspora, faces major challenges: insecure land ownership, financing issues, poor remote project management, and low financial transparency. These issues lead to delays, budget overruns, and investor distrust. This highlights the need for a local tech solution to ensure reliable project tracking, secure land transactions, and easier access to funding.",
      role:
        language === "fr"
          ? "J'ai développé le backend de cette plateforme, en me concentrant sur la modélisation d'une base de données robuste et la création d'API sécurisées. Mon travail a été la fondation sur laquelle le module IA a ensuite pu s'appuyer."
          : "I developed the backend of this platform, focusing on modeling a robust database and creating secure APIs. My work was the foundation on which the IA Module could then rely.",
      solution:
        language === "fr"
          ? [
              "Modélisation des Données: Schéma de base de données complet sur PostgreSQL avec PostGIS pour la géolocalisation.",
              "API RESTful: API complète avec Django Rest Framework pour une manipulation sécurisée des données.",
              "Intégration et Fiabilité: Mécanismes de validation pour garantir l'intégrité et la cohérence des données.",
            ]
          : [
              "Data Modeling: Complete database schema on PostgreSQL with PostGIS for geolocation.",
              "RESTful API: Complete API with Django Rest Framework for secure data manipulation.",
              "Integration and Reliability: Validation mechanisms to ensure data integrity and consistency.",
            ],
      stack: ["Django", "Django Rest Framework", "PostgreSQL", "PostGIS"],
    },
    {
      id: "auth-system",
      title:
        language === "fr"
          ? "Système d'Authentification Sécurisé et Réutilisable"
          : "Secure and Reusable Authentication System",
      icon: <Shield className="w-10 h-10 mx-auto" />,
      accroche:
        language === "fr"
          ? "Une fondation de sécurité réutilisable pour vos applications, intégrant OAuth 2.0, JWT et une gestion fine des permissions."
          : "A reusable security foundation for your applications, integrating OAuth 2.0, JWT and fine-grained permission management.",
      contexte:
        language === "fr"
          ? "Face aux risques de sécurité et à la duplication de code, il était crucial de développer un système d'authentification centralisé, modulaire et sécurisé pour Django, répondant aux exigences modernes."
          : "Faced with security risks and code duplication, it was crucial to develop a centralized, modular and secure authentication system for Django, meeting modern requirements.",
      role:
        language === "fr"
          ? "En tant que developpeur backend, j'ai conçu et développé ce module d'authentification universel, pensé comme un sous-système indépendant et facilement intégrable."
          : "As a backend developper, I designed and developed this universal authentication module, conceived as an independent and easily integrable subsystem.",
      solution:
        language === "fr"
          ? [
              "Architecture Modulaire et Sécurisée: Application Django découplée avec authentification robuste (bcrypt, JWT, 2FA), déployable en microservice.",
              "Support OAuth 2.0 & SSO: Intégration complète de `django-oauth-toolkit` et `social-auth-app-django` pour la délégation d'accès et l'authentification via des tiers.",
              "Gestion Fine des Rôles (RBAC): Système de permissions granulaires et contextuelles pour contrôler précisément l'accès aux ressources.",
              "API et Intégration Facilitée: API RESTful avec documentation auto-générée (Swagger) pour une interopérabilité simplifiée.",
            ]
          : [
              "Modular and Secure Architecture: Decoupled Django application with robust authentication (bcrypt, JWT, 2FA), deployable as microservice.",
              "OAuth 2.0 & SSO Support: Complete integration of `django-oauth-toolkit` and `social-auth-app-django` for access delegation and third-party authentication.",
              "Fine Role Management (RBAC): Granular and contextual permission system to precisely control resource access.",
              "API and Facilitated Integration: RESTful API with auto-generated documentation (Swagger) for simplified interoperability.",
            ],
      stack: ["Django", "DRF", "SimpleJWT", "OAuth-Toolkit", "Social-Auth", "PostgreSQL"],
    },
    {
      id: "messagerie",
      title: language === "fr" ? "Application de Messagerie interne sur réseau local" : "Internal LAN Chat Application",
      icon: <MessageSquare className="w-10 h-10 mx-auto" />,
      accroche:
        language === "fr"
          ? "Une messagerie distribuée, fluide et fiable, pensée pour les réseaux internes."
          : "A distributed architecture ensuring smooth, reliable messaging on local networks.",
      contexte:
        language === "fr"
          ? "Dans le cadre de l'amélioration de la communication interne, une structure locale souhaite mettre en place une application de messagerie instantanée hébergée sur un serveur interne, accessible via son réseau local. Cette solution vise à garantir la continuité, l'intégrité et la confidentialité des échanges professionnels entre les employés, y compris en cas de coupure de la connexion Internet. L'application sera exclusivement utilisée durant les heures de travail pour centraliser et sécuriser les communications internes."
          : "As part of its internal communication improvement strategy, a local organization aims to deploy an instant messaging application hosted on an internal server within its local area network. The goal is to ensure the continuity, integrity, and confidentiality of professional exchanges between employees—even in the event of internet outages. The application will be used exclusively during working hours to centralize and secure internal communications.",
      role:
        language === "fr"
          ? "Responsable de la mise en œuvre complète du backend, incluant l’intégration d’un module d’authentification maison et la configuration d’une architecture temps réel sur réseau local, assurant des échanges fluides et fiables via WebSockets. L’application a été déployée sur un serveur interne, garantissant résilience et autonomie du système même en cas de coupure Internet."
          : "Responsible for the complete implementation of the backend, including the integration of a custom-built authentication module and the setup of a real-time architecture over a local network, ensuring smooth and reliable communication via WebSockets. The application was deployed on an internal server, providing resilience and system autonomy even in the event of Internet outages.",
      solution:
        language === "fr"
          ? [
              "Architecture hybride : Django est utilisé pour la gestion des fonctionnalités classiques, tandis que Django Channels prend en charge la communication en temps réel via WebSockets.",
              "Distribution des messages : Redis sert de bus de messages en mode pub/sub, permettant une scalabilité horizontale efficace.",
              "Stockage optimisé : Les messages sont persistés dans MongoDB pour sa rapidité en écriture, tandis que PostgreSQL gère les données relationnelles (utilisateurs, permissions, etc.).",
            ]
          : [
              "Hybrid Architecture: Django handles traditional backend logic, while Django Channels manages real-time communication via WebSockets.",
              "Message Distribution: Redis acts as a pub/sub message bus, enabling efficient horizontal scalability.",
              "Optimized Storage: Messages are persisted in MongoDB for its fast write performance, while relational data is stored in PostgreSQL.",
            ],
      stack: ["Django", "Channels", "Redis", "MongoDB", "PostgreSQL", "Celery"],
    },
  ]

  // Function to navigate to a specific project
  const navigateToProject = (projectId: string) => {
    setTargetProjectId(projectId)
    setCurrentPage("projets")
  }

  // Effect to scroll to target project when projects page loads
  useEffect(() => {
    if (currentPage === "projets" && targetProjectId) {
      const timer = setTimeout(() => {
        const element = document.getElementById(`project-${targetProjectId}`)
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
          // Add highlight effect
          element.classList.add("highlight-project")
          setTimeout(() => {
            element.classList.remove("highlight-project")
          }, 3000)
        }
        setTargetProjectId(null)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [currentPage, targetProjectId])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("sending")

    try {
      // Configuration EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "jamesnyemeck@gmail.com",
        reply_to: formData.email,
      }

      // Envoyer l'email via EmailJS
      await emailjs.send(
        "service_u37cj2f", // Remplacez par votre Service ID
        "template_lz02wi8", // Remplacez par votre Template ID
        templateParams,
        "weZIVPFCf29y_pUwy", // Remplacez par votre Public Key
      )

      setFormStatus("success")
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setFormStatus("idle"), 5000)
    } catch (error) {
      console.error("Erreur EmailJS:", error)
      setFormStatus("error")
      setTimeout(() => setFormStatus("idle"), 5000)
    }
  }

  // Initialiser EmailJS
  useEffect(() => {
    emailjs.init("YOUR_PUBLIC_KEY") // Remplacez par votre Public Key
  }, [])

  const renderHomePage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8 overflow-hidden">
        {/* Background Effects - Fixed z-index */}
        <div className="absolute inset-0 -z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-pink-500/15 to-blue-500/10 rounded-full blur-2xl animate-float"></div>
        </div>
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-22 text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 dark:bg-blue-400/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8 animate-bounce-gentle border border-blue-200 dark:border-blue-800">
              <Sparkles className="w-4 h-4" />
              {t("backendEngineer")}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                {t("heroTitle")}
              </span>
            </h1>
            <p className="mt-8 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("heroSubtitle")}
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage("projets")}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("discoverProjects")}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>

              <a
                href="/NYEMECK'S CV.pdf"
                download
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  {t("downloadCV")}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </a>

              <button
                onClick={() => setCurrentPage("contact")}
                className="group px-8 py-4 text-sm font-semibold text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-full hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 backdrop-blur-sm"
              >
                {t("contactMe")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold leading-8 text-gray-900 dark:text-white sm:text-4xl">
              {t("featuredProjects")}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t("featuredProjectsSubtitle")}</p>
          </div>
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-start gap-8 sm:max-w-xl sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {projects.slice(0, 4).map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 flex flex-col h-full border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-blue-600 dark:text-blue-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 group-hover:scale-110 transform">
                    {project.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-base text-gray-600 dark:text-gray-300 flex-grow leading-relaxed">
                    {project.accroche}
                  </p>
                  <button
                    onClick={() => navigateToProject(project.id)}
                    className="mt-6 text-blue-600 dark:text-blue-400 font-semibold flex items-center group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
                  >
                    {t("seeProject")}
                    <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technologies */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold leading-8 text-gray-900 dark:text-white sm:text-4xl">
              {t("technologiesTitle")}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t("technologiesSubtitle")}</p>
          </div>
          <div className="mt-16 flex flex-wrap justify-center items-center gap-6">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className="group flex flex-col items-center gap-3 text-center p-6 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-transparent hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-blue-600 dark:text-blue-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 group-hover:scale-110 transform">
                  {tech.icon}
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderProjectsPage = () => (
    <div className="py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:mx-0 animate-fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t("myRealizations")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">{t("projectsDescription")}</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-1">
          {projects.map((project, index) => (
            <article
              key={project.id}
              id={`project-${project.id}`}
              className="group flex flex-col items-start justify-between bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 animate-fade-in-up overflow-hidden relative"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-full relative z-10">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={new Date().toISOString()} className="text-gray-500 dark:text-gray-400">
                    {t("recentProject")}
                  </time>
                  <div className="relative z-10 rounded-full bg-blue-500/10 dark:bg-blue-400/20 px-3 py-1.5 font-medium text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/20 dark:group-hover:bg-blue-400/30 transition-colors duration-300">
                    {t("backendEngineering")}
                  </div>
                </div>
                <div className="group-project relative">
                  <h3 className="mt-3 text-2xl font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="mt-8 space-y-6">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                        {t("context")}
                      </h4>
                      <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{project.contexte}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                        {t("myRole")}
                      </h4>
                      <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{project.role}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-blue-500 rounded-full"></div>
                        {t("technicalSolution")}
                      </h4>
                      <ul className="mt-2 space-y-3 text-base leading-7 text-gray-600 dark:text-gray-300">
                        {project.solution.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 flex-shrink-0"></div>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-pink-500 rounded-full"></div>
                    {t("techStack")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full bg-blue-500/10 dark:bg-blue-400/20 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-200 dark:ring-blue-800 hover:bg-blue-500/20 dark:hover:bg-blue-400/30 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAboutPage = () => (
    <div className="py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-16">
          <div className="lg:col-span-1 animate-fade-in-up">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <img
                className="relative h-80 w-80 rounded-full object-cover mx-auto shadow-2xl border-4 border-blue-200 dark:border-blue-800 group-hover:border-blue-400 dark:group-hover:border-blue-600 transition-all duration-500"
                src="photo-pro.jpg"
                alt="Photo de profil"
              />
            </div>
            <h2 className="mt-8 text-3xl font-bold text-center text-gray-900 dark:text-white">{t("myStory")}</h2>
          </div>
          <div className="lg:col-span-2 space-y-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
              {language === "fr"
                ? "Initialement fasciné par la mécanique abstraite des systèmes complexes, j'ai toujours cherché à comprendre comment les différents composants d'un ensemble interagissent pour former un tout cohérent. C'est dans cet état d'esprit que, fort de mon baccalauréat C obtenu avec mention Bien au lycée scientifique de Bertoua, j'intègre dans un premier temps la Faculté des Sciences de l'Université de Yaoundé I, en filière informatique, où j'obtiens une licence en Génie Logiciel, avant de poursuivre à l'École Nationale Supérieure Polytechnique de Yaoundé où je décroche un diplôme d'ingénieur de conception en informatique."
                : "Initially fascinated by the abstract mechanics of complex systems, I have always sought to understand how the different components of a whole interact to create a coherent system. With this mindset, and after earning my Baccalauréat C with honors from the Bertoua Science High School, I first enrolled in the Faculty of Science at the University of Yaoundé I, majoring in computer science, where I obtained a Bachelor's degree in Software Engineering. I then continued my studies at the National Advanced School of Engineering of Yaounde, where I earned an Engineering degree in Computer Science."}
            </p>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
              {language === "fr"
                ? "Porté par une passion pour l'informatique née dès l'enfance, je me suis naturellement orienté vers des filières liées aux systèmes et au développement logiciel. Lors d'un cours de génie logiciel à l'École Polytechnique, dispensé par le Pr. Kouamou Georges, j'ai eu une révélation : j'ai compris que la véritable élégance d'un logiciel ne résidait pas uniquement dans la qualité de son code, mais dans la pureté et la cohérence de son architecture."
                : "Driven by a passion for computer science that began in childhood, I naturally gravitated toward fields related to systems and software development. During a software engineering course at the Polytechnic School, taught by Professor Kouamou Georges, I had a revelation: I realized that the true elegance of a software system lies not only in the quality of its code, but in the clarity and coherence of its architecture."}
            </p>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
              {language === "fr"
                ? "Depuis, ma démarche est claire : penser l'architecture avant la technologie. Car c'est dans cette abstraction que réside le premier indicateur de performance, de robustesse et d'évolutivité d'une solution."
                : "Since then, my approach has been clear: think architecture before thinking technology. It is within this level of abstraction that the first indicators of a solution's performance, robustness, and scalability can be found."}
            </p>
          </div>
        </div>
        <div className="mt-24">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">{t("workPhilosophy")}</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t("philosophySubtitle")}</p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 animate-fade-in-up overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {t("architecturalRigor")}
                </h3>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t("architecturalRigorText")}
                </p>
              </div>
            </div>
            <div
              className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 animate-fade-in-up overflow-hidden relative"
              style={{ animationDelay: "200ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                  {t("aiLeverage")}
                </h3>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300 leading-relaxed">{t("aiLeverageText")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContactPage = () => (
    <div className="relative isolate py-24 sm:py-32 min-h-screen">
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
            <img
              className="absolute inset-0 h-full w-full object-cover mix-blend-overlay"
              src="/placeholder.svg?height=600&width=800"
              alt="Contact background"
            />
            <div className="relative flex items-center justify-center p-12 h-full min-h-[500px]">
              <div className="text-white text-center animate-fade-in-up">
                <h2 className="text-4xl font-bold tracking-tight">{t("discussProject")}</h2>
                <p className="mt-6 text-lg leading-8 opacity-90">{t("contactDescription")}</p>
                <div className="mt-10 flex justify-center space-x-6">
                  <a
                    href="mailto:jamesnyemeck@gmail.com"
                    className="group p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                  >
                    <Mail className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-24 sm:py-32 lg:px-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <div className="mx-auto max-w-xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{t("sendMessage")}</h3>

            {formStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-800 dark:text-green-200 flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  {t("messageSent")}
                </p>
              </div>
            )}

            {formStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-800 dark:text-red-200">{t("messageError")}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {t("fullName")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder={t("yourName")}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder={t("yourEmail")}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder={t("describeProject")}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {formStatus === "sending" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t("sending")}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t("sendMessageBtn")}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPage = () => {
    switch (currentPage) {
      case "accueil":
        return renderHomePage()
      case "projets":
        return renderProjectsPage()
      case "a-propos":
        return renderAboutPage()
      case "contact":
        return renderContactPage()
      default:
        return renderHomePage()
    }
  }

  return (
    <div className="font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  NYEMECK James
                </span>
              </div>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      currentPage === item.id
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {item.name}
                    {currentPage === item.id && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
                    )}
                  </button>
                ))}
              </div>
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                aria-label="Toggle language"
              >
                <Languages className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="ml-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                  {language.toUpperCase()}
                </span>
              </button>
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                aria-label="Toggle language"
              >
                <Languages className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-all duration-300"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
              <div className="flex flex-col space-y-2 pt-4">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`px-4 py-3 rounded-lg font-medium text-left transition-all duration-300 ${
                      currentPage === item.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="transition-all duration-300">{renderPage()}</main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 py-12 px-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} NYEMECK James {t("allRightsReserved")}.
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="mailto:jamesnyemeck@gmail.com"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/votre-profil"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/votre-profil"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
