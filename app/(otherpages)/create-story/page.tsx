"use client";

import React, { useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  BookOpen,
  Sparkles,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  Star,
  Coins,
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import StorySubjectInput from "./_components/StorySubjectInput";
import StoryType from "./_components/StoryType";
import AgeGroup from "./_components/AgeGroup";
import ImageStyle from "./_components/ImageStyle";
import { UserDetailContext } from "../../_context/UserDetailContext";

export interface FieldData {
  fieldName: string;
  fieldValue: string;
}

export interface FormDataType {
  storySubject: string;
  storyType: string;
  imageStyle: string;
  ageGroup: string;
}

interface LoadingStep {
  id: string;
  label: string;
  completed: boolean;
}

const CreateStoryPage = () => {
  const [formData, setFormData] = useState<FormDataType>({
    storySubject: "",
    storyType: "",
    imageStyle: "",
    ageGroup: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([
    { id: "story", label: "Crafting your magical story", completed: false },
    { id: "image", label: "Creating beautiful artwork", completed: false },
    { id: "saving", label: "Saving to your library", completed: false },
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const router = useRouter();
  const { user } = useUser();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const getIncompleteFields = () => {
    const incomplete = [];
    if (!formData.storySubject) incomplete.push("Story Subject");
    if (!formData.storyType) incomplete.push("Story Type");
    if (!formData.ageGroup) incomplete.push("Age Group");
    if (!formData.imageStyle) incomplete.push("Image Style");
    return incomplete;
  };

  const handleUserSelection = useCallback((data: FieldData) => {
    setFormData((prev) => ({
      ...prev,
      [data.fieldName]: data.fieldValue,
    }));
  }, []);

  const updateLoadingStep = (stepId: string, completed: boolean) => {
    setLoadingSteps((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, completed } : step))
    );
  };

  const generateStory = async () => {
    if (!isFormValid()) {
      const incompleteFields = getIncompleteFields();
      toast.error(`Please complete: ${incompleteFields.join(", ")}`);
      return;
    }

    if (!userDetail?.credit || userDetail.credit <= 0) {
      toast.error(
        "Insufficient credits! Please purchase more credits to continue."
      );
      return;
    }

    if (!user?.primaryEmailAddress?.emailAddress) {
      toast.error("Please ensure you're logged in properly.");
      return;
    }

    setLoading(true);
    setCurrentStep(0);

    // Reset loading steps
    setLoadingSteps((prev) =>
      prev.map((step) => ({ ...step, completed: false }))
    );

    try {
      // Step 1: Generate Story
      setCurrentStep(1);
      updateLoadingStep("story", false);

      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Story generation failed");
      }

      // Update steps progressively
      setTimeout(() => updateLoadingStep("story", true), 500);
      setTimeout(() => {
        setCurrentStep(2);
        updateLoadingStep("image", true);
      }, 1000);
      setTimeout(() => {
        setCurrentStep(3);
        updateLoadingStep("saving", true);
      }, 1500);

      // Update user credits in context
      if (setUserDetail) {
        setUserDetail((prev: { credit: any }) => ({
          ...prev,
          credit: (prev?.credit || 0) - 1,
        }));
      }

      // Success notification
      toast.success(`"${data.story.bookTitle}" created successfully! 🎉`, {
        duration: 4000,
      });

      // Navigate to story view
      setTimeout(() => {
        router.push(`/view-story/${data.storyId}`);
      }, 2000);
    } catch (error: any) {
      console.error("Story generation error:", error);

      // Reset loading steps on error
      setLoadingSteps((prev) =>
        prev.map((step) => ({ ...step, completed: false }))
      );

      // Handle specific error cases
      if (error.message?.includes("Insufficient credits")) {
        toast.error("Insufficient credits! Please purchase more to continue.");
      } else if (error.message?.includes("Unauthorized")) {
        toast.error("Please log in to generate stories.");
      } else if (error.message?.includes("rate_limit")) {
        toast.error(
          "Too many requests. Please wait a moment before trying again."
        );
      } else if (error.message?.includes("quota")) {
        toast.error("Service temporarily unavailable. Please try again later.");
      } else {
        toast.error(
          error.message || "Failed to generate story. Please try again."
        );
      }
    } finally {
      setLoading(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-yellow-400" />
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Create Your Story
            </h1>
            <Sparkles className="h-8 w-8 text-yellow-400" />
          </div>

          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-6">
            Transform your imagination into beautiful, illustrated stories with
            the power of AI. Perfect for children, educators, and storytellers
            of all ages.
          </p>

          {/* Credits Display */}
          <div className="flex items-center justify-center gap-2">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30"
            >
              <Coins className="h-4 w-4 mr-1" />
              {userDetail?.credit || 0} Credits Available
            </Badge>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Story Subject */}
            <div>
              <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-200">
                    <BookOpen className="h-5 w-5 text-purple-400" />
                    Story Subject
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <StorySubjectInput userSelection={handleUserSelection} />
                </CardContent>
              </Card>
            </div>

            {/* Story Type */}
            <div>
              <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-200">
                    <Star className="h-5 w-5 text-purple-400" />
                    Story Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <StoryType userSelection={handleUserSelection} />
                </CardContent>
              </Card>
            </div>

            {/* Age Group */}
            <div>
              <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-200">
                    <Clock className="h-5 w-5 text-purple-400" />
                    Age Group
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AgeGroup userSelection={handleUserSelection} />
                </CardContent>
              </Card>
            </div>

            {/* Image Style */}
            <div>
              <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-200">
                    <Zap className="h-5 w-5 text-purple-400" />
                    Art Style
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageStyle userSelection={handleUserSelection} />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Validation Alert */}
          {!isFormValid() && (
            <div>
              <Alert className="bg-amber-500/10 border-amber-500/30 text-amber-300">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please complete all fields: {getIncompleteFields().join(", ")}
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Generate Button */}
          <div>
            <Button
              onClick={generateStory}
              disabled={
                loading || !isFormValid() || (userDetail?.credit || 0) <= 0
              }
              size="lg"
              className="w-full max-w-md h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating Magic...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5" />
                  Generate Story
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </Button>

            <p className="text-slate-400 text-sm mt-3">
              {loading
                ? "Please wait while we craft your story..."
                : "1 credit will be used"}
            </p>
          </div>
        </div>

        {/* Loading Progress */}
        {loading && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <Card className="bg-slate-800/95 border-slate-700/50 backdrop-blur-sm shadow-2xl min-w-[350px]">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">
                      Creating Your Story
                    </h3>
                    <Progress
                      value={(currentStep / 3) * 100}
                      className="w-full h-2 bg-slate-700"
                    />
                  </div>

                  <Separator className="bg-slate-700" />

                  <div className="space-y-3">
                    {loadingSteps.map((step, index) => (
                      <div key={step.id} className="flex items-center gap-3">
                        {step.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : currentStep === index + 1 ? (
                          <Loader2 className="h-5 w-5 text-purple-400 animate-spin" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-slate-600" />
                        )}
                        <span
                          className={`text-sm ${
                            step.completed
                              ? "text-green-400"
                              : currentStep === index + 1
                              ? "text-purple-400"
                              : "text-slate-400"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateStoryPage;
