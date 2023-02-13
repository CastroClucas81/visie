import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";

const usePagination = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActualPage = () => {
    const queryParams = qs.parse(location.search);
    const page = queryParams.page;

    return page ? Number(page) : undefined;
  };

  const [actualPage, setActualPage] = useState(getActualPage() || 1);

  useEffect(() => {
    const queryParams = qs.parse(location.search);

    navigate({
      search: qs.stringify({
        ...queryParams,
        page: actualPage,
      }),
    });
  }, [actualPage]);

  return { setActualPage, actualPage };
};

export default usePagination;
