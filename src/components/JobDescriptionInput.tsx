
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";

interface JobDescriptionInputProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
}

const JobDescriptionInput = ({ jobDescription, setJobDescription }: JobDescriptionInputProps) => {
  return (
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
  );
};

export default JobDescriptionInput;
