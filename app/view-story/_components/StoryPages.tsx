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
    <div>
      <h2 className='text-xl md:text-2xl lg:text-2xl font-bold text-blue-600 flex justify-between'>{storyChapter?.chapterTitle}
        <div className='flex justify-center'>

        <span className='text-3xl cursor-pointer flex-right text-gray-800' onClick={()=>playSpeech(storyChapter?.storyText)}><MdSmartDisplay /></span>
        <span className='text-3xl cursor-pointer text-gray-800' onClick={()=>stopSpeech()}><ImStop2 /></span>
        </div>
      </h2>
      <p className='text-l md:text-xl lg:text-xl p-2 mt-3 rounded-lg bg-slate-100'>{storyChapter?.storyText}</p>
    </div>
  )
}

export default StoryPages;
