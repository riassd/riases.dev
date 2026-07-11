export const featuredProject = {
  index: '01',
  name: 'ControllerNAV',
  tagline: 'Controla Windows y el navegador con tu mando, como si fuera un ratón y un teclado.',
  description:
    'Aplicación de escritorio (Electron + Node.js) que convierte cualquier mando XInput ' +
    '(8BitDo, Xbox, PlayStation vía DS4Windows, Switch Pro…) en un dispositivo completo de ' +
    'navegación: ratón con curva de aceleración, teclado en pantalla con predicción de texto, ' +
    'perfiles por aplicación, combos configurables, modo juego con passthrough automático y ' +
    'vibración háptica por USB, 2.4G y Bluetooth.',
  tech: ['Electron', 'Node.js', 'PowerShell / Win32 API', 'SDL2', 'XInput'],
  highlights: [
    'Ratón completo con arrastrar y soltar, scroll y curva de aceleración',
    'Teclado en pantalla con predicción de palabras',
    'Perfiles por aplicación y por tipo de mando',
    'Modo Juego (passthrough) manual o automático en pantalla completa',
    'Vibración/feedback háptico configurable',
  ],
  repoUrl: 'https://github.com/riassd/controllernav',
  releasesUrl: 'https://github.com/riassd/controllernav/releases',
  private: true,
}

// Añade aquí tus próximos proyectos. `repoUrl: null` o `private: true`
// muestra una tarjeta sin enlace directo al repo.
export const otherProjects = [
  {
    index: '02',
    name: 'Sinergy Inventario',
    tagline: 'Sistema de inventario, órdenes de compra y aprobaciones para una empresa real.',
    description:
      'PWA para Sinergy Soluciones Integrales con control de acceso por roles, registro de ' +
      'auditoría de cada acción, extracción de datos desde PDFs con IA, y un flujo de ' +
      'aprobación de órdenes de compra por correo con tokens de un solo uso por aprobador ' +
      '(turnos secuenciales, sin reutilización, salida siempre saneada contra XSS).',
    tech: ['JavaScript', 'Supabase / PostgreSQL', 'Vercel Serverless', 'Nodemailer', 'OpenRouter API'],
    repoUrl: 'https://github.com/riassd/sinergy-inventario',
    private: true,
  },
  {
    index: '03',
    name: 'Helperlas Bot',
    tagline: 'Asistente de WhatsApp en Python para crecer como ingeniero en ciberseguridad.',
    description:
      'Bot construido con FastAPI + Twilio que combina lecciones diarias de inglés técnico ' +
      'evaluadas con IA, seguimiento de entrenamiento y estudio, y noticias/precios cripto en COP, ' +
      'con reportes automáticos por WhatsApp y email.',
    tech: ['Python', 'FastAPI', 'Twilio API', 'SQLite', 'Pipeline de IA multi-proveedor (Groq/OpenRouter/Gemini…)'],
    repoUrl: 'https://github.com/riassd/helperlas',
    private: true,
  },
  {
    index: '04',
    name: 'Doble Subtítulo Universal',
    tagline: 'Extensión de navegador para ver un segundo subtítulo traducido sobre el original.',
    description:
      'Extensión Manifest V3 para Chrome/Edge/Brave: superpone una traducción en vivo del ' +
      'subtítulo sobre cualquier video (Crunchyroll, YouTube, cursos…), con múltiples motores de ' +
      'detección en cascada, y traducción completa de páginas web al estilo Linguist.',
    tech: ['JavaScript', 'Chrome Extensions (MV3)'],
    repoUrl: 'https://github.com/riassd/doble-subtitulo-universal',
    private: true,
  },
  {
    index: '05',
    name: 'Mascota Feliz',
    tagline: 'Plataforma web full-stack para adopción y cuidado de mascotas.',
    description:
      'Proyecto full-stack con frontend en Angular y backend en LoopBack 4 (Node.js/TypeScript) ' +
      'sobre MongoDB, siguiendo el patrón MERN/MEAN.',
    tech: ['Angular', 'LoopBack 4', 'Node.js', 'TypeScript', 'MongoDB'],
    links: [
      { label: 'Frontend', url: 'https://github.com/riassd/Website-FrontendMascotas-Mern' },
      { label: 'Backend', url: 'https://github.com/riassd/Website-BackendMascotas-Mern' },
    ],
    private: false,
  },
]
