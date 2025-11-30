//app/about/timeline/page.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import timelineData from 'data/timeline.json';
import Image from 'next/image';
export default function TimelinePage() {
  const { experiences, education } = timelineData;

  return (
    <div>
      <h2 className="text-3xl font-serif font-bold mb-2">Experience & Education</h2>
      <p className="text-muted-foreground mb-8">
        My professional journey and academic background
      </p>

      {/* Experience Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-serif font-semibold mb-6 flex items-center gap-2">
          <span className="text-2xl">💼</span> Experience
        </h3>
        <div className="space-y-6">
          {experiences.map((exp, expIndex) => (
            <Card key={expIndex} className="border-border/50 hover:border-primary/30 transition-all">
              <CardContent className="pt-6">
                {/* Organization Header */}
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 rounded flex items-center justify-center text-2xl shrink-0">
                    <Image
                      src={exp.logo}
                      width={200}
                      height={200}
                      alt="logo"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-serif font-semibold">{exp.organization}</h4>
                    <p className="text-sm text-muted-foreground">{exp.totalDuration}</p>
                  </div>
                </div>

                {/* Positions */}
                <div className="ml-16 space-y-6">
                  {exp.positions.map((position, posIndex) => (
                    <div
                      key={posIndex}
                      className={`relative ${posIndex !== exp.positions.length - 1 ? 'pb-6 border-l-2 border-border pl-6' : 'pl-6'}`}
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>

                      <div>
                        <h5 className="font-semibold text-lg">{position.title}</h5>
                        <p className="text-sm text-muted-foreground mb-1">
                          {position.duration} · {position.length}
                        </p>
                        {position.location && (
                          <p className="text-sm text-muted-foreground mb-2">{position.location}</p>
                        )}
                        {position.description && (
                          <p className="text-muted-foreground text-sm mb-3">{position.description}</p>
                        )}
                        {position.skills && position.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {position.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div>
        <h3 className="text-2xl font-serif font-semibold mb-6 flex items-center gap-2">
          <span className="text-2xl">🎓</span> Education
        </h3>
        <div className="space-y-4">
          {education.map((edu, eduIndex) => (
            <Card key={eduIndex} className="border-border/50 hover:border-primary/30 transition-all">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded flex items-center justify-center text-2xl shrink-0">
                    <Image
                      src={edu.logo}
                      width={200}
                      height={200}
                      alt="logo"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-serif font-semibold">{edu.institution}</h4>
                    <p className="text-base font-medium text-muted-foreground mb-1">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground mb-3">{edu.duration}</p>
                    <p className="text-muted-foreground text-sm">{edu.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-8 border-primary/30 bg-accent/30">
        <CardContent className="pt-6">
          <h3 className="text-xl font-serif font-semibold mb-3">Continuous Growth</h3>
          <p className="text-muted-foreground">
            Throughout my journey, I&apos;ve consistently taken on leadership roles and automation-focused positions,
            reflecting my passion for bridging technology and textile engineering. I&apos;m always looking for
            opportunities to innovate and create impact in the textile industry through AI and automation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}