"use client"


import React from 'react'
import { MdSmartDisplay } from "react-icons/md";
import { ImStop2 } from "react-icons/im";

function StoryPages({storyChapter}:any) {

  const playSpeech=(text:string)=>{
    const synth = window?.speechSynthesis;
    const textToSpeech = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    const voice = voices.find(voice => voice.name === 'en-US-Journey-F') || voices.find(voice => voice.name === 'Google UK English Female') || voices.find(voice => voice.name === 'Google UK English Male') || null;
    textToSpeech.voice = voice;
    synth.speak(textToSpeech);
  }

  const stopSpeech = () => {
    const synth = window?.speechSynthesis;
    synth.cancel();
  }

  return (
    <div className='container'>
      <div className='bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-900 dark:to-slate-900 p-4'>

      <h2 className='text-xl md:text-xl lg:text-2xl font-bold text-white/80 flex justify-between'>{storyChapter?.chapterTitle}
        <div className='flex justify-center'>
        <span className='text-3xl cursor-pointer flex-right text-indigo-900' onClick={()=>playSpeech(storyChapter?.storyText)}><MdSmartDisplay className='size-7'/></span>
        <span className='text-3xl cursor-pointer text-indigo-900' onClick={()=>stopSpeech()}><ImStop2 className='size-7'/></span>
        </div>
      </h2>
      </div>
      {/* story text */}
      <div className='px-4'>
      <p className='text-l md:text-l lg:text-lg p-2 mt-3 rounded-lg bg-slate-800'>{storyChapter?.storyText}</p>
      </div>
    </div>
  )
}

export default StoryPages;
