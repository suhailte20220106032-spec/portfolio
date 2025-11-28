import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Skills = () => {
  const skillCategories = [
    {
      category: 'Frontend Development',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vue.js', 'HTML5', 'CSS3', 'JavaScript']
    },
    {
      category: 'Backend Development',
      skills: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL']
    },
    {
      category: 'Tools & Technologies',
      skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'VS Code', 'Webpack', 'Vite']
    },
    {
      category: 'Soft Skills',
      skills: ['Problem Solving', 'Team Collaboration', 'Communication', 'Agile/Scrum', 'Code Review', 'Mentoring']
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-serif font-bold mb-8">Technical Skills</h2>
      
      <div className="grid gap-6">
        {skillCategories.map(({ category, skills }) => (
          <Card key={category} className="border-border/50 hover:border-primary/30 transition-colors">
            <CardHeader>
              <CardTitle className="text-xl font-serif">{category}</CardTitle>
              <CardDescription>Technologies and tools I work with</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <Badge 
                    key={skill} 
                    variant="secondary"
                    className="text-sm px-4 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-border/50 bg-accent/30">
        <CardHeader>
          <CardTitle className="text-xl font-serif">Learning & Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            I'm constantly learning and expanding my skill set. Currently exploring AI/ML integration, 
            Web3 technologies, and advanced system design patterns. I believe in staying curious and 
            adapting to the ever-evolving tech landscape.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Skills;
