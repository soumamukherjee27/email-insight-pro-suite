
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Link, Mail, MapPin, Phone } from "lucide-react";

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
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {getTypeBadge(item.type)}
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
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="p-3 text-xs text-muted-foreground border-t">
          <div className="flex items-center">
            <FileText className="h-3 w-3 mr-1" />
            <span>Data extracted using Python's Beautiful Soup and lxml parser</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExtractScrapedTable;
