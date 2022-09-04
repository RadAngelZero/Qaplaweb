
 import inconLOL from './assets/IconLOL.png'
 import iconChat from './assets/iconChat.png'
 import iconGIF from './assets/IconGIF.svg'
 import iconSticker from './assets/IconStickers.png'
 
 import gradientChat from './assets/GradientChat.png'
 import gradientLOL from './assets/GradientLOL.png'
 import gradientSticker from './assets/GradientSticker.png'
 import gradientGifd from './assets/GradientGifs.png'

 import backgroundGitf from './assets/Clips.png' 
 import background from './assets/weekend-party-animal.png'


let prop = [
    
  {
    Title:'Memes',
    imagen:inconLOL,
    background: gradientChat,
   
  },
      
  {
    Title:'Text-to-Speech',
    imagen:iconChat,
    background: gradientLOL,
   
  },
      
  {
    Title:'Stickers',
    imagen:iconSticker,
    background: gradientSticker,
    
  },
      
  {
    Title:'GIFs',
    imagen:iconGIF,
    background: gradientGifd,
  },

]

export let propPagos = [
  {
    title: 'Custom TTS',
    background:backgroundGitf  ,
    Qoins:'200'
  },
  {
    title:'Pre-made clips',
    background: background,
    Qoins:'200'
  }
]

export  default prop;