//app/about/certificates/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import certificatesData from 'data/certificates.json';

export default function CertificatesPage() {
  const { certificates } = certificatesData;

  return (
    <div>
      <h2 className="text-3xl font-serif font-bold mb-2">Certificates & Achievements</h2>
      <p className="text-muted-foreground mb-8">
        Professional certifications and completed training programs
      </p>
      
      <div className="grid gap-6 md:grid-cols-2">
        {certificates.map((cert, index) => (
          <Card key={index} className="border-border/50 hover:border-primary/30 transition-all hover:shadow-lg group">
            <CardHeader>
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors text-xl">
                  {cert.logo}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg font-serif leading-tight">{cert.title}</CardTitle>
                  <CardDescription className="text-sm font-medium mt-1">
                    {cert.issuer}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="text-sm text-muted-foreground">{cert.date}</div>
                {cert.credentialId && (
                  <>
                    <span className="text-muted-foreground">·</span>
                    <div className="text-xs text-muted-foreground">
                      ID: {cert.credentialId}
                    </div>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {cert.description && (
                <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>
              )}
              
              {cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary"
                      className="text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
              
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

      <Card className="mt-8 border-primary/30 bg-accent/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Award className="h-6 w-6 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="text-xl font-serif font-semibold mb-2">Continuous Learning</h3>
              <p className="text-muted-foreground">
                I believe in continuous professional development and actively pursue certifications that enhance 
                my expertise in AI, textile engineering, and sustainable practices. Each certification represents 
                a commitment to excellence and staying current with industry best practices.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}