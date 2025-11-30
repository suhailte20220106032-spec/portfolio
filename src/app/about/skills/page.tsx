//app/about/skills/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import skill from 'data/skills.json'
export default function SkillsPage() {
  const {skillCategories}= skill;

  return (
    <div>
      <h2 className="text-3xl font-serif font-bold mb-2">Technical Skills</h2>
      <p className="text-muted-foreground mb-8">
        A unique blend of textile engineering expertise and cutting-edge technology skills
      </p>
      
      <div className="grid gap-6">
        {skillCategories.map(({ category, description, skills }) => (
          <Card key={category} className="border-border/50 hover:border-primary/30 transition-colors">
            <CardHeader>
              <CardTitle className="text-xl font-serif">{category}</CardTitle>
              <CardDescription>{description}</CardDescription>
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
          <CardTitle className="text-xl font-serif">Continuous Learning & Innovation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            As an early adopter of AI technology, I&apos;m constantly exploring new ways to integrate artificial intelligence 
            and automation into textile engineering. My approach combines deep industry knowledge with emerging technologies 
            to solve real-world challenges in sustainable textile production.
          </p>
          <p className="text-muted-foreground">
            Currently focused on: <strong>AI-powered textile automation</strong>, <strong>sustainable manufacturing systems</strong>, 
            <strong>machine learning for quality control</strong>, and <strong>web-based solutions for textile industry digitalization</strong>.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6 border-primary/30 bg-card">
        <CardHeader>
          <CardTitle className="text-xl font-serif">Code Understanding Philosophy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            I can look at code and understand the logic it&apos;s running on, even across languages where I might not know 
            every syntax detail. This cross-language comprehension allows me to quickly adapt to new technologies and 
            collaborate effectively across different tech stacks.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}