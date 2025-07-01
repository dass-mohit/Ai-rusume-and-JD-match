
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, CheckCircle, AlertCircle, Sparkles } from "lucide-react";

interface MatchResult {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
}

interface MatchResultsProps {
  matchResult: MatchResult;
}

const MatchResults = ({ matchResult }: MatchResultsProps) => {
  const getScoreDescription = (score: number) => {
    if (score >= 80) return "Excellent match! You're a strong candidate.";
    if (score >= 60) return "Good match with room for improvement.";
    return "Consider developing additional skills for this role.";
  };

  return (
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
  );
};

export default MatchResults;
