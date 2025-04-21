
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, Link, Download, Mail } from "lucide-react";
import ExtractEmailsTable, { ExtractedEmail } from "./ExtractEmailsTable";

interface Props {
  url: string;
  setUrl: (u: string) => void;
  loading: boolean;
  loadingProgress: number;
  usageRemaining: number;
  extractedEmails: ExtractedEmail[];
  handleSubmit: (e: React.FormEvent) => void;
  handleDownload: () => void;
}

const ExtractEmailsForm: React.FC<Props> = ({
  url,
  setUrl,
  loading,
  loadingProgress,
  usageRemaining,
  extractedEmails,
  handleSubmit,
  handleDownload
}) => (
  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="url-extract" className="block text-sm font-medium mb-2">
          Website URL or LinkedIn Company Page
        </label>
        <div className="flex">
          <div className="relative flex-1">
            <Input
              id="url-extract"
              type="url"
              placeholder="https://company.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pr-10"
              disabled={loading}
              aria-label="Extraction URL"
            />
            <Link className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          </div>
          <Button
            type="submit"
            disabled={loading || !url || usageRemaining <= 0}
            className={`ml-2 transition-all ${loading ? "animate-pulse" : ""}`}
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Extracting...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Extract Emails
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <div className="flex items-center justify-between">
          <div>
            Extractions remaining today: <span className="font-semibold">{usageRemaining}/100</span>
          </div>
          {extractedEmails.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDownload}
              className="flex items-center gap-2"
              type="button"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </Button>
          )}
        </div>
        {usageRemaining === 0 && (
          <p className="text-destructive mt-1">
            You've reached your daily limit. Upgrade to continue.
          </p>
        )}
      </div>

      {loading && (
        <div className="space-y-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-email-primary rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground text-right">
            Extracting {loadingProgress < 100 ? "..." : `${extractedEmails.length} emails`}
          </p>
        </div>
      )}

      <ExtractEmailsTable emails={extractedEmails} />
    </form>
  </div>
);

export default ExtractEmailsForm;
