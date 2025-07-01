
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Target, Brain } from "lucide-react";

const LoadingAnalysis = () => {
  return (
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
  );
};

export default LoadingAnalysis;
