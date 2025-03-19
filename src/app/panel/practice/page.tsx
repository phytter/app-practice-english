"use client";

import { LoadCardListWrapper } from "@/components/layout/load-card-list-wrapper";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MovieModel } from "@/domain/models";
import { useDebounce } from "@/hooks";
import { makeMovieServiceFactory } from "@/main/factories/services/movie-service-factory";
import { useQuery } from "@tanstack/react-query";
import { Film, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function PracticeMoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);
  const movieService = useMemo(() => makeMovieServiceFactory(), []);

  const { data: movies = [], isLoading } = useQuery<MovieModel[]>({
    queryKey: ['movies_processed', debouncedSearch],
    queryFn: async () => {
      const params = { search: '' };
      if (debouncedSearch) {
        params['search'] = debouncedSearch;
      }
      return movieService.loadProcessed(params);
    },
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Movies</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md pl-10"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LoadCardListWrapper loading={isLoading}>
          {
            movies?.map?.((movie) => (
              <Link href={`/panel/practice/movies/${movie.imdb_id}/dialogues`} key={movie._id}>
                <Card key={movie._id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Film className="w-5 h-5" />
                      {movie.title}
                    </CardTitle>
                    <CardDescription>
                      Year {movie.year}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))
          }
        </LoadCardListWrapper>
      </div>
    </div>
  );
}
