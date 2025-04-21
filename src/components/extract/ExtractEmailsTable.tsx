
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface ExtractedEmail {
  email: string;
  name: string;
  position: string;
  department: string;
  source: string;
}

interface Props {
  emails: ExtractedEmail[];
}

const ExtractEmailsTable: React.FC<Props> = ({ emails }) => {
  if (emails.length === 0) return null;
  return (
    <Card>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emails.map((email, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{email.email}</TableCell>
                  <TableCell>{email.name}</TableCell>
                  <TableCell>{email.position}</TableCell>
                  <TableCell>{email.department}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExtractEmailsTable;
