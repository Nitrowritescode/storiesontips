"use client";

import React, { useContext, useState } from "react";
import StorySubjectInput from "./_components/StorySubjectInput";
import StoryType from "./_components/StoryType";
import AgeGroup from "./_components/AgeGroup";
import ImageStyle from "./_components/ImageStyle";
import { Button } from "@nextui-org/button";
import { chatSession } from "@/config/GeminiAi";
import { StoryData, Users } from "@/config/schema";
import { db } from "@/config/db";
//@ts-ignore
import uuid4 from "uuid4";
import CustomLoader from "./_components/CustomLoader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { UserDetailContext } from "../../_context/UserDetailContext";
import { eq } from "drizzle-orm";
import { Card } from "@/components/ui/card";
import { BookCheck } from "lucide-react";


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
  const notify = (msg: string) => toast(msg);
  const notifyError = (msg: string) => toast.error(msg);
  const { user } = useUser();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

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

    if (userDetail?.credit <= 0) {
      notifyError("You are out of coins!");
      
      return;
    }


    setLoading(true);
    try {

      const result = await chatSession.sendMessage(FINAL_PROMPT);
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
          coverImage: imageUrl,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
          userImage: user?.imageUrl
        }).returning({ storyId: StoryData?.storyId });
      setLoading(false);
      return result;
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const UpdateUserCredits = async () => {
    const result = await db.update(Users).set({
      credit: Number(userDetail?.credit - 1)
    }).where(eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress ?? '')).returning({ id: Users.id })
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-4 md:py-8">
      <div className="relative py-4 mb-10">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl" />

        {/* Title content */}
        <div className="relative text-center space-y-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl pb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          CREATE YOUR STORY
          </h1>
          <p className="text-purple-200/80 text-lg max-w-xl mx-auto">
          Unlock your creativity with AI: Craft stories like never before! Let our AI bring your imagination to life, one story at a time.
          </p>
          <div className="flex justify-center pt-2">
            <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
          </div>
        </div>
      </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-14 p-4 rounded-4xl">
          {/* Create Story Card Grid  */}
          <Card className="backdrop-blur-xl bg-gradient-to-r  from-pink-600/20 via-indigo-800 to-purple-600/20 border-2 transition-all hover:border-primary hover:shadow-md py-12 px-4 rounded-2xl">
            
          <StorySubjectInput userSelection={onHandleUserSelection} />
          </Card>
          <Card className="backdrop-blur-xl bg-gradient-to-r  from-pink-600/20 via-indigo-800 to-purple-600/20 border-2 transition-all hover:border-primary hover:shadow-md py-12 px-4 rounded-2xl">

          <StoryType userSelection={onHandleUserSelection} />
          </Card>
          <Card className="backdrop-blur-xl bg-gradient-to-r  from-pink-600/20 via-indigo-800 to-purple-600/20 border-2 transition-all hover:border-primary hover:shadow-md py-12 px-4 rounded-2xl">
          <AgeGroup userSelection={onHandleUserSelection} />

          </Card>
          <Card className="backdrop-blur-xl bg-gradient-to-r  from-pink-600/20 via-indigo-800 to-purple-600/20 border-2 transition-all hover:border-primary hover:shadow-md py-12 px-4 rounded-2xl">

          <ImageStyle userSelection={onHandleUserSelection} />
          </Card>
        </div>
        <div className="flex-col flex justify-end my-10 ">
          <Button
            className="py-6 px-12 text-2xl text-white/80 w-full md:w-[80%] mx-auto capitalize font-bold bg-indigo-600 hover:bg-indigo-400 transition-all duration-300"
            disabled={loading}
            onPress={GenerateStory}
          >
            <BookCheck className="size-6" />
            Generate story
          </Button>
          <span className="text-white mx-auto text-m font-medium py-1">1 coin will be used!</span>
        </div>
      </div>
      <CustomLoader isLoading={loading} />
    </div>

  );  
};

export default createStory;