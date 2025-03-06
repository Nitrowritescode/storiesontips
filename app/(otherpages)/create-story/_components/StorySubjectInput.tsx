import React from "react";
import { Textarea } from "@nextui-org/input";

function StorySubjectInput({ userSelection }: any) {
  return (
    <div className="px-4">
      <label className="font-extrabold font-passion text-2xl lg:text-4xl text-white mx-auto">
        1. STORY SUBJECT
      </label>
      <p className="text-white px-4 md:px-8 py-4 font-medium text-l lg:text-xl">
        Write the subject for the story!
      </p>
      <Textarea
        isRequired
        classNames={{
          input:
          `min-h-[230px] text-2xl p-5 text-white font-medium resize-y max-h-[560px] 
          !bg-gray-800 bg-opacity-90 rounded-3xl`,
        }}
        placeholder="Write Better Prompts For Better Stories!"
        onChange={(e) =>
          userSelection({
            fieldValue: e.target.value,
            fieldName: "storySubject",
          })
        }
      />
    </div>
  );
}

export default StorySubjectInput;
