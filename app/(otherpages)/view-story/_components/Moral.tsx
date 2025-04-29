"use client"

import { useState, useEffect } from "react";
import { Copy, Share2, Check, BookOpen, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MoralProps {
  moral?: string;
}

export default function Moral({ moral }: MoralProps) {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Add loading effect for better perceived performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = () => {
    if (!moral) return;
    
    try {
      navigator.clipboard.writeText(moral);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Moral copied to clipboard",
        duration: 2000,
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
      toast({
        title: "Copy failed",
        description: "Please try again",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const shareMoral = async () => {
    if (!moral) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Moral of the Story",
          text: moral,
        });
        toast({
          title: "Shared!",
          description: "Moral shared successfully",
          duration: 2000,
        });
      } catch (error: any) {
        // Only show error for actual errors, not user cancellations
        if (error.name !== "AbortError") {
          console.error("Share failed:", error);
          toast({
            title: "Share failed",
            description: "Copying to clipboard instead",
            variant: "destructive",
            duration: 2000,
          });
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8 animate-pulse">
        <div className="pb-6">
          <div className="flex items-center justify-center gap-2">
            <div className="h-8 w-48 bg-primary/10 rounded"></div>
          </div>
          <div className="h-4 w-64 bg-primary/5 rounded mt-2 mx-auto"></div>
        </div>
        <div className="bg-primary/5 rounded-xl h-40 w-full"></div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-4">
      <div className="pb-6">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-2xl md:text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-500">
            Moral of the Story
          </h1>
        </div>
        <h3 className="text-base md:text-lg font-medium text-muted-foreground text-center mt-1 flex items-center justify-center">
          <BookOpen className="h-4 w-4 mr-2 opacity-70" />
          Every Story Has a Lesson to Learn
        </h3>
      </div>

      <div 
        className="bg-gradient-to-r rounded-xl from-primary/10 to-primary/20 py-10 border border-primary/20 text-foreground px-6 md:px-10 shadow-lg relative overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
        tabIndex={0}
        aria-label="Moral of the story"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400/40 to-purple-500/40"></div>
        <Quote className="absolute top-4 left-4 h-8 w-8 text-white/80 opacity-50" />
        <Quote className="absolute bottom-4 right-4 h-8 w-8 text-white/80 opacity-50 rotate-180" />
        
        {moral ? (
          <>
            <p className="font-medium text-lg md:text-xl text-center leading-relaxed md:px-8 text-white/80 select-all">
              "{moral}"
            </p>
            
            <div className="flex justify-center mt-8 gap-3">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-primary/20 hover:bg-primary/10 transition-all focus:ring-2 focus:ring-offset-1 focus:ring-purple-400/30"
                onClick={copyToClipboard}
                aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-primary/20 hover:bg-primary/10 transition-all focus:ring-2 focus:ring-offset-1 focus:ring-purple-400/30"
                onClick={shareMoral}
                aria-label="Share this moral"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-4">
            <BookOpen className="h-12 w-12 mb-4 text-primary/30" />
            <p className="text-lg text-center text-muted-foreground">
              No moral available for this story, but every tale has a lesson to discover!
            </p>
          </div>
        )}
      </div>

      {moral && (
        <div className="text-center mt-4 text-sm text-muted-foreground">
          Use this moral as a guide for reflection and growth.
        </div>
      )}
    </div>
  );
}