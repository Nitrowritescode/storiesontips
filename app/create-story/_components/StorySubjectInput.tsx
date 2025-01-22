import React from 'react'
import {Textarea} from "@nextui-org/input";

function StorySubjectInput({userSelection}:any) {
  return (
    <div>
        <label className='font-bold text-4xl text-primary mx-auto'>1. Story Subject</label>
        <p className='text-primary mb-4'>Write the subject for the story!</p>
        <Textarea classNames={{
            input:"resize-y min-h-[230px] text-2xl p-5"
        }} placeholder="What&apos;s on your mind!" 
        onChange={(e)=>userSelection({
          fieldValue:e.target.value,
          fieldName: "storySubject"
        })}
        />

    </div>
  )
}

export default StorySubjectInput;