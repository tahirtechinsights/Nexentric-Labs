// components/profile-card.tsx
'use client';

import { User, Company, Service, Bio } from '@prisma/client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Briefcase, 
  Globe, 
  Mail, 
  Twitter, 
  Linkedin, 
  Calendar,
  DollarSign,
  Building,
  Phone,
  Link as LinkIcon
} from 'lucide-react';

type FullUser = User & {
  company: (Company & { services: Service[]; category?: any }) | null;
  bio: Bio | null;
};

// Memoize the skills list to prevent unnecessary re-renders
function SkillsList({ skills }: { skills: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.split(',').map((skill, index) => (
        <Badge key={index} variant="secondary" className="text-xs">
          {skill.trim()}
        </Badge>
      ))}
    </div>
  );
}

// Memoize the service items
function ServiceItem({ service }: { service: Service }) {
  return (
    <div className="pb-3 border-b border-border last:border-b-0 last:pb-0">
      <h5 className="font-medium text-card-foreground">{service.name}</h5>
      {service.description && (
        <p className="text-muted-foreground text-sm mt-1">{service.description}</p>
      )}
    </div>
  );
}

export default function ProfileCard({ initialUser }: { initialUser: FullUser }) {
  const user = initialUser;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Profile Summary */}
      <div className="lg:col-span-1 space-y-6">
        {/* Profile Card */}
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary/10">
                <Image
                  src={user.imageUrl || '/default-avatar.png'}
                  alt={`${user.firstName} ${user.lastName}`}
                  fill
                  className="object-cover"
                  priority // Load image with priority
                />
              </div>
              
              <h1 className="text-2xl font-bold text-card-foreground">
                {user.firstName} {user.lastName}
              </h1>
              
              {user.jobTitle && (
                <p className="text-muted-foreground mt-1">{user.jobTitle}</p>
              )}
              
              <div className="flex mt-4 space-x-2">
                {user.xUrl && (
                  <a href={user.xUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                
                {user.linkedInUrl && (
                  <a href={user.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                
                {user.email && (
                  <a href={`mailto:${user.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              {user.bio?.location && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{user.bio.location}</span>
                </div>
              )}
              
              {user.bio?.totalYearsExperience && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{user.bio.totalYearsExperience} years of experience</span>
                </div>
              )}
              
              {user.bio?.hourlyRate && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>${user.bio.hourlyRate}/hour</span>
                </div>
              )}
              
              {user.company && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Building className="h-4 w-4 mr-2" />
                  <span>{user.company.name}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skills Card */}
        {user.bio?.skillsAndTools && (
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Skills & Tools</h3>
              <SkillsList skills={user.bio.skillsAndTools} />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right Column - Detailed Information */}
      <div className="lg:col-span-2 space-y-6">
        {/* About Me Card */}
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-4 flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              About Me
            </h2>
            {user.bio?.about ? (
              <p className="text-card-foreground/80 leading-relaxed">{user.bio.about}</p>
            ) : (
              <p className="text-muted-foreground italic">No bio information added yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Company Information Card */}
        {user.company && (
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-card-foreground mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Company Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-card-foreground">{user.company.name}</h3>
                  {user.company.tagline && (
                    <p className="text-muted-foreground text-sm">{user.company.tagline}</p>
                  )}
                </div>
                
                {user.company.description && (
                  <p className="text-card-foreground/80">{user.company.description}</p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {user.company.email && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href={`mailto:${user.company.email}`} className="hover:text-primary transition-colors">
                        {user.company.email}
                      </a>
                    </div>
                  )}
                  
                  {user.company.phone && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 mr-2" />
                      <a href={`tel:${user.company.phone}`} className="hover:text-primary transition-colors">
                        {user.company.phone}
                      </a>
                    </div>
                  )}
                  
                  {user.company.website && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      <a 
                        href={user.company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors truncate"
                      >
                        {user.company.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  
                  {user.company.category && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Globe className="h-4 w-4 mr-2" />
                      <span>{user.company.category.name}</span>
                    </div>
                  )}
                </div>
                
                {user.company.services && user.company.services.length > 0 && (
                  <div className="pt-4">
                    <h4 className="font-medium text-card-foreground mb-3">Services Offered</h4>
                    <div className="space-y-3">
                      {user.company.services.map(service => (
                        <ServiceItem key={service.id} service={service} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Information Card */}
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-card-foreground mb-2">Personal</h3>
                <div className="space-y-2 text-sm">
                  {user.email && (
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href={`mailto:${user.email}`} className="hover:text-primary transition-colors">
                        {user.email}
                      </a>
                    </div>
                  )}
                  
                  {user.xUrl && (
                    <div className="flex items-center text-muted-foreground">
                      <Twitter className="h-4 w-4 mr-2" />
                      <a 
                        href={user.xUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors truncate"
                      >
                        {user.xUrl.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  
                  {user.linkedInUrl && (
                    <div className="flex items-center text-muted-foreground">
                      <Linkedin className="h-4 w-4 mr-2" />
                      <a 
                        href={user.linkedInUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors truncate"
                      >
                        {user.linkedInUrl.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              {user.company && (
                <div>
                  <h3 className="font-medium text-card-foreground mb-2">Business</h3>
                  <div className="space-y-2 text-sm">
                    {user.company.email && (
                      <div className="flex items-center text-muted-foreground">
                        <Mail className="h-4 w-4 mr-2" />
                        <a href={`mailto:${user.company.email}`} className="hover:text-primary transition-colors">
                          {user.company.email}
                        </a>
                      </div>
                    )}
                    
                    {user.company.phone && (
                      <div className="flex items-center text-muted-foreground">
                        <Phone className="h-4 w-4 mr-2" />
                        <a href={`tel:${user.company.phone}`} className="hover:text-primary transition-colors">
                          {user.company.phone}
                        </a>
                      </div>
                    )}
                    
                    {user.company.website && (
                      <div className="flex items-center text-muted-foreground">
                        <LinkIcon className="h-4 w-4 mr-2" />
                        <a 
                          href={user.company.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors truncate"
                        >
                          {user.company.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}