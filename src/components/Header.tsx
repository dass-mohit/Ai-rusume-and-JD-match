
import { Brain, Sparkles, Target, Zap, TrendingUp } from "lucide-react";

const Header = () => {
  return (
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
  );
};

export default Header;
