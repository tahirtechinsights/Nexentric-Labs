// components/profile-loading.tsx
export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto animate-pulse">
        <div className="h-8 bg-muted rounded w-1/3 mb-8"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column skeleton */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border-border rounded-lg p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-muted rounded-full mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2 mb-6"></div>
                
                <div className="w-full space-y-3">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border-border rounded-lg p-6">
              <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </div>
            
            <div className="bg-card border-border rounded-lg p-6">
              <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}