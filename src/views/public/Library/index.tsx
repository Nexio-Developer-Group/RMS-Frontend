import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/shadcn/ui/card';
import { Button } from '@/components/shadcn/ui/button';
import { Input } from '@/components/shadcn/ui/input';
import { Badge } from '@/components/shadcn/ui/badge';
import { Separator } from '@/components/shadcn/ui/separator';
import { componentLibrary, categories, Category } from './libraryConfig';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Search, ArrowLeft, Copy, Check, LayoutGrid, List } from 'lucide-react';
import { cn } from '@/components/shadcn/utils';

const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onCopy}>
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </Button>
    );
};

const Library = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Derived state from URL
    const selectedCategory = searchParams.get('category') as Category | 'All' || 'All';
    const activeComponentId = searchParams.get('component');

    const filteredComponents = useMemo(() => {
        return componentLibrary.filter((comp) => {
            const matchesCategory = selectedCategory === 'All' || comp.category === selectedCategory;
            const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                comp.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    const activeComponent = useMemo(() => {
        return componentLibrary.find(c => c.id === activeComponentId);
    }, [activeComponentId]);

    const handleCategoryClick = (category: Category | 'All') => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            if (category === 'All') newParams.delete('category');
            else newParams.set('category', category);
            newParams.delete('component'); // Go back to list when changing category
            return newParams;
        });
    };

    const handleComponentClick = (id: string) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('component', id);
            return newParams;
        });
    };

    const handleBack = () => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.delete('component');
            return newParams;
        });
    };

    if (activeComponent) {
        const Component = activeComponent.component;
        return (
            <div className="flex flex-col h-full bg-background min-h-screen">
                <div className="border-b px-6 py-4 flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back to Library
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <div>
                        <h1 className="text-xl font-semibold">{activeComponent.name}</h1>
                        <p className="text-sm text-muted-foreground">{activeComponent.description}</p>
                    </div>
                    <div className="ml-auto">
                        <Badge variant="outline">{activeComponent.category}</Badge>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 max-w-5xl mx-auto w-full">
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold">Preview</h2>
                        <div className="border rounded-lg p-10 flex items-center justify-center bg-card shadow-sm min-h-[50]">
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <Component {...(activeComponent.props || {})} />
                            </React.Suspense>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Usage</h2>
                        </div>
                        <div className="relative rounded-lg overflow-hidden border">
                            <div className="absolute top-2 right-2 z-10">
                                <CopyButton text={activeComponent.usage} />
                            </div>
                            <SyntaxHighlighter
                                language="tsx"
                                style={vscDarkPlus}
                                customStyle={{ margin: 0, padding: '1.5rem', borderRadius: 0, fontSize: '0.9rem' }}
                            >
                                {activeComponent.usage}
                            </SyntaxHighlighter>
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r flex flex-col bg-card/30">
                <div className="p-6 border-b">
                    <h2 className="text-lg font-bold tracking-tight">Component Library</h2>
                    <p className="text-xs text-muted-foreground mt-1">Design System & UI Kit</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                    <Button
                        variant={selectedCategory === 'All' ? 'secondary' : 'ghost'}
                        className="w-full justify-start font-normal"
                        onClick={() => handleCategoryClick('All')}
                    >
                        All Components
                    </Button>
                    <div className="pt-4 pb-2 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Categories
                    </div>
                    {categories.map(category => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? 'secondary' : 'ghost'}
                            className="w-full justify-start font-normal"
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <div className="border-b p-4 flex items-center gap-4 bg-background z-10">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search components..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Button
                            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                            size="icon"
                            onClick={() => setViewMode('grid')}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                            size="icon"
                            onClick={() => setViewMode('list')}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold tracking-tight">
                            {selectedCategory === 'All' ? 'All Components' : selectedCategory}
                        </h1>
                        <p className="text-muted-foreground">
                            {filteredComponents.length} component{filteredComponents.length !== 1 && 's'} found
                        </p>
                    </div>

                    {filteredComponents.length === 0 ? (
                        <div className="text-center py-20 text-muted-foreground">
                            No components found matching your criteria.
                        </div>
                    ) : (
                        <div className={cn(
                            "grid gap-6",
                            viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                        )}>
                            {filteredComponents.map((comp) => (
                                <Card
                                    key={comp.id}
                                    className="cursor-pointer hover:shadow-md transition-shadow group overflow-hidden border-border/60"
                                    onClick={() => handleComponentClick(comp.id)}
                                >
                                    <div className="h-32 bg-muted/30 border-b flex items-center justify-center p-4 group-hover:bg-muted/50 transition-colors">
                                        <div className="pointer-events-none transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                            {/* Render a non-interactive preview or just the component directly if it's safe */}
                                            <React.Suspense fallback={<div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />}>
                                                <comp.component {...(comp.props || {})} />
                                            </React.Suspense>
                                        </div>
                                    </div>
                                    <CardHeader className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <CardTitle className="text-base">{comp.name}</CardTitle>
                                            <Badge variant="outline" className="text-[10px] h-5">{comp.category}</Badge>
                                        </div>
                                        <CardDescription className="line-clamp-2 text-xs">
                                            {comp.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Library;
