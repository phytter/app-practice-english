'use client';
import { LoadCardListWrapper } from "@/components/layout/load-card-list-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MovieModel } from "@/domain/models";
import { useDebounce } from "@/hooks/use-debounce";
import { makeMovieServiceFactory } from "@/main/factories/services/movie-service-factory";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";


export default function AdminMoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);
  const movieService = useMemo(() => makeMovieServiceFactory(), []);

  const { data: movies, isLoading } = useQuery<MovieModel[]>({
    queryKey: ["movies", debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch) return [];
      try {
        return movieService.search({ search: debouncedSearch });
      } catch {
        toast.error('Failed to search movies. Please try again');
        return [];
      }
    },
    enabled: !!debouncedSearch,
  });

  const processMovieMutation = useMutation({
    mutationFn: async (imdbId: string) => {
      return movieService.processDialogues(imdbId);
    },
    onSuccess: (data) => toast.success(`Processed ${data.dialogues_count} dialogues successfully`),
    onError: () => toast.error('Failed to process movie subtitles'),
  });

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-8">Movie Management</h1>
      
      <div className="mb-8">
        <div className="flex gap-4">
          <Input
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <LoadCardListWrapper loading={isLoading}>
          {movies?.map((movie) => (
            <Card key={movie.imdb_id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{movie.title} ({movie.year})</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">IMDb ID: {movie.imdb_id}</p>
                <Button
                  onClick={() => processMovieMutation.mutate(movie.imdb_id)}
                  disabled={processMovieMutation.isPending}
                  className="w-full"
                >
                  {processMovieMutation.isPending ? "Processing..." : "Process Subtitles"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </LoadCardListWrapper>
      </div>
    </div>
  );
}
