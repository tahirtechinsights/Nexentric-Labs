// components/profile-bio.tsx
'use client';

import { useState, useTransition } from 'react';
import { User, Bio } from '@prisma/client';
import { updateUserBio } from '@/lib/actions/user';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type FullUser = User & {
  bio: Bio | null;
};

export default function ProfileBio({ initialUser }: { initialUser: FullUser }) {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const { error } = await updateUserBio(user.id, {
        about: user.bio?.about || '',
        totalYearsExperience: user.bio?.totalYearsExperience || 0,
        skillsAndTools: user.bio?.skillsAndTools || '',
        location: user.bio?.location || '',
        hourlyRate: user.bio?.hourlyRate || 0,
      });
      
      if (!error) {
        setIsEditing(false);
      } else {
        alert('Failed to save changes. Please try again.');
      }
    });
  };

  const handleBioChange = (field: keyof Bio, value: string | number) => {
    setUser(prev => ({
      ...prev,
      bio: {
        ...prev.bio,
        [field]: value,
        id: prev.bio?.id || '',
        userId: prev.bio?.userId || prev.id,
        createdAt: prev.bio?.createdAt || new Date(),
        updatedAt: new Date(),
      } as Bio
    }));
  };

  return (
    <div>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Bio & Skills</CardTitle>
          <CardDescription>Tell others about yourself and your expertise</CardDescription>
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={isPending}>
              {isPending ? 'Saving...' : 'Save'}
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="about">About Me</Label>
          {isEditing ? (
            <Textarea
              id="about"
              value={user.bio?.about || ''}
              onChange={(e) => handleBioChange('about', e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
            />
          ) : (
            <p className="text-sm py-2 px-3 rounded-md border border-transparent min-h-[6rem]">
              {user.bio?.about || 'No bio information added yet.'}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            {isEditing ? (
              <Input
                id="location"
                value={user.bio?.location || ''}
                onChange={(e) => handleBioChange('location', e.target.value)}
                placeholder="e.g. New York, USA"
              />
            ) : (
              <p className="text-sm py-2 px-3 rounded-md border border-transparent">
                {user.bio?.location || 'Not specified'}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            {isEditing ? (
              <Input
                id="experience"
                type="number"
                value={user.bio?.totalYearsExperience || ''}
                onChange={(e) => handleBioChange('totalYearsExperience', parseInt(e.target.value) || 0)}
                min="0"
              />
            ) : (
              <p className="text-sm py-2 px-3 rounded-md border border-transparent">
                {user.bio?.totalYearsExperience || '0'} years
              </p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
          {isEditing ? (
            <Input
              id="hourlyRate"
              type="number"
              value={user.bio?.hourlyRate || ''}
              onChange={(e) => handleBioChange('hourlyRate', parseFloat(e.target.value) || 0)}
              min="0"
              step="0.01"
            />
          ) : (
            <p className="text-sm py-2 px-3 rounded-md border border-transparent">
              ${user.bio?.hourlyRate || '0'} per hour
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="skills">Skills & Tools (comma separated)</Label>
          {isEditing ? (
            <Textarea
              id="skills"
              value={user.bio?.skillsAndTools || ''}
              onChange={(e) => handleBioChange('skillsAndTools', e.target.value)}
              placeholder="e.g. JavaScript, React, Node.js, Figma"
              rows={3}
            />
          ) : (
            <div className="flex flex-wrap gap-2 py-2">
              {user.bio?.skillsAndTools ? (
                user.bio.skillsAndTools.split(',').map((skill, index) => (
                  <span key={index} className="bg-secondary text-secondary-foreground text-xs px-2.5 py-0.5 rounded-full">
                    {skill.trim()}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No skills added yet.</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
}