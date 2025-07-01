
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Zap, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
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
  const { toast } = useToast();

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
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI analysis results
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
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreDescription = (score: number) => {
    if (score >= 80) return "Excellent match! You're a strong candidate.";
    if (score >= 60) return "Good match with room for improvement.";
    return "Consider developing additional skills for this role.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full mr-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">AI Resume Matcher</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how well your resume matches job requirements with AI-powered analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Resume Upload */}
            <Card className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Resume
                </CardTitle>
                <CardDescription>
                  Upload your resume in PDF, DOCX, or TXT format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="resume-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileText className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        {resume ? (
                          <span className="font-semibold text-blue-600">{resume.name}</span>
                        ) : (
                          <>
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOCX or TXT (MAX. 10MB)</p>
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
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
                <CardDescription>
                  Paste the job description you want to match against
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
              </CardContent>
            </Card>

            {/* Match Button */}
            <Button 
              onClick={handleMatch}
              disabled={isMatching || !resume || !jobDescription.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
            >
              {isMatching ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5" />
                  Analyze Match
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {isMatching && (
              <Card>
                <CardHeader>
                  <CardTitle>Analyzing Your Resume</CardTitle>
                  <CardDescription>AI is processing your information...</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span>Parsing resume content...</span>
                    </div>
                    <Progress value={33} className="w-full" />
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span>Analyzing job requirements...</span>
                    </div>
                    <Progress value={66} className="w-full" />
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span>Computing match score...</span>
                    </div>
                    <Progress value={90} className="w-full" />
                  </div>
                </CardContent>
              </Card>
            )}

            {matchResult && !isMatching && (
              <div className="space-y-6">
                {/* Match Score */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center">
                      <TrendingUp className="mr-2 h-6 w-6 text-blue-600" />
                      Match Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className={`text-6xl font-bold mb-2 ${getScoreColor(matchResult.score)}`}>
                      {matchResult.score}%
                    </div>
                    <p className="text-gray-600 text-lg">
                      {getScoreDescription(matchResult.score)}
                    </p>
                    <Progress value={matchResult.score} className="w-full mt-4" />
                  </CardContent>
                </Card>

                {/* Matched Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Matched Skills
                    </CardTitle>
                    <CardDescription>Skills you have that match the job requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.matchedSkills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Missing Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-700">
                      <AlertCircle className="mr-2 h-5 w-5" />
                      Skills to Develop
                    </CardTitle>
                    <CardDescription>Skills mentioned in the job description that could strengthen your profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.missingSkills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-orange-200 text-orange-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Suggestions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-700">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      Improvement Suggestions
                    </CardTitle>
                    <CardDescription>Personalized recommendations to enhance your candidacy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {matchResult.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          </div>
                          <span className="text-gray-700">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {!matchResult && !isMatching && (
              <Card className="border-dashed border-2 border-gray-200">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <TrendingUp className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-center">
                    Upload your resume and enter a job description to see your match analysis
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            AI-powered analysis helps you understand how well your skills align with job requirements
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
