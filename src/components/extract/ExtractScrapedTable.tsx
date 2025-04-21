
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
                  <TableCell className="font-medium">{item.type}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>{item.context || "-"}</TableCell>
                  <TableCell>{item.page || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExtractScrapedTable;
