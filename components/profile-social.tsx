// components/profile-social.tsx
'use client';

import { useState, useTransition } from 'react';
import { User } from '@prisma/client';
import { updateUserSocialLinks } from '@/lib/actions/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Twitter, Linkedin } from 'lucide-react';

export default function ProfileSocial({ initialUser }: { initialUser: User }) {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const { error } = await updateUserSocialLinks(user.id, {
        xUrl: user.xUrl || '',
        linkedInUrl: user.linkedInUrl || '',
      });
      
      if (!error) {
        setIsEditing(false);
      } else {
        alert('Failed to save changes. Please try again.');
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof User) => {
    setUser(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Add your social media profiles</CardDescription>
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
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="xUrl" className="flex items-center gap-2">
            <Twitter className="h-4 w-4" />
            X (Twitter)
          </Label>
          {isEditing ? (
            <Input
              id="xUrl"
              value={user.xUrl || ''}
              onChange={(e) => handleInputChange(e, 'xUrl')}
              placeholder="https://twitter.com/yourusername"
            />
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-sm py-2">
                {user.xUrl || 'Not provided'}
              </p>
              {user.xUrl && (
                <a 
                  href={user.xUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Visit
                </a>
              )}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="linkedInUrl" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Label>
          {isEditing ? (
            <Input
              id="linkedInUrl"
              value={user.linkedInUrl || ''}
              onChange={(e) => handleInputChange(e, 'linkedInUrl')}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-sm py-2">
                {user.linkedInUrl || 'Not provided'}
              </p>
              {user.linkedInUrl && (
                <a 
                  href={user.linkedInUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Visit
                </a>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
}