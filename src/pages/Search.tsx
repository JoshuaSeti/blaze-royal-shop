import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string;
}

const Search = () => {
  const [params] = useSearchParams();
  const q = useMemo(() => (params.get("q") || "").trim(), [params]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const title = q ? `Search results for "${q}" | Gula` : "Search Products | Gula";
    document.title = title;

    const descContent = q
      ? `Find products matching \"${q}\". Browse categories, compare prices, and shop now on Gula.`
      : "Search products on Gula. Discover trending items across all categories.";

    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement('meta');
      desc.setAttribute('name', 'description');
      document.head.appendChild(desc);
    }
    desc.setAttribute('content', descContent);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
  }, [q]);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        if (!q) {
          setResults([]);
          return;
        }
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .or(`name.ilike.%${q}%,description.ilike.%${q}%,category.ilike.%${q}%`)
          .order('created_at', { ascending: false });
        if (error) throw error;
        setResults((data || []) as unknown as Product[]);
      } catch (e) {
        console.error('Search error:', e);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Search results{q ? ` for "${q}"` : ''}</h1>
          {q && (
            <p className="text-muted-foreground mt-1">{results.length} result{results.length === 1 ? '' : 's'} found</p>
          )}
        </header>

        {!q ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Type in the search bar to find products.</p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No products matched your search.</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                image={p.image_url || "/api/placeholder/300/300"}
                name={p.name}
                price={Number(p.price)}
                rating={4}
                reviews={Math.floor(Math.random() * 100) + 10}
              />
            ))}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Search;
