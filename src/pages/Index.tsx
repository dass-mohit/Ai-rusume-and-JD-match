
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Zap, TrendingUp, AlertCircle, CheckCircle, Sparkles, Target, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const { toast } = useToast();

  // Cursor tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type === "text/plain") {
        setResume(file);
        toast({
          title: "Resume uploaded successfully",
          description: `${file.name} is ready for analysis`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOCX, or TXT file",
          variant: "destructive",
        });
      }
    }
  };

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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-500";
  };

  const getScoreDescription = (score: number) => {
    if (score >= 80) return "Excellent match! You're a strong candidate.";
    if (score >= 60) return "Good match with room for improvement.";
    return "Consider developing additional skills for this role.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Custom cursor effect */}
      <div 
        className="fixed w-8 h-8 bg-blue-500/30 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          left: cursorPosition.x - 16,
          top: cursorPosition.y - 16,
          transform: 'scale(1)',
        }}
      />

      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl mr-4 shadow-xl">
              <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                AI Resume Matcher
              </h1>
              <div className="flex items-center mt-2">
                <Sparkles className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm text-gray-600 font-medium">Powered by Advanced AI</span>
              </div>
            </div>
          </div>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how well your resume matches job requirements with AI-powered analysis
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Target className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-medium">Precise Matching</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Zap className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium">Instant Results</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <TrendingUp className="h-4 w-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium">Career Insights</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Input Section */}
          <div className="space-y-6 lg:space-y-8">
            {/* Resume Upload */}
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg mr-3">
                    <Upload className="h-5 w-5 text-white" />
                  </div>
                  Upload Resume
                </CardTitle>
                <CardDescription className="text-base">
                  Upload your resume in PDF, DOCX, or TXT format (Max 10MB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="resume-upload" className="flex flex-col items-center justify-center w-full h-40 sm:h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gradient-to-br from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group-hover:border-blue-400">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="bg-blue-100 p-4 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                        <FileText className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="mb-2 text-base text-gray-700">
                        {resume ? (
                          <span className="font-semibold text-blue-600 text-lg">{resume.name}</span>
                        ) : (
                          <>
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </>
                        )}
                      </p>
                      <p className="text-sm text-gray-500">PDF, DOCX or TXT files supported</p>
                    </div>
                    <input 
                      id="resume-upload" 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.docx,.txt"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 p-2 rounded-lg mr-3">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  Job Description
                </CardTitle>
                <CardDescription className="text-base">
                  Paste the complete job description you want to match against
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the complete job description here including requirements, responsibilities, and qualifications..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px] sm:min-h-[250px] resize-none border-2 border-gray-200 focus:border-blue-400 rounded-xl text-base bg-white/50 backdrop-blur-sm"
                />
              </CardContent>
            </Card>

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
            {isMatching && (
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                    AI Analysis in Progress
                  </CardTitle>
                  <CardDescription className="text-base">Our AI is processing your information...</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="animate-pulse bg-blue-100 p-2 rounded-full">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-base">Parsing resume content...</span>
                    </div>
                    <Progress value={33} className="w-full h-3" />
                    <div className="flex items-center space-x-3">
                      <div className="animate-pulse bg-green-100 p-2 rounded-full">
                        <Target className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-base">Analyzing job requirements...</span>
                    </div>
                    <Progress value={66} className="w-full h-3" />
                    <div className="flex items-center space-x-3">
                      <div className="animate-pulse bg-purple-100 p-2 rounded-full">
                        <Brain className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-base">Computing AI match score...</span>
                    </div>
                    <Progress value={90} className="w-full h-3" />
                  </div>
                </CardContent>
              </Card>
            )}

            {matchResult && !isMatching && (
              <div className="space-y-6 lg:space-y-8 animate-fade-in">
                {/* Match Score */}
                <Card className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-0 shadow-2xl">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="flex items-center justify-center text-2xl">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full mr-3">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      AI Match Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className={`text-6xl sm:text-7xl font-bold mb-4 bg-gradient-to-r ${matchResult.score >= 80 ? 'from-emerald-600 to-green-600' : matchResult.score >= 60 ? 'from-amber-500 to-orange-500' : 'from-red-500 to-pink-500'} bg-clip-text text-transparent`}>
                      {matchResult.score}%
                    </div>
                    <p className="text-gray-700 text-lg sm:text-xl mb-6 font-medium">
                      {getScoreDescription(matchResult.score)}
                    </p>
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl">
                      <Progress value={matchResult.score} className="w-full h-4" />
                    </div>
                  </CardContent>
                </Card>

                {/* Matched Skills */}
                <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700 text-xl">
                      <div className="bg-green-100 p-2 rounded-lg mr-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      Matched Skills
                    </CardTitle>
                    <CardDescription className="text-base">Skills you have that align with job requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {matchResult.matchedSkills.map((skill, index) => (
                        <Badge key={index} className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-4 py-2 text-sm font-medium rounded-full hover:scale-105 transition-transform">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Missing Skills */}
                <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-700 text-xl">
                      <div className="bg-orange-100 p-2 rounded-lg mr-3">
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                      </div>
                      Skills to Develop
                    </CardTitle>
                    <CardDescription className="text-base">Key skills that could strengthen your candidacy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {matchResult.missingSkills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-orange-200 text-orange-700 px-4 py-2 text-sm font-medium rounded-full hover:bg-orange-50 transition-colors">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Suggestions */}
                <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-700 text-xl">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <Sparkles className="h-5 w-5 text-blue-600" />
                      </div>
                      AI Recommendations
                    </CardTitle>
                    <CardDescription className="text-base">Personalized suggestions to enhance your profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {matchResult.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 mr-4 mt-1 flex-shrink-0">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <span className="text-gray-700 text-base leading-relaxed">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

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
