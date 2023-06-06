import { useEffect, useState } from "react";
import { Todo } from "../types/todo";

type Data = {
  todos: Todo[];
};

type Args = {
  url: string;
  method?: string;
};

export const useFetch = ({ url, method }: Args) => {
  const [data, setData] = useState<Data>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const request = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(url, request);
        const data = await response.json();

        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("Unexpected error", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method]);

  return { data, isLoading };
};
