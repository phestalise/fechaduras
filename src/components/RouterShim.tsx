import React from 'react';

interface RouterShimProps {
  routes: Record<string, React.ReactNode>;
}

export default function RouterShim({ routes }: RouterShimProps) {
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]');
      
      if (link && !link.getAttribute('href')?.startsWith('http')) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          window.history.pushState({}, '', href);
          setCurrentPath(href);
        }
      }
    };

    document.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return routes[currentPath] || routes['/'] || null;
}