
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Link, Mail, MapPin, Phone, ChevronDown, ChevronRight, Copy, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export interface ScrapedData {
  type: string;
  value: string;
  context?: string;
  page?: string;
}

interface Props {
  scrapedData: ScrapedData[];
}

const ExtractScrapedTable: React.FC<Props> = ({ scrapedData }) => {
  const [openInfoType, setOpenInfoType] = useState<string | null>(null);
  
  if (!scrapedData.length) return null;
  
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'email':
        return <Mail className="h-4 w-4 text-blue-500" />;
      case 'link':
        return <Link className="h-4 w-4 text-green-500" />;
      case 'phone':
        return <Phone className="h-4 w-4 text-orange-500" />;
      case 'address':
        return <MapPin className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getTypeBadge = (type: string) => {
    let color;
    switch (type.toLowerCase()) {
      case 'email':
        color = "bg-blue-100 text-blue-800";
        break;
      case 'link':
        color = "bg-green-100 text-green-800";
        break;
      case 'phone':
        color = "bg-orange-100 text-orange-800";
        break;
      case 'address':
        color = "bg-purple-100 text-purple-800";
        break;
      default:
        color = "bg-gray-100 text-gray-800";
    }
    
    return (
      <div className={`flex items-center px-2 py-1 rounded-full ${color} text-xs`}>
        {getTypeIcon(type)}
        <span className="ml-1">{type}</span>
      </div>
    );
  };

  const getPythonToolInfo = (type: string) => {
    switch (type.toLowerCase()) {
      case 'email':
        return {
          title: "Email Extraction with re & email-validator",
          description: "Python's regex library (re) combined with email-validator identifies valid email patterns in HTML content, validates format, and performs MX record checks.",
          code: "import re\nimport email_validator\n\ndef extract_emails(html_content):\n    # Find potential emails using regex\n    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'\n    potential_emails = re.findall(email_pattern, html_content)\n    \n    # Validate emails\n    valid_emails = []\n    for email in potential_emails:\n        try:\n            validated = email_validator.validate_email(email)\n            valid_emails.append(validated.email)\n        except email_validator.EmailNotValidError:\n            pass\n    \n    return valid_emails",
          reference: "https://docs.python.org/3/library/re.html"
        };
      case 'link':
        return {
          title: "URL Detection with Beautiful Soup & urllib",
          description: "Beautiful Soup parses HTML while urllib.parse validates and normalizes extracted URLs, ensuring they're properly formatted and reachable.",
          code: "from bs4 import BeautifulSoup\nfrom urllib.parse import urljoin, urlparse\n\ndef extract_links(html_content, base_url):\n    soup = BeautifulSoup(html_content, 'lxml')\n    links = []\n    \n    for a_tag in soup.find_all('a', href=True):\n        href = a_tag['href']\n        # Normalize URL\n        full_url = urljoin(base_url, href)\n        # Validate URL structure\n        if urlparse(full_url).netloc:\n            links.append({\n                'url': full_url,\n                'text': a_tag.get_text(strip=True),\n                'context': a_tag.parent.get_text(strip=True)[:100]\n            })\n    \n    return links",
          reference: "https://www.crummy.com/software/BeautifulSoup/bs4/doc/"
        };
      case 'phone':
        return {
          title: "Phone Detection with phonenumbers",
          description: "Google's phonenumbers library detects, parses, and validates international phone numbers in web content, including country code identification.",
          code: "import phonenumbers\nimport re\n\ndef extract_phones(html_content):\n    # First, extract potential phone numbers using regex\n    phone_pattern = r'(?:\\+\\d{1,3}[- ]?)?\\(?\\d{3}\\)?[- ]?\\d{3}[- ]?\\d{4}'\n    potential_phones = re.findall(phone_pattern, html_content)\n    \n    valid_phones = []\n    for phone in potential_phones:\n        try:\n            parsed_number = phonenumbers.parse(phone, \"US\")  # Default region\n            if phonenumbers.is_valid_number(parsed_number):\n                formatted = phonenumbers.format_number(\n                    parsed_number, phonenumbers.PhoneNumberFormat.INTERNATIONAL\n                )\n                valid_phones.append(formatted)\n        except Exception:\n            pass\n            \n    return valid_phones",
          reference: "https://github.com/daviddrysdale/python-phonenumbers"
        };
      case 'address':
        return {
          title: "Address Extraction with pyap & geopy",
          description: "Python Address Parser (pyap) recognizes address patterns while geopy validates and geocodes them to confirm they're real locations.",
          code: "import pyap\nfrom geopy.geocoders import Nominatim\n\ndef extract_addresses(text):\n    # Extract potential addresses\n    addresses = pyap.parse(text, country='US')\n    validated = []\n    \n    # Geocode to validate addresses\n    geolocator = Nominatim(user_agent=\"address_extractor\")\n    \n    for address in addresses:\n        addr_str = str(address)\n        try:\n            location = geolocator.geocode(addr_str)\n            if location:\n                validated.append({\n                    'address': addr_str,\n                    'coordinates': (location.latitude, location.longitude),\n                    'verified': True\n                })\n        except Exception:\n            # Add without verification\n            validated.append({\n                'address': addr_str,\n                'verified': False\n            })\n    \n    return validated",
          reference: "https://github.com/vladimarius/pyap"
        };
      default:
        return {
          title: "Content Extraction with Beautiful Soup",
          description: "Beautiful Soup intelligently parses HTML documents to extract meaningful content while filtering out boilerplate and navigation elements.",
          code: "from bs4 import BeautifulSoup\n\ndef extract_main_content(html):\n    soup = BeautifulSoup(html, 'lxml')\n    \n    # Remove unwanted elements\n    for tag in soup(['script', 'style', 'nav', 'footer', 'header']):\n        tag.decompose()\n    \n    # Extract paragraphs\n    paragraphs = soup.find_all('p')\n    content = '\\n'.join([p.get_text() for p in paragraphs])\n    \n    return content",
          reference: "https://www.crummy.com/software/BeautifulSoup/bs4/doc/"
        };
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Python code copied to clipboard!");
  };

  const toggleInfoType = (type: string) => {
    if (openInfoType === type) {
      setOpenInfoType(null);
    } else {
      setOpenInfoType(type);
    }
  };
  
  return (
    <Card>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Context</TableHead>
                <TableHead>Page</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scrapedData.map((item, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getTypeBadge(item.type)}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => toggleInfoType(item.type)}
                        >
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.type.toLowerCase() === 'link' ? (
                        <a href={item.value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate text-sm" title={item.context || "-"}>
                        {item.context || "-"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                        {item.page || "-"}
                      </div>
                    </TableCell>
                  </TableRow>
                  {openInfoType === item.type && (
                    <TableRow className="bg-slate-50">
                      <TableCell colSpan={4} className="p-0">
                        <div className="p-4 border-t border-dashed">
                          <div className="mb-2">
                            <h3 className="text-sm font-semibold">{getPythonToolInfo(item.type).title}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{getPythonToolInfo(item.type).description}</p>
                          </div>
                          <div className="mt-3 bg-slate-800 rounded-md p-3 relative">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="absolute top-2 right-2 h-7" 
                              onClick={() => handleCopyCode(getPythonToolInfo(item.type).code)}
                            >
                              <Copy className="h-3 w-3 mr-1" /> Copy
                            </Button>
                            <pre className="text-xs text-slate-200 overflow-auto max-h-32 pt-2">
                              {getPythonToolInfo(item.type).code}
                            </pre>
                          </div>
                          <div className="mt-2 text-xs">
                            <a 
                              href={getPythonToolInfo(item.type).reference} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-blue-600 hover:underline"
                            >
                              Learn more about this Python library
                            </a>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="p-3 space-y-2 text-xs text-muted-foreground border-t">
          <Collapsible>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FileText className="h-3 w-3 mr-1" />
                <span>Data extracted using Python's Beautiful Soup and advanced libraries</span>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  <span className="text-xs mr-1">Technical Details</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2 space-y-2 bg-gray-50 p-3 rounded-md">
              <div>
                <h4 className="text-xs font-medium">Python Extraction Pipeline:</h4>
                <ol className="mt-1 text-xs space-y-1 pl-4 list-decimal">
                  <li>URL crawling with <span className="font-mono">requests</span> & <span className="font-mono">urllib</span></li>
                  <li>HTML parsing with <span className="font-mono">BeautifulSoup</span> & <span className="font-mono">lxml</span></li>
                  <li>Entity extraction with specialized libraries (<span className="font-mono">re</span>, <span className="font-mono">phonenumbers</span>, <span className="font-mono">pyap</span>)</li>
                  <li>Data validation with <span className="font-mono">email-validator</span>, <span className="font-mono">validators</span></li>
                  <li>Processing pipeline with <span className="font-mono">pandas</span> for data organization</li>
                </ol>
              </div>
              <div className="text-xs bg-slate-800 text-slate-200 p-2 rounded">
                <span className="font-mono">$ pip install beautifulsoup4 lxml requests pandas phonenumbers pyap geopy email-validator</span>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExtractScrapedTable;
