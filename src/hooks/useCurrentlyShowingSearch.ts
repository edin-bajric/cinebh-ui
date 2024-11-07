import { useState, useEffect } from "react";
import { Movie, PaginatedResponse } from "../utils/types";
import { MovieService } from "../services";

const useCurrentlyShowingSearch = (query: string, page: number, size: number) => {
  const [data, setData] = useState<PaginatedResponse<Movie> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const results = await MovieService.searchMovies(query, page, size);
        setData(results);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query, page, size]);

  return { data, isLoading, error };
};

export default useCurrentlyShowingSearch;
