"use client";

import React, { useContext, useState } from "react";
import StorySubjectInput from "./_components/StorySubjectInput";
import StoryType from "./_components/StoryType";
import AgeGroup from "./_components/AgeGroup";
import ImageStyle from "./_components/ImageStyle";
import {Header} from "../_components/Header";
import { Button } from "@nextui-org/button";
import { chatSession } from "@/config/GeminiAi";
import { StoryData, Users } from "@/config/schema";
import { db } from "@/config/db";
//@ts-ignore
import uuid4 from "uuid4";
import CustomLoader from "./_components/CustomLoader";
import axios from "axios";
import { useRouter} from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from 'react-toastify';
import { UserDetailContext } from "../_context/UserDetailContext";
import { eq } from "drizzle-orm";


const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT;

export interface fieldData {
  fieldName: string;
  fieldValue: string;
}

export interface FormDataType {
  storySubject: string;
  storyType: string;
  imageStyle: string;
  ageGroup: string;
}

const createStory = () => {
  const [formData, setFormData] = useState<FormDataType>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const notify = (msg:string) => toast(msg);
  const notifyError = (msg:string) => toast.error(msg);
  const {user} = useUser();
  const {userDetail,setUserDetail} =useContext(UserDetailContext);

  /** 
 * 
@param data
*/

  const onHandleUserSelection = (data: fieldData) => {
    setFormData((prev: any) => ({
      ...prev,
      [data.fieldName]: data.fieldValue,
    }));
  };

  const FINAL_PROMPT = CREATE_STORY_PROMPT?.replace(
    "{ageGroup}",
    formData?.ageGroup ?? ""
  )
    .replace("{storyType}", formData?.storyType ?? "")
    .replace("{imageStyle}", formData?.imageStyle ?? "")
    .replace("{storySubject}", formData?.storySubject ?? "");


  const GenerateStory = async () => {
    // generate story
    
    if (userDetail?.credit<=0) {
      notifyError("You&apos;re out of credits!");
      return ;
    }
    
    
    setLoading(true);
    try {
    
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("result:",result)
      const story = JSON.parse(result?.response.text());

      // Generate Image
      const imageResp = await axios.post("/api/generate-image", {
        prompt:
          "Add text with title:" +
          story?.bookTitle +
          " in bold text for book cover, " +
          story?.cover?.imagePrompt,
      });


      const AiImageUrl = imageResp?.data?.imageUrl;   // imageResp is not optimized here.    

      const imageResult = await axios.post("/api/save-image", {
        url: AiImageUrl,
      });
      console.log("imageResult", imageResult)
      const FirebaseStorageImageUrl = imageResult.data.imageUrl;

      console.log(result?.response.text());
      
      const resp: any = await SaveInDB(
        result?.response.text(),
        FirebaseStorageImageUrl
      );
      console.log(resp);
      notify("Story Generated");  
      await UpdateUserCredits();
      router?.replace("/view-story/" + resp[0].storyId);
      setLoading(false);
    } catch (e) {
      console.log(e);
      notifyError("Server Error, Try Again!"); 
      setLoading(false);
    }


  };


  /**
   * Save Data in db
   * @param output AI output
   * @returns
   */

  const SaveInDB = async (output: string, imageUrl: any) => {
    const recordId = uuid4();
    setLoading(true);
    try {
      const result = await db
        .insert(StoryData)
        .values({
          storyId: recordId,
          ageGroup: formData?.ageGroup,
          imageStyle: formData?.imageStyle,
          storyType: formData?.storyType,
          storySubject: formData?.storySubject,
          output: JSON.parse(output),
          coverImage:imageUrl,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
          userImage:user?.imageUrl
        }).returning({ storyId: StoryData?.storyId });
      setLoading(false);
      return result;
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

 const UpdateUserCredits=async()=>{
   const result = await db.update(Users).set({
    credit:Number(userDetail?.credit-1)
   }).where(eq(Users.userEmail,user?.primaryEmailAddress?.emailAddress??'')).returning({id:Users.id})
 }

  return (
    <>
      <div className="min-h-screen mt-4">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="relative mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800 inline-block">
              CREATE YOUR STORY
            </h1>
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-pink-300 rounded-full opacity-50 animate-pulse"></div>
          </div>
          <p className="text-lg text-purple-600 text-center mt-4 mb-10 max-w-2xl mx-auto">
            Unlock your creativity with AI: Craft stories like never before! Let
            our AI bring your imagination to life, one story at a time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">
            <StorySubjectInput userSelection={onHandleUserSelection} />
            <StoryType userSelection={onHandleUserSelection} />
            <AgeGroup userSelection={onHandleUserSelection} />
            <ImageStyle userSelection={onHandleUserSelection} />
          </div>
          <div className="flex-col flex justify-end my-10 ">
            <Button
              color="primary"
              className="p-6 text-2xl w-full md:w-[80%] mx-auto"
              disabled={loading}
              onPress={GenerateStory}
            >
              Generate story
            </Button>
            <span className="text-primary mx-auto text-xl font-bold">1 coin will be used!</span>
          </div>
        </div>
        <CustomLoader isLoading={loading} />
      </div>
    </>
  );
};

export default createStory;