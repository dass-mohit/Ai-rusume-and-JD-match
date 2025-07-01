
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import ResumeUpload from "@/components/ResumeUpload";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import LoadingAnalysis from "@/components/LoadingAnalysis";
import MatchResults from "@/components/MatchResults";
import CustomCursor from "@/components/CustomCursor";

interface MatchResult {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
}

const Index = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const { toast } = useToast();

  const simulateMatching = async (): Promise<MatchResult> => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResults: MatchResult[] = [
      {
        score: 85,
        matchedSkills: ["JavaScript", "React", "Node.js", "Git", "Agile", "Problem Solving"],
        missingSkills: ["TypeScript", "Docker", "AWS", "GraphQL"],
        suggestions: [
          "Consider learning TypeScript to enhance JavaScript development",
          "Gain experience with containerization using Docker",
          "Explore cloud services, particularly AWS",
          "Learn GraphQL for modern API development"
        ]
      },
      {
        score: 72,
        matchedSkills: ["Python", "Machine Learning", "Data Analysis", "SQL"],
        missingSkills: ["TensorFlow", "Deep Learning", "Apache Spark", "Kubernetes"],
        suggestions: [
          "Deepen your machine learning knowledge with TensorFlow",
          "Explore deep learning frameworks and techniques",
          "Learn big data processing with Apache Spark",
          "Gain experience with container orchestration using Kubernetes"
        ]
      }
    ];
    
    return mockResults[Math.floor(Math.random() * mockResults.length)];
  };

  const handleMatch = async () => {
    if (!resume || !jobDescription.trim()) {
      toast({
        title: "Missing information",
        description: "Please upload a resume and enter a job description",
        variant: "destructive",
      });
      return;
    }

    setIsMatching(true);
    try {
      const result = await simulateMatching();
      setMatchResult(result);
      toast({
        title: "Analysis complete",
        description: `Match score: ${result.score}%`,
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <CustomCursor />

      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 relative z-10">
        <Header />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Input Section */}
          <div className="space-y-6 lg:space-y-8">
            <ResumeUpload resume={resume} setResume={setResume} />
            <JobDescriptionInput jobDescription={jobDescription} setJobDescription={setJobDescription} />

            {/* Match Button */}
            <Button 
              onClick={handleMatch}
              disabled={isMatching || !resume || !jobDescription.trim()}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 text-white py-6 sm:py-8 text-lg sm:text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100"
            >
              {isMatching ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="mr-3 h-6 w-6" />
                  Analyze Match with AI
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          <div className="space-y-6 lg:space-y-8">
            {isMatching && <LoadingAnalysis />}
            {matchResult && !isMatching && <MatchResults matchResult={matchResult} />}
            {!matchResult && !isMatching && (
              <Card className="border-2 border-dashed border-gray-300 bg-white/50 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center py-16 sm:py-20">
                  <div className="bg-gradient-to-r from-gray-100 to-blue-100 p-8 rounded-full mb-6">
                    <TrendingUp className="h-16 w-16 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-center text-lg leading-relaxed max-w-md">
                    Upload your resume and enter a job description to see your personalized AI match analysis
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 sm:mt-20 pt-8 border-t border-gray-200/50">
          <div className="bg-white/80 backdrop-blur-sm inline-block px-8 py-4 rounded-2xl shadow-lg">
            <p className="text-gray-600 text-base font-medium">
              Powered by advanced AI to help you understand skill alignment with job requirements
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
