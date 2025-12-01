
import { Subject } from './types';

export const SUBJECTS: Subject[] = [
  {
    id: 'physics',
    name: 'Physics',
    icon: 'Atom',
    color: 'from-blue-500 to-indigo-600',
    chapters: [
      {
        id: 'phy-01',
        name: 'Physics and Measurement',
        topics: [
          { id: 'phy-01-01', name: 'SI Units & Dimensions' },
          { id: 'phy-01-02', name: 'Errors in Measurement' },
          { id: 'phy-01-03', name: 'Vernier Calipers & Screw Gauge' }
        ]
      },
      {
        id: 'phy-02',
        name: 'Kinematics',
        topics: [
          { id: 'phy-02-01', name: 'Motion in a Straight Line' },
          { id: 'phy-02-02', name: 'Projectile Motion' },
          { id: 'phy-02-03', name: 'Relative Velocity' }
        ]
      },
      {
        id: 'phy-03',
        name: 'Laws of Motion',
        topics: [
          { id: 'phy-03-01', name: 'Newtons Laws' },
          { id: 'phy-03-02', name: 'Friction' },
          { id: 'phy-03-03', name: 'Circular Motion Dynamics' }
        ]
      },
      {
        id: 'phy-04',
        name: 'Work, Energy and Power',
        topics: [
          { id: 'phy-04-01', name: 'Work-Energy Theorem' },
          { id: 'phy-04-02', name: 'Collisions' },
          { id: 'phy-04-03', name: 'Vertical Circular Motion' }
        ]
      },
      {
        id: 'phy-05',
        name: 'Rotational Motion',
        topics: [
          { id: 'phy-05-01', name: 'Centre of Mass' },
          { id: 'phy-05-02', name: 'Moment of Inertia' },
          { id: 'phy-05-03', name: 'Torque & Angular Momentum' }
        ]
      },
      {
        id: 'phy-06',
        name: 'Gravitation',
        topics: [
          { id: 'phy-06-01', name: 'Keplers Laws' },
          { id: 'phy-06-02', name: 'Gravitational Potential' },
          { id: 'phy-06-03', name: 'Satellite Motion' }
        ]
      },
      {
        id: 'phy-07',
        name: 'Properties of Solids and Liquids',
        topics: [
          { id: 'phy-07-01', name: 'Elasticity (Hookes Law)' },
          { id: 'phy-07-02', name: 'Fluid Mechanics (Bernoullis)' },
          { id: 'phy-07-03', name: 'Viscosity & Surface Tension' },
          { id: 'phy-07-04', name: 'Thermal Properties' }
        ]
      },
      {
        id: 'phy-08',
        name: 'Thermodynamics',
        topics: [
          { id: 'phy-08-01', name: 'First Law' },
          { id: 'phy-08-02', name: 'Isothermal & Adiabatic Processes' },
          { id: 'phy-08-03', name: 'Second Law' }
        ]
      },
      {
        id: 'phy-09',
        name: 'Kinetic Theory of Gases',
        topics: [
          { id: 'phy-09-01', name: 'Ideal Gas Equation' },
          { id: 'phy-09-02', name: 'Law of Equipartition of Energy' },
          { id: 'phy-09-03', name: 'RMS Speed' }
        ]
      },
      {
        id: 'phy-10',
        name: 'Oscillations and Waves',
        topics: [
          { id: 'phy-10-01', name: 'SHM Equation' },
          { id: 'phy-10-02', name: 'Spring & Pendulum Systems' },
          { id: 'phy-10-03', name: 'Wave Superposition & Beats' },
          { id: 'phy-10-04', name: 'Doppler Effect' }
        ]
      },
      {
        id: 'phy-11',
        name: 'Electrostatics',
        topics: [
          { id: 'phy-11-01', name: 'Coulombs Law & Electric Field' },
          { id: 'phy-11-02', name: 'Gauss Law Applications' },
          { id: 'phy-11-03', name: 'Capacitors & Dielectrics' }
        ]
      },
      {
        id: 'phy-12',
        name: 'Current Electricity',
        topics: [
          { id: 'phy-12-01', name: 'Drift Velocity & Ohms Law' },
          { id: 'phy-12-02', name: 'Kirchhoffs Laws' },
          { id: 'phy-12-03', name: 'Measuring Instruments' }
        ]
      },
      {
        id: 'phy-13',
        name: 'Magnetic Effects of Current',
        topics: [
          { id: 'phy-13-01', name: 'Biot-Savart & Amperes Law' },
          { id: 'phy-13-02', name: 'Force on Moving Charge' },
          { id: 'phy-13-03', name: 'Magnetic Properties of Matter' }
        ]
      },
      {
        id: 'phy-14',
        name: 'EMI and AC',
        topics: [
          { id: 'phy-14-01', name: 'Faradays & Lenzs Law' },
          { id: 'phy-14-02', name: 'Inductance' },
          { id: 'phy-14-03', name: 'LCR Circuits & Resonance' }
        ]
      },
      {
        id: 'phy-15',
        name: 'Electromagnetic Waves',
        topics: [
          { id: 'phy-15-01', name: 'EM Spectrum' },
          { id: 'phy-15-02', name: 'Displacement Current' }
        ]
      },
      {
        id: 'phy-16',
        name: 'Optics',
        topics: [
          { id: 'phy-16-01', name: 'Ray Optics: Mirrors & Lenses' },
          { id: 'phy-16-02', name: 'Prisms & Optical Instruments' },
          { id: 'phy-16-03', name: 'Wave Optics: Interference & Diffraction' }
        ]
      },
      {
        id: 'phy-17',
        name: 'Dual Nature of Matter',
        topics: [
          { id: 'phy-17-01', name: 'Photoelectric Effect' },
          { id: 'phy-17-02', name: 'De Broglie Hypothesis' }
        ]
      },
      {
        id: 'phy-18',
        name: 'Atoms and Nuclei',
        topics: [
          { id: 'phy-18-01', name: 'Bohr Model' },
          { id: 'phy-18-02', name: 'Binding Energy' },
          { id: 'phy-18-03', name: 'Radioactivity & Fission/Fusion' }
        ]
      },
      {
        id: 'phy-19',
        name: 'Electronic Devices',
        topics: [
          { id: 'phy-19-01', name: 'Semiconductor Basics' },
          { id: 'phy-19-02', name: 'P-N Junction Diode' },
          { id: 'phy-19-03', name: 'Logic Gates' }
        ]
      },
      {
        id: 'phy-20',
        name: 'Experimental Skills',
        topics: [
          { id: 'phy-20-01', name: 'Vernier/Screw Gauge Experiments' },
          { id: 'phy-20-02', name: 'Resonance Tube & Pendulum' },
          { id: 'phy-20-03', name: 'Electrical Experiments' }
        ]
      }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: 'FlaskConical',
    color: 'from-purple-500 to-fuchsia-600',
    chapters: [
      // Physical Chemistry
      {
        id: 'chem-01',
        name: 'Some Basic Concepts',
        topics: [
          { id: 'chem-01-01', name: 'Mole Concept' },
          { id: 'chem-01-02', name: 'Stoichiometry' }
        ]
      },
      {
        id: 'chem-02',
        name: 'Atomic Structure',
        topics: [
          { id: 'chem-02-01', name: 'Bohr Model & Spectrum' },
          { id: 'chem-02-02', name: 'Quantum Numbers' },
          { id: 'chem-02-03', name: 'Electronic Config' }
        ]
      },
      {
        id: 'chem-03',
        name: 'Chemical Bonding',
        topics: [
          { id: 'chem-03-01', name: 'VSEPR Theory' },
          { id: 'chem-03-02', name: 'Hybridization' },
          { id: 'chem-03-03', name: 'MOT' }
        ]
      },
      {
        id: 'chem-04',
        name: 'Chemical Thermodynamics',
        topics: [
          { id: 'chem-04-01', name: 'First Law & Enthalpy' },
          { id: 'chem-04-02', name: 'Hess Law' },
          { id: 'chem-04-03', name: 'Entropy & Gibbs Energy' }
        ]
      },
      {
        id: 'chem-05',
        name: 'Solutions',
        topics: [
          { id: 'chem-05-01', name: 'Concentration Terms' },
          { id: 'chem-05-02', name: 'Raoults Law' },
          { id: 'chem-05-03', name: 'Colligative Properties' }
        ]
      },
      {
        id: 'chem-06',
        name: 'Equilibrium',
        topics: [
          { id: 'chem-06-01', name: 'Le Chateliers Principle' },
          { id: 'chem-06-02', name: 'pH & Buffer Solutions' },
          { id: 'chem-06-03', name: 'Solubility Product' }
        ]
      },
      {
        id: 'chem-07',
        name: 'Redox & Electrochemistry',
        topics: [
          { id: 'chem-07-01', name: 'Oxidation Numbers' },
          { id: 'chem-07-02', name: 'Nernst Equation' },
          { id: 'chem-07-03', name: 'Conductance' }
        ]
      },
      {
        id: 'chem-08',
        name: 'Chemical Kinetics',
        topics: [
          { id: 'chem-08-01', name: 'Rate Laws' },
          { id: 'chem-08-02', name: 'Activation Energy' }
        ]
      },
      // Inorganic
      {
        id: 'chem-09',
        name: 'Classification of Elements',
        topics: [
          { id: 'chem-09-01', name: 'Periodic Trends' },
          { id: 'chem-09-02', name: 'Ionization & Electronegativity' }
        ]
      },
      {
        id: 'chem-10',
        name: 'p-Block Elements',
        topics: [
          { id: 'chem-10-01', name: 'Group 13 & 14' },
          { id: 'chem-10-02', name: 'Group 15, 16, 17, 18' },
          { id: 'chem-10-03', name: 'Trends & Compounds' }
        ]
      },
      {
        id: 'chem-11',
        name: 'd- and f- Block Elements',
        topics: [
          { id: 'chem-11-01', name: 'Transition Elements Trends' },
          { id: 'chem-11-02', name: 'KMnO4 & K2Cr2O7' },
          { id: 'chem-11-03', name: 'Lanthanoids & Actinoids' }
        ]
      },
      {
        id: 'chem-12',
        name: 'Co-ordination Compounds',
        topics: [
          { id: 'chem-12-01', name: 'IUPAC Nomenclature' },
          { id: 'chem-12-02', name: 'VBT & CFT' },
          { id: 'chem-12-03', name: 'Isomerism' }
        ]
      },
      // Organic
      {
        id: 'chem-13',
        name: 'Purification & Characterisation',
        topics: [
          { id: 'chem-13-01', name: 'Chromatography & Distillation' },
          { id: 'chem-13-02', name: 'Qualitative Analysis' }
        ]
      },
      {
        id: 'chem-14',
        name: 'Basic Principles of Organic',
        topics: [
          { id: 'chem-14-01', name: 'IUPAC Nomenclature' },
          { id: 'chem-14-02', name: 'Electronic Effects' },
          { id: 'chem-14-03', name: 'Isomerism' }
        ]
      },
      {
        id: 'chem-15',
        name: 'Hydrocarbons',
        topics: [
          { id: 'chem-15-01', name: 'Alkanes, Alkenes, Alkynes' },
          { id: 'chem-15-02', name: 'Aromatic Hydrocarbons' }
        ]
      },
      {
        id: 'chem-16',
        name: 'Organic w/ Halogens',
        topics: [
          { id: 'chem-16-01', name: 'Haloalkanes & Haloarenes' },
          { id: 'chem-16-02', name: 'SN1 & SN2 Mechanisms' }
        ]
      },
      {
        id: 'chem-17',
        name: 'Organic w/ Oxygen',
        topics: [
          { id: 'chem-17-01', name: 'Alcohols, Phenols, Ethers' },
          { id: 'chem-17-02', name: 'Aldehydes & Ketones' },
          { id: 'chem-17-03', name: 'Carboxylic Acids' }
        ]
      },
      {
        id: 'chem-18',
        name: 'Organic w/ Nitrogen',
        topics: [
          { id: 'chem-18-01', name: 'Amines' },
          { id: 'chem-18-02', name: 'Diazonium Salts' }
        ]
      },
      {
        id: 'chem-19',
        name: 'Biomolecules',
        topics: [
          { id: 'chem-19-01', name: 'Carbohydrates' },
          { id: 'chem-19-02', name: 'Proteins & Vitamins' },
          { id: 'chem-19-03', name: 'Nucleic Acids' }
        ]
      },
      {
        id: 'chem-20',
        name: 'Practical Chemistry',
        topics: [
          { id: 'chem-20-01', name: 'Salt Analysis' },
          { id: 'chem-20-02', name: 'Titrations' }
        ]
      }
    ]
  },
  {
    id: 'botany',
    name: 'Botany',
    icon: 'Leaf',
    color: 'from-emerald-500 to-teal-600',
    chapters: [
      {
        id: 'bot-01',
        name: 'Diversity in Living World',
        topics: [
          { id: 'bot-01-01', name: 'Biological Classification' },
          { id: 'bot-01-02', name: 'Plant Kingdom' }
        ]
      },
      {
        id: 'bot-02',
        name: 'Structural Org in Plants',
        topics: [
          { id: 'bot-02-01', name: 'Morphology of Flowering Plants' },
          { id: 'bot-02-02', name: 'Anatomy of Flowering Plants' }
        ]
      },
      {
        id: 'bot-03',
        name: 'Cell: Structure & Function',
        topics: [
          { id: 'bot-03-01', name: 'Cell Organelles' },
          { id: 'bot-03-02', name: 'Biomolecules' },
          { id: 'bot-03-03', name: 'Cell Cycle & Division' }
        ]
      },
      {
        id: 'bot-04',
        name: 'Plant Physiology',
        topics: [
          { id: 'bot-04-01', name: 'Photosynthesis' },
          { id: 'bot-04-02', name: 'Respiration in Plants' },
          { id: 'bot-04-03', name: 'Plant Growth & Development' }
        ]
      },
      {
        id: 'bot-05',
        name: 'Reproduction in Plants',
        topics: [
          { id: 'bot-05-01', name: 'Sexual Reproduction in Flowering Plants' }
        ]
      },
      {
        id: 'bot-06',
        name: 'Genetics',
        topics: [
          { id: 'bot-06-01', name: 'Principles of Inheritance' },
          { id: 'bot-06-02', name: 'Molecular Basis of Inheritance' }
        ]
      },
      {
        id: 'bot-07',
        name: 'Ecology',
        topics: [
          { id: 'bot-07-01', name: 'Organisms & Populations' },
          { id: 'bot-07-02', name: 'Ecosystem' },
          { id: 'bot-07-03', name: 'Biodiversity & Conservation' }
        ]
      }
    ]
  },
  {
    id: 'zoology',
    name: 'Zoology',
    icon: 'Skull', 
    color: 'from-orange-500 to-red-600',
    chapters: [
      {
        id: 'zoo-01',
        name: 'Animal Kingdom',
        topics: [
          { id: 'zoo-01-01', name: 'Classification of Animals' }
        ]
      },
      {
        id: 'zoo-02',
        name: 'Structural Org in Animals',
        topics: [
          { id: 'zoo-02-01', name: 'Animal Tissues' },
          { id: 'zoo-02-02', name: 'Frog (Brief Account)' }
        ]
      },
      {
        id: 'zoo-03',
        name: 'Human Physiology',
        topics: [
          { id: 'zoo-03-01', name: 'Breathing & Exchange' },
          { id: 'zoo-03-02', name: 'Body Fluids & Circulation' },
          { id: 'zoo-03-03', name: 'Excretory Products' },
          { id: 'zoo-03-04', name: 'Locomotion & Movement' },
          { id: 'zoo-03-05', name: 'Neural Control' },
          { id: 'zoo-03-06', name: 'Chemical Coordination' }
        ]
      },
      {
        id: 'zoo-04',
        name: 'Human Reproduction',
        topics: [
          { id: 'zoo-04-01', name: 'Reproductive System' },
          { id: 'zoo-04-02', name: 'Reproductive Health' }
        ]
      },
      {
        id: 'zoo-05',
        name: 'Evolution',
        topics: [
          { id: 'zoo-05-01', name: 'Origin of Life & Evidence' },
          { id: 'zoo-05-02', name: 'Mechanism of Evolution' }
        ]
      },
      {
        id: 'zoo-06',
        name: 'Human Welfare',
        topics: [
          { id: 'zoo-06-01', name: 'Human Health & Disease' },
          { id: 'zoo-06-02', name: 'Microbes in Human Welfare' }
        ]
      },
      {
        id: 'zoo-07',
        name: 'Biotechnology',
        topics: [
          { id: 'zoo-07-01', name: 'Principles & Processes' },
          { id: 'zoo-07-02', name: 'Applications in Health & Ag' }
        ]
      }
    ]
  }
];

export const UI_TEXT = {
  en: {
    selectChapters: "Select Chapters",
    from: "Choose chapters from",
    selectTopics: "Select Topics",
    continueSetup: "Continue to Setup",
    configure: "Configure Practice",
    customize: "Customize your AI-generated session.",
    numQuestions: "Number of Questions",
    customInst: "Custom Instructions (Optional)",
    customPlaceholder: "e.g. Focus on numerical problems...",
    startQuiz: "Start AI Quiz",
    generating: "Generating Questions...",
    prev: "Prev",
    next: "Next",
    submit: "Submit Test",
    swipe: "Swipe left/right to navigate",
    complete: "Quiz Complete!",
    performance: "Here is how you performed on this practice session.",
    accuracy: "Accuracy",
    totalQ: "Total Questions",
    correct: "Correct Answers",
    verdict: "Verdict",
    excellent: "Excellent Mastery!",
    good: "Good Job, Keep Practicing.",
    needsWork: "Needs More Revision.",
    review: "Review Explanations",
    yourAns: "Your Answer:",
    correctIs: "Correct:",
    home: "Home",
    practiceAgain: "Practice Again",
    vipDoubts: "VIP Doubts",
    accessVip: "Access vipDOUBTS"
  },
  hi: {
    selectChapters: "अध्याय चुनें",
    from: "अध्याय का चयन करें:",
    selectTopics: "विषय चुनें",
    continueSetup: "सेटअप जारी रखें",
    configure: "अभ्यास कॉन्फ़िगर करें",
    customize: "अपने AI सत्र को अनुकूलित करें।",
    numQuestions: "प्रश्नों की संख्या",
    customInst: "कस्टम निर्देश (वैकल्पिक)",
    customPlaceholder: "जैसे: संख्यात्मक समस्याओं पर ध्यान दें...",
    startQuiz: "AI क्विज़ शुरू करें",
    generating: "प्रश्न तैयार हो रहे हैं...",
    prev: "पिछला",
    next: "अगला",
    submit: "टेस्ट जमा करें",
    swipe: "नेविगेट करने के लिए स्वाइप करें",
    complete: "क्विज़ पूर्ण!",
    performance: "इस सत्र में आपका प्रदर्शन।",
    accuracy: "सटीकता",
    totalQ: "कुल प्रश्न",
    correct: "सही उत्तर",
    verdict: "निर्णय",
    excellent: "उत्कृष्ट पकड़!",
    good: "अच्छा काम, अभ्यास जारी रखें।",
    needsWork: "और दोहराने की जरूरत है।",
    review: "स्पष्टीकरण देखें",
    yourAns: "आपका उत्तर:",
    correctIs: "सही:",
    home: "होम",
    practiceAgain: "पुनः अभ्यास करें",
    vipDoubts: "VIP डाउट",
    accessVip: "VIP डाउट पूछें"
  }
};
