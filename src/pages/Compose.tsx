
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Mail, Send, Loader } from "lucide-react";

const Compose = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [usageRemaining, setUsageRemaining] = useState(10);
  const [emailType, setEmailType] = useState("professional");
  
  // Professional email details
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [purpose, setPurpose] = useState("");
  
  // Cover letter details
  const [jobTitle, setJobTitle] = useState("");
  const [yourName, setYourName] = useState("");
  const [experience, setExperience] = useState("");

  const handleGenerateEmail = () => {
    if (!recipientEmail || !subject) return;
    
    setLoading(true);
    
    // Simulate API call for email generation
    setTimeout(() => {
      // Professional email template
      if (emailType === "professional") {
        setMessage(`Dear Recipient,\n\nI hope this email finds you well. My name is ${yourName || "[Your Name]"} and I am writing regarding ${purpose || "our potential collaboration"}.\n\n${companyName ? `As a representative of ${companyName}, ` : ""}I would like to discuss ${subject} with you. ${position ? `In my role as ${position}, ` : ""}I believe there could be significant opportunities for us to work together.\n\nI look forward to your response and would appreciate the opportunity to discuss this further at your convenience.\n\nBest regards,\n${yourName || "[Your Name]"}`);
      } 
      // Cover letter template
      else if (emailType === "cover-letter") {
        setMessage(`Dear Hiring Manager,\n\nI am writing to express my interest in the ${jobTitle || "[Job Title]"} position at your company. With ${experience || "my background and experience"}, I believe I would be a strong candidate for this role.\n\nThroughout my career, I have demonstrated strengths in problem-solving, communication, and leadership. I am particularly drawn to your company because of its reputation for innovation and excellence in the industry.\n\nI am excited about the possibility of bringing my skills and experience to your team and would welcome the opportunity to discuss my qualifications further.\n\nThank you for considering my application.\n\nSincerely,\n${yourName || "[Your Name]"}`);
      }
      // Personal email template
      else {
        setMessage(`Hi there,\n\nI hope you're doing well! I wanted to reach out about ${subject}.\n\n[Your message here]\n\nLet me know your thoughts when you get a chance.\n\nBest,\n${yourName || "[Your Name]"}`);
      }
      
      setLoading(false);
      setUsageRemaining(prev => prev - 1);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-4">Email Composition</h1>
              <p className="text-muted-foreground">
                Create professional emails and cover letters in seconds.
              </p>
            </div>

            <Tabs defaultValue="professional" value={emailType} onValueChange={setEmailType}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="professional">Professional Email</TabsTrigger>
                <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
                <TabsTrigger value="personal">Personal Email</TabsTrigger>
              </TabsList>
              
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <TabsContent value="professional" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input
                        id="company-name"
                        placeholder="Enter company name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Your Position</Label>
                      <Input
                        id="position"
                        placeholder="Enter your position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="purpose">Email Purpose</Label>
                    <Input
                      id="purpose"
                      placeholder="e.g., Partnership inquiry, Product information, etc."
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="cover-letter" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="job-title">Job Title</Label>
                      <Input
                        id="job-title"
                        placeholder="Enter the job title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="your-name">Your Name</Label>
                      <Input
                        id="your-name"
                        placeholder="Enter your full name"
                        value={yourName}
                        onChange={(e) => setYourName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="experience">Relevant Experience</Label>
                    <Input
                      id="experience"
                      placeholder="e.g., 5 years in marketing, software development background"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="personal" className="space-y-4">
                  <div>
                    <Label htmlFor="your-name-personal">Your Name</Label>
                    <Input
                      id="your-name-personal"
                      placeholder="Enter your name"
                      value={yourName}
                      onChange={(e) => setYourName(e.target.value)}
                    />
                  </div>
                </TabsContent>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="recipient">Recipient Email</Label>
                    <Input
                      id="recipient"
                      type="email"
                      placeholder="recipient@example.com"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Email subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label htmlFor="message">Message</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleGenerateEmail}
                        disabled={loading || !recipientEmail || !subject}
                      >
                        {loading ? (
                          <>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            Generating
                          </>
                        ) : (
                          <>
                            <FileText className="mr-2 h-4 w-4" />
                            Generate
                          </>
                        )}
                      </Button>
                    </div>
                    <Textarea
                      id="message"
                      placeholder="Your email content"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={10}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="track" />
                    <Label htmlFor="track">Track this email</Label>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Compositions remaining today: <span className="font-semibold">{usageRemaining}/10</span>
                    {usageRemaining === 0 && (
                      <p className="text-destructive mt-1">
                        You've reached your daily limit. Upgrade to continue.
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      disabled={!message || loading || usageRemaining === 0}
                      className="flex items-center"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </div>
            </Tabs>
            
            <div className="mt-10">
              <div className="bg-email-accent p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Need unlimited email compositions?</h3>
                <p className="text-muted-foreground mb-4">
                  Upgrade to our Pro or Enterprise plan for unlimited compositions and additional templates.
                </p>
                <Button>Upgrade Now</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Compose;
