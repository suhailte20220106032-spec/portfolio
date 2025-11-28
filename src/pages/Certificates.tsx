import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Certificates = () => {
  const certificates = [
    {
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'January 2024',
      skills: ['Cloud Architecture', 'AWS', 'DevOps'],
      credentialUrl: '#'
    },
    {
      title: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: 'November 2023',
      skills: ['Agile', 'Scrum', 'Project Management'],
      credentialUrl: '#'
    },
    {
      title: 'React - The Complete Guide',
      issuer: 'Udemy',
      date: 'August 2023',
      skills: ['React', 'JavaScript', 'Frontend'],
      credentialUrl: '#'
    },
    {
      title: 'Advanced CSS and Sass',
      issuer: 'Udemy',
      date: 'June 2023',
      skills: ['CSS', 'Sass', 'Responsive Design'],
      credentialUrl: '#'
    },
    {
      title: 'Node.js Developer Certification',
      issuer: 'Node.js Foundation',
      date: 'March 2023',
      skills: ['Node.js', 'Backend', 'JavaScript'],
      credentialUrl: '#'
    },
    {
      title: 'TypeScript Fundamentals',
      issuer: 'Microsoft',
      date: 'January 2023',
      skills: ['TypeScript', 'JavaScript', 'Type Safety'],
      credentialUrl: '#'
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-serif font-bold mb-8">Certificates & Achievements</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {certificates.map((cert, index) => (
          <Card key={index} className="border-border/50 hover:border-primary/30 transition-all hover:shadow-lg group">
            <CardHeader>
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg font-serif leading-tight">{cert.title}</CardTitle>
                  <CardDescription className="text-sm font-medium mt-1">
                    {cert.issuer}
                  </CardDescription>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{cert.date}</div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {cert.skills.map(skill => (
                  <Badge 
                    key={skill} 
                    variant="secondary"
                    className="text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                asChild
              >
                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                  View Credential
                  <ExternalLink className="ml-2 h-3.5 w-3.5" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
