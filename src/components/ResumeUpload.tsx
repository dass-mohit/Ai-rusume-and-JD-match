
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResumeUploadProps {
  resume: File | null;
  setResume: (file: File | null) => void;
}

const ResumeUpload = ({ resume, setResume }: ResumeUploadProps) => {
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

  return (
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
  );
};

export default ResumeUpload;
