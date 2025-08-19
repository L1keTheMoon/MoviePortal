import Carousel from "../Carousel/Carousel.tsx";
import CaroulelMovieItem from "../CaroulelMovieItem/CaroulelMovieItem.tsx";
import { CircularProgress } from "@mui/material";
import { useGetPremieresQuery } from "../../api/api.ts";

const TODAY = new Date();

const CURRENT_MONTH_EN = TODAY.toLocaleString("en-US", {
  month: "long",
}).toUpperCase();

let CURRENT_MONTH_RU = TODAY.toLocaleString("ru-RU", {
  month: "long",
});

if (TODAY.getMonth() === 2 || TODAY.getMonth() === 7) {
  CURRENT_MONTH_RU = CURRENT_MONTH_RU + "а";
} else {
  CURRENT_MONTH_RU = CURRENT_MONTH_RU.slice(0, -1) + "я";
}

const CURRENT_YEAR = TODAY.getFullYear();

export default function Premieres() {
  const { data, isFetching, isError } = useGetPremieresQuery(
    `year=${CURRENT_YEAR}&month=${CURRENT_MONTH_EN}`
  );

  return (
    <>
      {isError ? null : isFetching ? (
        <CircularProgress
          size={300}
          style={{ display: "block", margin: "30px auto 0" }}
        />
      ) : data ? (
        <Carousel
          header={`Премьеры ${CURRENT_MONTH_RU} ${CURRENT_YEAR}`}
          list={data.items.filter((_, i) => i < 20)}
          ListItem={CaroulelMovieItem}
        />
      ) : null}
    </>
  );
}
