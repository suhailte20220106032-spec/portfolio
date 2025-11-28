import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, GraduationCap } from 'lucide-react';

const Timeline = () => {
  const timelineItems = [
    {
      year: '2024',
      title: 'Senior Full Stack Developer',
      organization: 'Tech Company Inc.',
      type: 'work',
      description: 'Leading development of enterprise web applications, mentoring junior developers, and implementing best practices for scalable architecture.'
    },
    {
      year: '2022',
      title: 'Full Stack Developer',
      organization: 'Digital Agency',
      type: 'work',
      description: 'Developed client websites and web applications using React, Node.js, and modern web technologies. Collaborated with design and product teams.'
    },
    {
      year: '2021',
      title: 'Master of Computer Science',
      organization: 'University Name',
      type: 'education',
      description: 'Specialized in Software Engineering and Web Technologies. Graduated with honors.'
    },
    {
      year: '2020',
      title: 'Junior Web Developer',
      organization: 'Startup Company',
      type: 'work',
      description: 'Built and maintained web applications, worked with agile teams, and learned modern development practices.'
    },
    {
      year: '2019',
      title: 'Bachelor of Science in Computer Science',
      organization: 'University Name',
      type: 'education',
      description: 'Studied core computer science principles, algorithms, and software development.'
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-serif font-bold mb-8">My Journey</h2>
      
      <div className="space-y-8 relative before:absolute before:left-[23px] before:top-8 before:bottom-8 before:w-0.5 before:bg-border">
        {timelineItems.map((item, index) => {
          const Icon = item.type === 'work' ? Briefcase : GraduationCap;
          
          return (
            <div key={index} className="relative pl-16">
              <div className="absolute left-0 top-6 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              
              <Card className="border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <CardTitle className="text-xl font-serif">{item.title}</CardTitle>
                      <CardDescription className="text-base font-medium">
                        {item.organization}
                      </CardDescription>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {item.year}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
