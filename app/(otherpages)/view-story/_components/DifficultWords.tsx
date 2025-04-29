"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  BookOpen, 
  X, 
  ChevronUp, 
  ChevronDown, 
  SortAsc, 
  SortDesc,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

interface DifficultWord {
  word: string;
  meaning: string;
}

interface ChapterWithWords {
  difficultWords?: DifficultWord[];
}

interface DifficultWordsProps {
  chapters?: ChapterWithWords[];
}

export default function DifficultWords({ chapters }: DifficultWordsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [activeWord, setActiveWord] = useState<string | null>(null);

  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Flatten all difficult words from all chapters
  const allWords = chapters?.flatMap(chapter => 
    chapter.difficultWords || []
  ) || [];
  
  // Filter words based on search term
  const filteredWords = allWords.filter(word => 
    word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort words based on current sort order
  const sortedWords = [...filteredWords].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.word.localeCompare(b.word);
    } else {
      return b.word.localeCompare(a.word);
    }
  });

  const hasWords = allWords.length > 0;

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const toggleWordDetail = (word: string) => {
    setActiveWord(activeWord === word ? null : word);
  };

  if (isLoading) {
    return (
      <div className="container flex flex-col items-center justify-center py-20 text-white">
        <RefreshCw className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium">Loading vocabulary...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto text-white">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Difficult Words
        </h1>
        <div className="flex items-center justify-center mt-2">
          <BookOpen className="h-5 w-5 mr-2 text-blue-400" />
          <h3 className="text-lg font-medium text-blue-200">
            Enhance Your Vocabulary
          </h3>
        </div>
      </div>

      {hasWords ? (
        <>
          <div className="relative mb-6">
            <div className="flex items-center bg-slate-800/80 rounded-lg border border-slate-700 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search words or meanings..."
                className="pl-10 pr-10 py-3 bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <Badge variant="outline" className="text-sm bg-slate-800/70 border-slate-700 text-slate-200">
                {filteredWords.length} {filteredWords.length === 1 ? 'word' : 'words'} found
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSortOrder}
              className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800/70"
            >
              Sort {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </Button>
          </div>

          <Card className="border-0 py-2 text-white/90 bg-gradient-to-b from-slate-800/90 to-slate-900/90 shadow-xl rounded-xl overflow-hidden backdrop-blur-md">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg text-slate-200">
                <h2 className="font-bold text-lg uppercase tracking-wide flex items-center">
                  <span className="mr-2">Words</span>
                </h2>
                <h2 className="max-sm:hidden font-bold text-lg uppercase tracking-wide text-right">
                  Meanings
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              {sortedWords.length > 0 ? (
                <div className="divide-y divide-slate-700/50">
                  {sortedWords.map((word, index) => (
                    <div key={`word-${index}`} className="group">
                      <div
                        onClick={() => toggleWordDetail(word.word)}
                        className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-800/40 cursor-pointer transition-all duration-200"
                      >
                        <h3 className="font-semibold text-lg capitalize text-blue-200 group-hover:text-blue-100 flex items-center">
                          {word.word}
                          {activeWord === word.word ? 
                            <ChevronUp className="h-4 w-4 ml-2 opacity-70" /> : 
                            <ChevronDown className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-70 transition-opacity" />
                          }
                        </h3>
                        
                        <p className="font-medium text-base text-right text-slate-300 hidden md:block">
                          {word.meaning.length > 60 
                            ? `${word.meaning.substring(0, 60)}...` 
                            : word.meaning}
                        </p>
                      </div>
                      
                      {/* Mobile view or expanded view */}
                      {(activeWord === word.word) && (
                        <div className="p-4 pt-0 pl-8 pb-6 bg-slate-800/20 rounded-b-lg border-l-2 border-blue-500/50 mb-1 md:hidden">
                          <p className="text-slate-300">{word.meaning}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <Search className="h-10 w-10 mb-3 opacity-50" />
                  <p className="text-center text-lg font-medium">No words match your search</p>
                  <Button 
                    variant="ghost" 
                    onClick={clearSearch} 
                    className="mt-3 text-blue-400 hover:text-blue-300"
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="border border-slate-700 p-8 text-center bg-slate-800/80 shadow-xl rounded-xl">
          <BookOpen className="h-12 w-12 mb-4 mx-auto text-slate-500" />
          <p className="text-xl font-medium text-slate-300">
            No vocabulary words are available for this story.
          </p>
          <p className="text-slate-400 mt-2">
            Check back later or explore another chapter.
          </p>
        </Card>
      )}
    </div>
  );
}