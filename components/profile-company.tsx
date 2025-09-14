// components/profile-company.tsx
'use client';

import { useState, useTransition } from 'react';
import { User, Company, Service } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

type FullUser = User & {
  company: (Company & { services: Service[] }) | null;
};

export default function ProfileCompany({ initialUser }: { initialUser: FullUser }) {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending] = useTransition();

  const handleSave = () => {
    // This would call an API action to update company information
    // For now, we'll just toggle edit mode
    setIsEditing(false);
  };

  const addService = () => {
    setUser(prev => ({
      ...prev,
      company: prev.company ? {
        ...prev.company,
        services: [
          ...prev.company.services,
          {
            id: `temp-${Date.now()}`,
            name: '',
            description: '',
            companyId: prev.company?.id || '',
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        ]
      } : null
    }));
  };

  const removeService = (index: number) => {
    setUser(prev => ({
      ...prev,
      company: prev.company ? {
        ...prev.company,
        services: prev.company.services.filter((_, i) => i !== index)
      } : null
    }));
  };

  const updateService = (index: number, field: keyof Service, value: string) => {
    setUser(prev => ({
      ...prev,
      company: prev.company ? {
        ...prev.company,
        services: prev.company.services.map((service, i) => 
          i === index ? { ...service, [field]: value } : service
        )
      } : null
    }));
  };

  const handleCompanyChange = (field: keyof Company, value: string) => {
    setUser(prev => ({
      ...prev,
      company: prev.company ? {
        ...prev.company,
        [field]: value
      } : {
        id: '',
        name: '',
        slug: '',
        categoryId: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        [field]: value
      } as Company
    }));
  };

  return (
    <div>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Manage your company details and services</CardDescription>
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
        {user.company ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              {isEditing ? (
                <Input
                  id="companyName"
                  value={user.company.name}
                  onChange={(e) => handleCompanyChange('name', e.target.value)}
                />
              ) : (
                <p className="text-sm py-2 px-3 rounded-md border border-transparent">
                  {user.company.name}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyTagline">Tagline</Label>
              {isEditing ? (
                <Input
                  id="companyTagline"
                  value={user.company.tagline || ''}
                  onChange={(e) => handleCompanyChange('tagline', e.target.value)}
                  placeholder="Brief description of your company"
                />
              ) : (
                <p className="text-sm py-2 px-3 rounded-md border border-transparent">
                  {user.company.tagline || 'No tagline provided'}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyDescription">Description</Label>
              {isEditing ? (
                <Textarea
                  id="companyDescription"
                  value={user.company.description || ''}
                  onChange={(e) => handleCompanyChange('description', e.target.value)}
                  placeholder="Detailed description of your company"
                  rows={4}
                />
              ) : (
                <p className="text-sm py-2 px-3 rounded-md border border-transparent">
                  {user.company.description || 'No description provided'}
                </p>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Services</Label>
                {isEditing && (
                  <Button type="button" variant="outline" size="sm" onClick={addService}>
                    <Plus className="h-4 w-4 mr-1" /> Add Service
                  </Button>
                )}
              </div>
              
              {user.company.services.length > 0 ? (
                <div className="space-y-4">
                  {user.company.services.map((service, index) => (
                    <div key={service.id} className="p-4 border rounded-lg">
                      {isEditing && (
                        <div className="flex justify-end mb-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeService(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor={`serviceName-${index}`}>Service Name</Label>
                        {isEditing ? (
                          <Input
                            id={`serviceName-${index}`}
                            value={service.name}
                            onChange={(e) => updateService(index, 'name', e.target.value)}
                          />
                        ) : (
                          <p className="font-medium">{service.name}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2 mt-2">
                        <Label htmlFor={`serviceDesc-${index}`}>Description</Label>
                        {isEditing ? (
                          <Textarea
                            id={`serviceDesc-${index}`}
                            value={service.description || ''}
                            onChange={(e) => updateService(index, 'description', e.target.value)}
                            rows={2}
                          />
                        ) : (
                          <p className="text-sm">{service.description || 'No description provided'}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No services added yet.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No company information available.</p>
            {isEditing && (
              <Button onClick={() => handleCompanyChange('name', 'New Company')}>
                Add Company
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </div>
  );
}