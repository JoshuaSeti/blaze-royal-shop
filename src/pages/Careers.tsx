import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Clock } from 'lucide-react';

const Careers = () => {
  const jobs = [
    { id: 1, title: 'Senior Frontend Developer', department: 'Engineering', location: 'Lusaka', type: 'Full-time', description: 'Build and maintain our customer-facing applications.' },
    { id: 2, title: 'Product Manager', department: 'Product', location: 'Remote', type: 'Full-time', description: 'Lead product strategy and roadmap for our e-commerce platform.' },
    { id: 3, title: 'Customer Support Specialist', department: 'Support', location: 'Lusaka', type: 'Full-time', description: 'Provide excellent customer service to our users.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us build the future of e-commerce in Zambia
          </p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                    <CardDescription className="text-base">{job.description}</CardDescription>
                  </div>
                  <Badge variant="outline">{job.department}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    {job.department}
                  </div>
                </div>
                <Button>Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Don't see a role that fits?</h2>
          <p className="text-muted-foreground mb-6">Send us your resume and we'll keep you in mind for future opportunities.</p>
          <Button variant="outline">Send Your Resume</Button>
        </div>
      </div>
    </div>
  );
};

export default Careers;
